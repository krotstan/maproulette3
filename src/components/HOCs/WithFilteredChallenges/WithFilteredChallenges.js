import React, { Component } from 'react';
import _every from 'lodash/every'
import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import _omit from 'lodash/omit'
import { challengePassesDifficultyFilter }
       from '../../../services/Challenge/ChallengeDifficulty/ChallengeDifficulty'
import { challengePassesKeywordFilter }
       from '../../../services/Challenge/ChallengeKeywords/ChallengeKeywords'
import { challengePassesLocationFilter }
       from '../../../services/Challenge/ChallengeLocation/ChallengeLocation'

const allFilters = [
  challengePassesDifficultyFilter,
  challengePassesKeywordFilter,
  challengePassesLocationFilter,
]

export default function WithFilteredChallenges(WrappedComponent,
                                               challengesProp='challenges',
                                               outputProp) {
  return class extends Component {
    challengePassesAllFilters(challenge) {
      return _every(allFilters,
                    passes => passes(this.props.challengeFilter, challenge, this.props))
    }

    render() {
      const filteredChallenges = _filter(this.props[challengesProp],
                                         challenge => this.challengePassesAllFilters(challenge))

      if (_isEmpty(outputProp)) {
        outputProp = challengesProp
      }

      return <WrappedComponent {...{[outputProp]: filteredChallenges}}
                               unfilteredChallenges={this.props[challengesProp]}
                               {..._omit(this.props, outputProp)} />
    }
  }
}
