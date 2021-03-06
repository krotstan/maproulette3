import React, { Component } from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import _omit from 'lodash/omit'
import _isFunction from 'lodash/isFunction'
import { setSearch, clearSearch } from '../../../services/Search/Search'

/**
 * WithSearchQuery works with the Search service to provide wrapped components
 * with the named search query text as well as functions for updating and
 * clearing that query text.
 *
 * > Note that WithSearchQuery does not provide any search results, only
 * > facilities for managing the query text itself.
 *
 * @see See WithSearchResults for a HOC that provides results for a named search
 *
 * @param {string} searchName - The name of the search/query to work with.
 */
const WithSearchQuery = (WrappedComponent, searchName) =>
  connect(mapStateToProps, mapDispatchToProps)(
    _WithSearchQuery(WrappedComponent, searchName)
  )

export const _WithSearchQuery = function(WrappedComponent, searchName) {
  return class extends Component {
    setSearch = (query) => this.props.setSearch(query, searchName)
    clearSearch = () => this.props.clearSearch(searchName)

    render() {
      // Merge our search query in with others in case there are multiple
      // searches in play.
      const searchQueries =
        Object.assign({}, _get(this.props, 'searchQueries', {}), {
          [searchName]: {
            searchQuery: _get(this.props, `currentSearch.${searchName}`),
            setSearch: this.setSearch,
            clearSearch: this.clearSearch,
          }
      })

      return <WrappedComponent searchQueries={searchQueries}
                               {..._omit(this.props, ['searchQueries',
                                                      'currentSearch',
                                                      'setSearch',
                                                      'clearSearch'])} />
    }
  }
}

export const mapStateToProps = state => ({
  currentSearch: _get(state, 'currentSearch')
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  setSearch: (query, searchName) => {
    dispatch(setSearch(searchName, query))

    // If multiple WithSearchQuery HOCs are chained, pass it up
    if (_isFunction(ownProps.setSearch)) {
      ownProps.setSearch(query, searchName)
    }
  },
  clearSearch: (searchName) => {
    dispatch(clearSearch(searchName))

    // If multiple WithSearchQuery HOCs are chained, pass it up
    if (_isFunction(ownProps.clearSearch)) {
      ownProps.clearSearch(searchName)
    }
  },
})

export default WithSearchQuery
