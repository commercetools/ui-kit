/* eslint-disable react/prop-types, react/display-name */
import React from 'react';
import { Value } from 'slate';
import { Value as ReactValue } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs/react';
import Section from '../../../../.storybook/decorators/section';
import ErrorMessage from '../../messages/error-message';
import WarningMessage from '../../messages/warning-message';
import Readme from './README.md';
import LocalizedRichTextInput from './localized-rich-text-input';
import jsonValue from './testing/json-values/empty-value';

// Create our initial value...

const initialValue = Value.fromJSON(jsonValue);

class StoryWrapper extends React.Component {
  onChange = event => {
    this.props.onChange({
      ...this.props.value,
      [event.target.language]: event.target.value,
    });
  };

  onBlur = action('onBlur');
  onFocus = action('onFocus');

  render() {
    const { props } = this;
    const defaultExpandLanguages = boolean('defaultExpandLanguages', false);
    const defaultExpandMultilineText = boolean(
      'defaultExpandMultilineText',
      false
    );
    const errors = object('errors', { en: '', de: '', 'nan-Hant-TW': '' });
    const warnings = object('warnings', { en: '', de: '', 'nan-Hant-TW': '' });
    // We need to force the component to rerender in case a default value
    // is changed. Otherwise the knob would have no effect.
    // We do this by changing the key.
    const key = `${defaultExpandMultilineText}-${defaultExpandLanguages}`;

    return (
      <LocalizedRichTextInput
        key={key}
        id={text('id', 'test-id')}
        name={text('name', 'productName')}
        value={props.value}
        onChange={this.onChange}
        selectedLanguage={select(
          'selectedLanguage',
          ['en', 'de', 'nan-Hant-TW'],
          'en'
        )}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        hideLanguageExpansionControls={boolean(
          'hideLanguageExpansionControls',
          false
        )}
        defaultExpandLanguages={
          // we need to set undefined instead of false to avoid prop-type
          // warnings in case hideLanguageExpansionControls is true
          defaultExpandLanguages || undefined
        }
        defaultExpandMultilineText={defaultExpandMultilineText}
        isAutofocussed={boolean('isAutofocussed', false)}
        isDisabled={boolean('isDisabled', false)}
        isReadOnly={boolean('isReadOnly', false)}
        placeholder={object('placeholder', {
          en: '',
          de: '',
          'nan-Hant-TW': '',
        })}
        horizontalConstraint={select(
          'horizontalConstraint',
          ['m', 'l', 'xl', 'scale'],
          'm'
        )}
        hasError={boolean('hasError', false)}
        hasWarning={boolean('hasWarning', false)}
        errors={
          Object.values(errors).some(error => error.length > 0)
            ? Object.entries(errors).reduce((acc, [language, error]) => {
                if (error.length === 0) return acc;
                acc[language] = <ErrorMessage>{error}</ErrorMessage>;
                return acc;
              }, {})
            : undefined
        }
        warnings={
          Object.values(warnings).some(warning => warning.length > 0)
            ? Object.entries(warnings).reduce((acc, [language, warning]) => {
                if (warning.length === 0) return acc;
                acc[language] = <WarningMessage>{warning}</WarningMessage>;
                return acc;
              }, {})
            : undefined
        }
        data-test="foo"
      />
    );
  }
}

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('LocalizedRichTextInput', () => {
    return (
      <Section>
        <ReactValue
          defaultValue={{
            en: initialValue,
            de: initialValue,
            'nan-Hant-TW': initialValue,
          }}
          render={(value, onChange) => (
            <StoryWrapper value={value} onChange={onChange} />
          )}
        />
      </Section>
    );
  });
