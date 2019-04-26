import React, { Component } from 'react'
import _get from 'lodash/get'
import _find from 'lodash/find'
import _isArray from 'lodash/isArray'
import _isFinite from 'lodash/isFinite'
import _each from 'lodash/each'
import _omit from 'lodash/omit'
import _assign from 'lodash/assign'
import { generateWidgetId, migrateWidgetGridConfiguration, pruneDecommissionedWidgets }
       from '../../../services/Widget/Widget'
import WithCurrentUser from '../WithCurrentUser/WithCurrentUser'
import WithStatus from '../WithStatus/WithStatus'
import SignInButton from '../../SignInButton/SignInButton'
import BusySpinner from '../../BusySpinner/BusySpinner'

/**
 * WithWidgetWorkspaces provides the WrappedComponent with access to the saved
 * workspace configurations as well as various workspace-configuration
 * management functions.
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export const WithWidgetWorkspaces = function(WrappedComponent,
                                       targets, workspaceName, defaultConfiguration) {
  return class extends Component {
    state = {
      currentConfigurationId: null,
    }

    /**
     * Sets up a brand-new workspace based on the given default configuration
     * function
     */
    setupWorkspace = defaultConfiguration => {
      const conf = defaultConfiguration()
      // Ensure default layout honors properties from each widget's descriptor
      for (let i = 0; i < conf.widgets.length; i++) {
        const widget = conf.widgets[i]
        if (widget) {
          conf.layout[i] = Object.assign({}, {
            minW: widget.minWidth,
            maxW: widget.maxWidth,
            minH: widget.minHeight,
            maxH: widget.maxHeight,
          }, conf.layout[i])
        }
      }

      return conf
    }

    /**
     * Retrieves all workspaces from the user's app settings
     *
     * @private
     */
    allUserWorkspaces = () => {
      // workspaces used to be stored as "dashboards", so continue to look
      // there too for legacy reasons
      return this.props.getUserAppSetting(this.props.user, 'workspaces') ||
             this.props.getUserAppSetting(this.props.user, 'dashboards') || {}
    }

    /**
     * Retrieves all configurations for the current workspace
     *
     * @private
     */
    workspaceConfigurations = () => {
      return this.allUserWorkspaces()[workspaceName] || {}
    }

    /**
     * Completes a given workspace configuration, filling in missing fields
     * with reasonable default values
     *
     * @private
     */
    completeWorkspaceConfiguration = initialWorkspace => {
      const configuration = _assign({
        id: generateWidgetId(),
        targets: _isArray(targets) ? targets : [targets], // store as array
        cols: 12,
        rowHeight: 30,
        widgets: [],
        layout: [],
      }, initialWorkspace)

      // Generate a simple layout if none provided, with one widget per row
      if (configuration.layout.length === 0) {
        let nextY = 0
        _each(configuration.widgets, widgetConf => {
          configuration.layout.push({
            i: generateWidgetId(),
            x: 0, y: nextY,
            w: widgetConf.defaultWidth,
            minW: widgetConf.minWidth,
            maxW: widgetConf.maxWidth,
            h: widgetConf.defaultHeight,
            minH: widgetConf.minHeight,
            maxH: widgetConf.maxHeight,
          })

          nextY += widgetConf.defaultHeight
        })
      }
      else {
        // A layout was provided. If heights and/or widths were omitted, fill
        // them in using component defaults.
        _each(configuration.layout, (widgetLayout, index) => {
          if (!_isFinite(widgetLayout.w)) {
            widgetLayout.w = configuration.widgets[index].defaultWidth
          }

          if (!_isFinite(widgetLayout.h)) {
            widgetLayout.h = configuration.widgets[index].defaultHeight
          }
        })
      }

      return pruneDecommissionedWidgets(migrateWidgetGridConfiguration(
        configuration,
        () => this.setupWorkspace(defaultConfiguration)
      ))
    }

    /**
     * Change the active workspace configuration
     */
    switchWorkspaceConfiguration = workspaceConfigurationId => {
      this.setState({currentConfigurationId: workspaceConfigurationId})
    }

    /**
     * Persist the given workspace configuration object to the user's app
     * settings.
     */
    saveWorkspaceConfiguration = workspaceConfiguration => {
      // Assign an id if needed
      if (!workspaceConfiguration.id) {
        workspaceConfiguration.id = generateWidgetId()
      }

      const userWorkspaces = this.allUserWorkspaces()
      userWorkspaces[workspaceConfiguration.name] = Object.assign(
        {},
        userWorkspaces[workspaceConfiguration.name],
        {[workspaceConfiguration.id]: workspaceConfiguration}
      )

      this.props.updateUserAppSetting(this.props.user.id, {
        'workspaces': userWorkspaces,
        'dashboards': undefined, // clear out any legacy settings
      })
    }

    /**
     * Delete the given workspace configuration.
     */
    deleteWorkspaceConfiguration = workspaceConfigurationId => {
      const userWorkspaces = this.allUserWorkspaces()

      if (userWorkspaces[workspaceName]) {
        delete userWorkspaces[workspaceName][workspaceConfigurationId]
        this.props.updateUserAppSetting(this.props.user.id, {'workspaces': userWorkspaces})
      }

      if (this.state.currentConfigurationId === workspaceConfigurationId) {
        this.setState({currentConfigurationId: null})
      }
    }

    /**
     * Assign a new name to the given workspace configuration
     */
    renameWorkspaceConfiguration = (workspaceConfigurationId, newLabel) => {
      const configuration = this.workspaceConfigurations()[workspaceConfigurationId]

      if (configuration) {
        this.saveWorkspaceConfiguration(Object.assign({}, configuration, {label: newLabel}))
      }
    }

    /**
     * Reset the given workspace back to its default configuration, preserving
     * its label and id
     */
    resetWorkspaceConfiguration = workspaceConfigurationId => {
      const oldConfiguration = this.workspaceConfigurations()[workspaceConfigurationId]

      if (oldConfiguration) {
        const newConfiguration = this.setupWorkspace(defaultConfiguration)
        this.saveWorkspaceConfiguration(
          Object.assign(
            {},
            newConfiguration, {
              id: workspaceConfigurationId,
              label: oldConfiguration.label,
            })
        )
      }
    }

    /**
     * Retrieve the current, active configuration or a default configuration if
     * there is no active configuration
     */
    currentConfiguration = configurations => {
      let currentWorkspace = configurations[this.state.currentConfigurationId]

      // If no current workspace, or it's broken, find a working one
      if (!currentWorkspace) {
        currentWorkspace = _find(configurations, configuration => !configuration.isBroken)
      }

      // If no working workspace, create a fresh default. Once the save is
      // complete, we should get rerendered and have it available, so do not
      // assign it to currentWorkspace.
      if (!currentWorkspace) {
        this.saveWorkspaceConfiguration(this.setupWorkspace(defaultConfiguration))
      }

      return !currentWorkspace ? null : this.completeWorkspaceConfiguration(currentWorkspace)
    }

    /**
     * Add a new, default workspace configuration
     */
    addNewWorkspaceConfiguration = () => {
      const newConfiguration = this.setupWorkspace(defaultConfiguration)
      newConfiguration.label = `(New) ${newConfiguration.label}`

      this.saveWorkspaceConfiguration(newConfiguration)
      setTimeout(() => this.setState({currentConfigurationId: newConfiguration.id}), 500)
      return newConfiguration
    }

    /**
     * Mark the current active workspace as broken.
     */
    markWorkspaceConfigurationBroken = () => {
      if (this.state.currentConfigurationId) {
        this.saveWorkspaceConfiguration(
          Object.assign({},
                        this.currentConfiguration(this.workspaceConfigurations()),
                        {isBroken: true}))
        this.setState({currentConfigurationId: null})
      }
    }

    render() {
      if (!_get(this.props, 'user.isLoggedIn')) {
        return (
          <div className="mr-flex mr-justify-center mr-py-8 mr-w-full mr-bg-blue">
            {this.props.checkingLoginStatus ?
             <BusySpinner /> :
             <SignInButton {...this.props} longForm className='' />
            }
          </div>
        )
      }

      const configurations = this.workspaceConfigurations()
      const currentConfiguration = this.currentConfiguration(configurations)
      const remainingConfigurations = currentConfiguration ?
                                      _omit(configurations, [currentConfiguration.id]) :
                                      configurations

      return <WrappedComponent
               {...this.props}
               name={workspaceName}
               targets={targets}
               defaultConfiguration={defaultConfiguration}
               workspaceConfigurations={configurations}
               currentConfiguration={currentConfiguration}
               remainingConfigurations={remainingConfigurations}
               switchWorkspaceConfiguration={this.switchWorkspaceConfiguration}
               markWorkspaceConfigurationBroken={this.markWorkspaceConfigurationBroken}
               renameWorkspaceConfiguration={this.renameWorkspaceConfiguration}
               addNewWorkspaceConfiguration={this.addNewWorkspaceConfiguration}
               saveWorkspaceConfiguration={this.saveWorkspaceConfiguration}
               resetWorkspaceConfiguration={this.resetWorkspaceConfiguration}
               deleteWorkspaceConfiguration={this.deleteWorkspaceConfiguration}
             />
    }
  }
}

export default (WrappedComponent, targets, workspaceName, defaultConfiguration) =>
  WithStatus(
    WithCurrentUser(
      WithWidgetWorkspaces(WrappedComponent, targets, workspaceName, defaultConfiguration)
    )
  )
