import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { css } from '@emotion/core';
import MultilineInput from '../../internals/multiline-input';
import FlatButton from '../../buttons/flat-button';
import { AngleUpIcon } from '../../icons';
import Spacings from '../../spacings';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import Text from '../../typography/text';
import messages from './messages';
import {
  getTextareaStyles,
  getLanguageLabelStyles,
} from './translation-input.styles';

const TranslationInput = props => {
  const [contentRowCount, setContentRowCount] = React.useState(
    TranslationInput.MIN_ROW_COUNT
  );

  const handleHeightChange = React.useCallback(
    (_, innerComponent) => {
      setContentRowCount(innerComponent.valueRowCount);
    },
    [setContentRowCount]
  );

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

  const { onFocus, onToggle } = props;
  const handleFocus = React.useCallback(() => {
    // Expand the input on focus
    if (props.isCollapsed) onToggle();
    if (onFocus) onFocus();
  }, [props.isCollapsed, onFocus, onToggle]);

  // This checks if the content in the textarea overflows the minimum
  // amount of lines it should have when collapsed
  const contentExceedsShownRows =
    contentRowCount > TranslationInput.MIN_ROW_COUNT;

  return (
    <Spacings.Stack scale="xs">
      <div
        key={props.language}
        css={css`
          width: 100%;
          position: relative;
          display: flex;
        `}
      >
        <label
          htmlFor={props.id}
          css={theme => getLanguageLabelStyles(props, theme)}
        >
          {/* FIXME: add proper tone for disabled when tones are refactored */}
          <Text.Detail tone="secondary">
            {props.language.toUpperCase()}
          </Text.Detail>
        </label>
        <MultilineInput
          id={props.id}
          name={props.name}
          autoComplete={props.autoComplete}
          value={props.value}
          onChange={handleChange}
          onHeightChange={handleHeightChange}
          onBlur={props.onBlur}
          onFocus={handleFocus}
          isDisabled={props.isDisabled}
          placeholder={props.placeholder}
          css={theme => getTextareaStyles(props, theme)}
          isReadOnly={props.isReadOnly}
          isAutofocussed={props.isAutofocussed}
          isOpen={!props.isCollapsed}
          {...filterDataAttributes(props)}
        />
      </div>
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
          {!props.isCollapsed && contentExceedsShownRows && (
            <FlatButton
              onClick={props.onToggle}
              isDisabled={props.isDisabled}
              label={props.intl.formatMessage(messages.collapse)}
              icon={<AngleUpIcon size="small" />}
            />
          )}
        </div>
      </div>
      {(props.error || props.warning) && props.languagesControl}
    </Spacings.Stack>
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
