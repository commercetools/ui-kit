import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { css } from '@emotion/core';
import MultilineTextInput from '../multiline-text-input';
import {
  getTextareaStyles,
  getLanguageLabelStyles,
} from './translation-input.styles';

const ToggleContainer = props => {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          flex: 1;
        `}
      >
        {(() => {
          if (props.error) return <div>{props.error}</div>;
          if (props.warning) return <div>{props.warning}</div>;
          return props.languagesControl;
        })()}
      </div>
      <div
        css={css`
          flex: 0;
        `}
      >
        {props.children}
      </div>
    </div>
  );
};

ToggleContainer.displayName = 'ToggleContainer';
ToggleContainer.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.node,
  warning: PropTypes.node,
  languagesControl: PropTypes.node,
};

const TextAreaContainer = props => {
  return (
    <div
      css={css`
        width: 100%;
        position: relative;
        display: flex;
      `}
    >
      <label
        css={theme => getLanguageLabelStyles(props, theme)}
        htmlFor={props.id}
      >
        {props.language.toUpperCase()}
      </label>
      {props.children}
    </div>
  );
};

TextAreaContainer.displayName = 'TextAreaContainer';

TextAreaContainer.propTypes = {
  id: PropTypes.string,
  language: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const TranslationInput = props => {
  const { onChange } = props;

  const handleChange = React.useCallback(
    event => {
      // We manipulate the event to add the language to the target.
      // That way the users of LocalizedTextInput's onChange can read
      // event.target.language and event.target.value to determine the next value.
      //
      // We only need this information for the story, the MC application code will
      // never need to access the information in such an inconvenient way, as
      // Formik can deal with a name like "foo.en" and sets the value correctly.
      // We can't use this as we aren't guaranteed a name in the story as the user
      // might clear it using the knob, and then we can't parse the language from
      // the input name anymore.
      //
      // eslint-disable-next-line no-param-reassign
      event.target.language = props.language;
      onChange(event);
    },
    [onChange, props.language]
  );

  return (
    <MultilineTextInput
      {...props}
      components={{
        TextAreaContainer,
        ToggleContainer,
      }}
      componentProps={{
        TextAreaContainer: { language: props.language, id: props.id },
        ToggleContainer: {
          error: props.error,
          warning: props.warning,
          languagesControl: props.languagesControl,
        },
      }}
      defaultExpandMultilineText={!props.isCollapsed}
      onChange={handleChange}
      css={theme => getTextareaStyles(props, theme)}
    />
  );
};

TranslationInput.displayName = 'TranslationInput';

TranslationInput.propTypes = {
  id: PropTypes.string,
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  language: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isCollapsed: PropTypes.bool,
  onToggle: PropTypes.func,
  isAutofocussed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  languagesControl: PropTypes.node,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  placeholder: PropTypes.string,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.node,
  warning: PropTypes.node,
};

// The minimum ammount of rows the MultilineTextInput will show.
// When the input is closed, this is used as the maximum row count as well
// so that the input "collapses".
TranslationInput.MIN_ROW_COUNT = 1;

export default TranslationInput;
