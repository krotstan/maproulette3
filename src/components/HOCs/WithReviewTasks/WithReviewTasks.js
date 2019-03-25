import React, { Component } from 'react'
import { connect } from 'react-redux'
import _omit from 'lodash/omit'
import _get from 'lodash/get'
import { fetchReviewNeededTasks }
       from '../../../services/Task/TaskReview/TaskReviewNeeded'
import { fetchReviewedTasks }
       from '../../../services/Task/TaskReview/TaskReviewed'
import { loadNextReviewTask } from '../../../services/Task/Task'
import { addError } from '../../../services/Error/Error'
import AppErrors from '../../../services/Error/AppErrors'


const DEFAULT_PAGE_SIZE = 20

/**
 * WithReviewTasks retrieves tasks that need to be Reviewed
 *
 * @author [Kelli Rotstan](https://github.com/krotstan)
 */
export const WithReviewTasks = function(WrappedComponent, reviewStatus=0) {
  return class extends Component {
    state = {
      loading: false
    }

    refresh = (sortBy, direction, filters) => {
      this.update(this.props, sortBy, direction, filters)
    }

    update(props, sortBy, direction, filters) {
      this.setState({loading: true})
      if (props.asReviewer) {
        if (props.showReviewedByMe) {
          props.updateUserReviewedTasks({sortCriteria: {sortBy, direction}, filters}).then(() => {
            this.setState({loading: false})
          })
        }
        else {
          props.updateReviewNeededTasks({sortCriteria: {sortBy, direction}, filters}).then(() => {
            this.setState({loading: false})
          })
        }
      }
      else {
        props.updateReviewedTasks({sortCriteria: {sortBy, direction}, filters}).then(() => {
          this.setState({loading: false})
        })
      }
    }

    componentDidMount() {
      this.update(this.props)
    }

    render() {
      var reviewTasks = this.props.reviewedTasks
      var updateTasks = this.props.updateReviewedTasks
      var totalCount = this.props.reviewedTasksCount

      if ( this.props.asReviewer ) {
        reviewTasks = this.props.reviewNeededTasks
        updateTasks = this.props.updateReviewNeededTasks
        totalCount = this.props.reviewNeededTasksCount

        if (this.props.showReviewedByMe) {
          reviewTasks = this.props.reviewedTasksByMe
          updateTasks = this.props.updateUserReviewedTasks
          totalCount = this.props.reviewedTasksByMeCount
        }
      }

      return (
        <WrappedComponent reviewTasks={reviewTasks}
                          totalCount={totalCount}
                          updateReviewTasks={updateTasks}
                          defaultPageSize={DEFAULT_PAGE_SIZE}
                          refresh={this.refresh}
                          startReviewing={this.props.startNextReviewTask}
                          loading={this.state.loading}
                          {..._omit(this.props, ['updateReviewTasks'])} />)
    }
  }
}

const mapStateToProps = state => ({
  reviewNeededTasks: _get(state, 'currentReviewNeededTasks.tasks', []),
  reviewNeededTasksCount: _get(state, 'currentReviewNeededTasks.totalCount', 0),

  reviewedTasksByMe: _get(state, 'currentReviewedByUserTasks.tasks', []),
  reviewedTasksByMeCount: _get(state, 'currentReviewedByUserTasks.totalCount', 0),

  reviewedTasks: _get(state, 'currentReviewedTasks.tasks', []),
  reviewedTasksCount: _get(state, 'currentReviewedTasks.totalCount', 0),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateReviewNeededTasks: (searchCriteria={}, pageSize=DEFAULT_PAGE_SIZE) => {
    return dispatch(fetchReviewNeededTasks(searchCriteria, pageSize))
  },
  updateReviewedTasks: (searchCriteria={}, pageSize=DEFAULT_PAGE_SIZE) => {
    return dispatch(fetchReviewedTasks(searchCriteria, false, pageSize))
  },
  updateUserReviewedTasks: (searchCriteria={}, pageSize=DEFAULT_PAGE_SIZE) => {
    return dispatch(fetchReviewedTasks(searchCriteria, true, pageSize))
  },

  startNextReviewTask: (sortBy, direction, filters, url) => {
    dispatch(loadNextReviewTask({sortCriteria: {sortBy, direction}, filters})).then((task) => {
      url.push(`/challenge/${task.parentId}/task/${task.id}/review`)
    }).catch(error => {
      console.log(error)
      dispatch(addError(AppErrors.reviewTask.fetchFailure))
      url.push('/review')
    })
  }

})

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WithReviewTasks(WrappedComponent))
