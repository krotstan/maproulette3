import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _split from 'lodash/split'
import _each from 'lodash/each'
import _map from 'lodash/map'
import queryString from 'query-string'
import { toLatLngBounds, fromLatLngBounds }
       from '../../../services/MapBounds/MapBounds'

/**
 * WithSearchRoute adds functionality to WithSearch to add/remove values to the URL route
 * as criteria changes. Then when the app is loaded any criteria on the
 * route will be used to filter the challenge search shown.
 *
 * @author [Kelli Rotstan](https://github.com/krotstan)
 *
 * @see See WithSearch
 *
 * @param {WrappedComponent} WrappedComponent - The component to wrap
 * @param {string} searchGroup - The group name of the search criteria to work with
 */
export const WithSearchRoute = function(WrappedComponent, searchGroup) {
  class _WithSearchRoute extends Component {

    // Sets up the matching URL parameters to an appropriate function to call.
    // eg. 'sort=name' would call the function for 'sort' passing it the param
    // 'name'
    routeCriteria = {
       sort: param => this.props.setSearchSort({sortBy: param}),
       difficulty: param => this.props.setSearchFilters({difficulty: parseInt(param, 10)}),
       keywords: param => this.props.setKeywordFilter(_split(param, ',')),
       location: param => this.props.setSearchFilters({location: param}),
       query: param => this.props.setSearch(param),
       challengeSearch: param => this.props.setChallengeSearchMapBounds(toLatLngBounds(param), true)
    }

    state = {
      loadedFromRoute: false,
    }

    componentDidMount() {
      // If we have not loaded all the paramters from the route then we need to.
      if (!this.state.loadedFromRoute) {
        this.setState({loadedFromRoute: true})

        if (!_isEmpty(this.props.history.location.search)) {
          if (this.props.clearSearchFilters) {
            // Clear any redux values first before setting the route criteria
            const routeValues = this.props.history.location.search
            this.props.clearSearchFilters(false)
            this.props.clearSearch(searchGroup)
            this.props.clearMapBounds(searchGroup)

            executeRouteSearch(this.routeCriteria, routeValues)
          }
        }
      }
    }

    setSearch = (query, searchName = searchGroup) => {
      this.props.setSearch(query, searchName)
      addSearchCriteriaToRoute(this.props.history, {query: `${query}`})
    }

    clearSearch = (searchName = searchGroup) => {
      this.props.clearSearch(searchName)
      removeSearchCriteriaFromRoute(this.props.history, ['query'])
    }

    setSearchSort = (sortCriteria) => {
      this.props.setSearchSort(sortCriteria)
      addSearchCriteriaToRoute(this.props.history, {sort: _get(sortCriteria, 'sortBy')})
    }

    setSearchFilters = (filterCriteria) => {
      this.props.setSearchFilters(filterCriteria)
      addSearchCriteriaToRoute(this.props.history, filterCriteria)

      // If our app is still loading then we don't want to mess with the URL route
      // and we only want to add the map bounds if they are relevant to the
      // challenge search results. (ie. 'withinMapBounds' or 'intersectingMapBounds')
      if (searchGroup === "challenges" && !this.props.isLoading) {
        if (filterCriteria.location === 'withinMapBounds' ||
            filterCriteria.location === 'intersectingMapBounds') {
          if (_get(this.props, `currentSearch.${searchGroup}`)) {
            const bounds = _get(this.props, `currentSearch.${searchGroup}.mapBounds.bounds`)
            addBoundsToRoute(this.props.history, 'challengeSearch', bounds)
          }
        }
      }
    }

    removeSearchFilters = (criteriaNames) => {
      this.props.removeSearchFilters(criteriaNames)
      removeSearchCriteriaFromRoute(this.props.history, criteriaNames)

      // If we are removing the 'location' criteria then we don't need
      // the map bounds on the url route either.
      if (criteriaNames.indexOf('location') > -1) {
        removeSearchCriteriaFromRoute(this.props.history, ['challengeSearch'])
      }
    }

    setKeywordFilter = (keywords) => {
      this.props.setKeywordFilter(keywords)
      addSearchCriteriaToRoute(this.props.history, {keywords: keywords.join(',')})
    }

    clearSearchFilters = (clearRoute = true) => {
      this.props.clearSearchFilters(clearRoute)
      clearRoute && this.props.history.push(this.props.history.location.pathname)
    }

    updateChallengeSearchMapBounds = (bounds, fromUserAction=false) => {
      this.props.setChallengeSearchMapBounds(bounds, fromUserAction)

      // If our app is still loading then we don't want to mess with the URL route
      // and we only want to add the map bounds if they are relevant to the
      // challenge search results. (ie. 'withinMapBounds' or 'intersectingMapBounds')
      if (!this.props.isLoading && searchGroup === "challenges" && _get(this.props, `currentSearch.${searchGroup}`)) {
        if (_get(this.props, `currentSearch.${searchGroup}.filters.location`) === 'withinMapBounds' ||
            _get(this.props, `currentSearch.${searchGroup}.filters.location`) === 'intersectingMapBounds') {
          addBoundsToRoute(this.props.history, 'challengeSearch', bounds)
        }
        else {
          removeSearchCriteriaFromRoute(this.props.history, ['challengeSearch'])
        }
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props}
                            isLoading={this.props.isLoading || !this.state.loadedFromRoute}
                            setSearch={this.setSearch}
                            clearSearch={this.clearSearch}
                            setSearchSort={this.setSearchSort}
                            setSearchFilters={this.setSearchFilters}
                            removeSearchFilters={this.removeSearchFilters}
                            setKeywordFilter={this.setKeywordFilter}
                            clearSearchFilters={this.clearSearchFilters}
                            updateChallengeSearchMapBounds={this.updateChallengeSearchMapBounds} />
       )
     }
  }

  _WithSearchRoute.propTypes = {
    isLoading: PropTypes.bool
  }

  _WithSearchRoute.defaultProps = {
    isLoading: true,
  }

  return _WithSearchRoute
}

export const executeRouteSearch = (routeCriteria, searchString) => {
  const searchCriteria = queryString.parse(searchString)
  _each(searchCriteria, (value, key) => {
    if (routeCriteria[key]) {
      routeCriteria[key](value)
    }
  })
}

export const addSearchCriteriaToRoute = (history, newCriteria) => {
  const searchCriteria = queryString.parse(history.location.search)

  _each(newCriteria, (value, key) => {
    if (value === undefined) {
      delete searchCriteria[key]
    }
    else {
      searchCriteria[key] = value
    }
  })

  const newRoute = queryString.stringify(searchCriteria)
  history.replace(`${history.location.pathname}?${newRoute}`)
}

export const addBoundsToRoute = (history, boundsType, bounds) => {
  addSearchCriteriaToRoute(history,
    {[boundsType]: `${fromLatLngBounds(bounds).join(',')}`})
}

export const removeSearchCriteriaFromRoute = (history, criteriaKeys) => {
  const searchCriteria = queryString.parse(history.location.search)

  _each(criteriaKeys, key => {
    delete searchCriteria[key]
  })

  const newRoute = _map(searchCriteria, (value, key) => `${key}=${value}`).join('&')
  history.replace(`${history.location.pathname}?${newRoute}`)
}

export default WithSearchRoute
