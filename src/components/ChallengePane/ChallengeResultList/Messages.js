import { defineMessages } from 'react-intl'

/**
 * Internationalized messages for use with ChallengeResultList.
 */
export default defineMessages({
  heading: {
    id: "Challenge.results.heading",
    defaultMessage: "Challenges",
  },

  clearFiltersLabel: {
    id: "Challenge.controls.clearFilters.label",
    defaultMessage: "Clear Filters",
  },

  noResults: {
    id: "Challenge.results.noResults",
    defaultMessage: "No Results",
  },

  createVirtualChallenge: {
    id: "VirtualChallenge.controls.create.label",
    defaultMessage: "Work on {taskCount, number} Mapped Tasks",
  },

  virtualChallengeNameLabel: {
    id: "VirtualChallenge.fields.name.label",
    defaultMessage: 'Name your "virtual" challenge',
  },

  loadMoreLabel: {
    id: "Challenge.controls.loadMore.label",
    defaultMessage: "More Results",
  },
})
