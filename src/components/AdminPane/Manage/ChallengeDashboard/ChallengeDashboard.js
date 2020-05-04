import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import { generateWidgetId, WidgetDataTarget, widgetDescriptor }
       from '../../../../services/Widget/Widget'
import WithManageableProjects
       from '../../HOCs/WithManageableProjects/WithManageableProjects'
import WithCurrentProject
       from '../../HOCs/WithCurrentProject/WithCurrentProject'
import WithCurrentChallenge
       from '../../HOCs/WithCurrentChallenge/WithCurrentChallenge'
import WithWidgetWorkspaces
       from '../../../HOCs/WithWidgetWorkspaces/WithWidgetWorkspaces'
import WithFilteredClusteredTasks
       from '../../../HOCs/WithFilteredClusteredTasks/WithFilteredClusteredTasks'
import WithClusteredTasks
      from '../../../HOCs/WithClusteredTasks/WithClusteredTasks'
import WithChallengeMetrics
       from '../../HOCs/WithChallengeMetrics/WithChallengeMetrics'
import WithChallengeReviewMetrics
      from '../../HOCs/WithChallengeReviewMetrics/WithChallengeReviewMetrics'
import WithSearch from '../../../HOCs/WithSearch/WithSearch'
import WidgetWorkspace from '../../../WidgetWorkspace/WidgetWorkspace'
import TaskUploadingProgress
       from '../TaskUploadingProgress/TaskUploadingProgress'
import TaskDeletingProgress
       from '../TaskDeletingProgress/TaskDeletingProgress'
import ChallengeControls from '../ChallengeCard/ChallengeControls'
import BusySpinner from '../../../BusySpinner/BusySpinner'
import ChallengeNameLink from '../../../ChallengeNameLink/ChallengeNameLink'
import manageMessages from '../Messages'
import './ChallengeDashboard.scss'

// The name of this dashboard.
const DASHBOARD_NAME = "challenge"

export const defaultDashboardSetup = function() {
  return {
    dataModelVersion: 2,
    name: DASHBOARD_NAME,
    label: "View Challenge",
    widgets: [
      widgetDescriptor('ChallengeOverviewWidget'),
      widgetDescriptor('CompletionProgressWidget'),
      widgetDescriptor('LeaderboardWidget'),
      widgetDescriptor('RecentActivityWidget'),
      widgetDescriptor('CommentsWidget'),
      widgetDescriptor('BurndownChartWidget'),
      widgetDescriptor('StatusRadarWidget'),
      widgetDescriptor('ChallengeTasksWidget'),
    ],
    layout: [
      {i: generateWidgetId(), x: 0, y: 0, w: 4, h: 7},
      {i: generateWidgetId(), x: 0, y: 7, w: 4, h: 7},
      {i: generateWidgetId(), x: 0, y: 14, w: 4, h: 8},
      {i: generateWidgetId(), x: 0, y: 22, w: 4, h: 14},
      {i: generateWidgetId(), x: 0, y: 36, w: 4, h: 12},
      {i: generateWidgetId(), x: 0, y: 48, w: 4, h: 12},
      {i: generateWidgetId(), x: 0, y: 60, w: 4, h: 12},
      {i: generateWidgetId(), x: 4, y: 0, w: 8, h: 49},
    ],
  }
}

/**
 * ChallengeDashboard displays various challenge details and metrics of interest to
 * challenge owners, along with the challenge tasks.
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export class ChallengeDashboard extends Component {
  render() {
    if (!this.props.challenge) {
      return <BusySpinner />
    }

    const isDeletingTasks = _get(this.props, 'progress.deletingTasks.inProgress', false)
    if (isDeletingTasks) {
      return <TaskDeletingProgress {...this.props} />
    }

    const isUploadingTasks = _get(this.props, 'progress.creatingTasks.inProgress', false)
    if (isUploadingTasks) {
      return <TaskUploadingProgress {...this.props} />
    }

    const projectId = _get(this.props, 'challenge.parent.id')

    const pageHeader = (
      <div className="admin__manage__header admin__manage__header--flush">
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li className="nav-title">
              <Link to='/admin/projects'>
                <FormattedMessage {...manageMessages.manageHeader} />
              </Link>
            </li>
            <li>
              <Link to={`/admin/project/${projectId}`}>
                {_get(this.props, 'challenge.parent.displayName') ||
                  _get(this.props, 'challenge.parent.name')}
              </Link>
            </li>
            <li className="is-active">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <ChallengeNameLink {...this.props} showBelow />
              <a aria-current="page">
                {this.props.loadingChallenge && <BusySpinner inline />}
              </a>
            </li>
          </ul>
        </nav>

        <ChallengeControls
          {...this.props}
          className="admin__manage__controls mr-flex"
          controlClassName="mr-button mr-button--dark mr-button--small mr-mr-4"
          onChallengeDashboard
        />
      </div>
    )

    return (
      <div className="admin__manage challenge-dashboard">
        <WidgetWorkspace
          {...this.props}
          lightMode={false}
          darkMode
          className="mr-cards-inverse"
          workspaceEyebrow={pageHeader}
        />
      </div>
    )
  }
}


ChallengeDashboard.propTypes = {
  /** The parent project of the challenge */
  project: PropTypes.object,
  /** The current challenge to view */
  challenge: PropTypes.object,
  /** Set to true if challenge data is still loading */
  loadingChallenge: PropTypes.bool.isRequired,
  /** Invoked when the user wishes to delete the challenge */
  deleteChallenge: PropTypes.func.isRequired,
  /** Invoked when the user wishes to move the challenge */
  moveChallenge: PropTypes.func.isRequired,
}

export default
WithManageableProjects(
  WithCurrentProject(
    WithSearch(
      WithCurrentChallenge(
        WithWidgetWorkspaces(
          WithClusteredTasks(
            WithFilteredClusteredTasks(
              WithChallengeMetrics(
                WithChallengeReviewMetrics(
                  injectIntl(ChallengeDashboard),
                )
              ),
              'clusteredTasks',
              'filteredClusteredTasks'
            )
          ),
          WidgetDataTarget.challenge,
          DASHBOARD_NAME,
          defaultDashboardSetup
        )
      ),
      'challengeOwner'
    )
  )
)
