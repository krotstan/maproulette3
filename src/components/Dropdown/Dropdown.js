import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import wrapWithClickout from 'react-clickout'
import SvgSymbol from '../SvgSymbol/SvgSymbol'

class Dropdown extends Component {
  state = {
    isVisible: false,
  }

  toggleDropdownVisible = () => {
    this.setState({isVisible: !this.state.isVisible})
  }

  closeDropdown = () => {
    this.setState({isVisible: false})
  }

  modalActivated = (isActive) => {
    this.setState({modalIsActive: isActive})
  }

  handleClickout() {
    if (!this.state.modalIsActive) this.closeDropdown()
  }

  render() {
    const isDropdownVisible =
      this.props.toggleVisible ? this.props.isVisible : this.state.isVisible

    const renderFuncArgs = {
      isDropdownVisible,
      toggleDropdownVisible: this.toggleDropdownVisible,
      closeDropdown: this.closeDropdown,
      modalActivated: this.modalActivated,
    }

    return (
      <div className={classNames('mr-dropdown', this.props.className)} {...this.props.rootProps}>
        {this.props.dropdownButton(renderFuncArgs)}
        {isDropdownVisible && (
          <div className="mr-dropdown__wrapper">
            <div className="mr-dropdown__main">
              <div className={classNames("mr-dropdown__inner", {"mr-fixed": this.props.fixedMenu})}>
                {!this.props.suppressControls &&
                 <SvgSymbol
                   sym="icon-triangle"
                   viewBox="0 0 15 10"
                   className={classNames("mr-dropdown__arrow", this.props.arrowClassName)}
                   aria-hidden
                 />
                }
                <div className="mr-dropdown__content">
                  {React.cloneElement(
                    this.props.dropdownContent(renderFuncArgs),
                    {modalActivated: this.modalActivated})
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

Dropdown.propTypes = {
  dropdownButton: PropTypes.func.isRequired,
  dropdownContent: PropTypes.func.isRequired,
}

export default wrapWithClickout(Dropdown)
