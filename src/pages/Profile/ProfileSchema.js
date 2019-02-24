import React from 'react'
import _map from 'lodash/map'
import _values from 'lodash/values'
import _without from 'lodash/without'
import _filter from 'lodash/filter'
import { Locale, localeLabels, defaultLocale } from '../../services/User/Locale/Locale'
import { Editor, editorLabels } from '../../services/Editor/Editor'
import { ChallengeBasemap, basemapLayerLabels }
       from '../../services/Challenge/ChallengeBasemap/ChallengeBasemap'
import { LayerSources } from '../../services/VisibleLayer/LayerSources'
import MarkdownContent from '../../components/MarkdownContent/MarkdownContent'
import messages from './Messages'

/**
 * Generates a JSON Schema describing editable User Settings fields intended
 * for consumption by react-jsonschema-form.
 *
 * @param intl - intl instance from react-intl
 *
 * @see See http://json-schema.org
 * @see See https://github.com/mozilla-services/react-jsonschema-form
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export const jsSchema = intl => {
  const localizedLocaleLabels = localeLabels(intl)
  const localizedEditorLabels = editorLabels(intl)
  const localizedBasemapLabels = basemapLayerLabels(intl)

  const defaultBasemapChoices = [
    { id: ChallengeBasemap.none.toString(), name: localizedBasemapLabels.none }
  ].concat(_map(_filter(LayerSources, source => !source.overlay),
                source => ({id: source.id, name: source.name}))).concat([
    { id: ChallengeBasemap.custom.toString(), name: localizedBasemapLabels.custom }
  ])

  return {
    "$schema": "http://json-schema.org/draft-06/schema#",
    type: "object",
    properties: {
      defaultEditor: {
        title: intl.formatMessage(messages.defaultEditorLabel),
        type: "number",
        enum: _values(Editor),
        enumNames: _map(Editor, (value, key) => localizedEditorLabels[key]),
        default: Editor.none,
      },
      locale: {
        title: intl.formatMessage(messages.localeLabel),
        type: "string",
        enum: _values(Locale),
        enumNames: _map(Locale, value => localizedLocaleLabels[value]),
        default: defaultLocale(),
      },
      defaultBasemap: {
        title: intl.formatMessage(messages.defaultBasemapLabel),
        type: "string",
        enum: _map(defaultBasemapChoices, 'id'),
        enumNames: _map(defaultBasemapChoices, 'name'),
        default: ChallengeBasemap.none.toString(),
      },
      leaderboardOptOut: {
        title: intl.formatMessage(messages.leaderboardOptOutLabel),
        type: "boolean",
        default: false,
      },
      needsReview: {
        title: intl.formatMessage(messages.needsReviewLabel),
        type: "boolean",
        default: false,
      },
      isReviewer: {
        title: intl.formatMessage(messages.isReviewerLabel),
        type: "boolean",
        default: false,
      },
    },
    dependencies: { // Only show customBasemap if defaultBasemap set to Custom
      defaultBasemap: {
        oneOf: [
          {
            properties: {
              defaultBasemap: {
                enum: _without(_map(defaultBasemapChoices, 'id'), ChallengeBasemap.custom.toString()),
              }
            }
          },
          {
            properties: {
              defaultBasemap: {
                enum: [ChallengeBasemap.custom.toString()],
              },
              customBasemap: {
                title: intl.formatMessage(messages.customBasemapLabel),
                type: "string",
              },
            },
            required: ['customBasemap']
          }
        ]
      }
    }
  }
}

/**
 * uiSchema configuration to assist react-jsonschema-form in determining
 * how to render the schema fields.
 *
 * @see See https://github.com/mozilla-services/react-jsonschema-form
 *
 * > Note: for anything other than text inputs, specifying the ui:widget type in
 * > the form configuration will help the Bulma/RJSFFormFieldAdapter generate the
 * > proper Bulma-compliant markup.
 */
export const uiSchema = intl => {
  return ({
    defaultEditor: {
      "ui:widget": "select",
      "ui:help": intl.formatMessage(messages.defaultEditorDescription),
    },
    defaultBasemap: {
      "ui:widget": "select",
      "ui:help": intl.formatMessage(messages.defaultBasemapDescription),
    },
    customBasemap: {
      "ui:emptyValue": "",
      "ui:help": <MarkdownContent markdown={intl.formatMessage(messages.customBasemapDescription, {dummy: ''})} />,
    },
    locale: {
      "ui:widget": "select",
      "ui:help": intl.formatMessage(messages.localeDescription),
    },
    leaderboardOptOut: {
      "ui:widget": "radio",
      "ui:help": <MarkdownContent markdown={intl.formatMessage(messages.leaderboardOptOutDescription)} />,
    },
    needsReview: {
      "ui:widget": "radio",
      "ui:help": intl.formatMessage(messages.needsReviewDescription),
    },
    isReviewer: {
      "ui:widget": "radio",
      "ui:help": intl.formatMessage(messages.isReviewerDescription),
    },
  })
}
