import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import FlatButton from '@commercetools-uikit/flat-button';
import { AngleUpIcon } from '@commercetools-uikit/icons';
import Stack from '@commercetools-uikit/spacings-stack';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Text from '@commercetools-uikit/text';
import MultilineInput from '../../../../../src/components/internals/multiline-input';
import messages from '../../../../../src/components/internals/messages/multiline-input';
import {
  getTextareaStyles,
  getLanguageLabelStyles,
  ToggleButtonWrapper,
} from './translation-input.styles';

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  position: relative;
  flex: 0;
  display: flex;
  align-items: flex-start;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-end;

  ${(props) =>
    !props.shouldToggleButtonTakeSpace ? 'margin-top: 0 !important;' : null}
`;

const TranslationInput = (props) => {
  const [contentRowCount, setContentRowCount] = React.useState(
    TranslationInput.MIN_ROW_COUNT
  );

  const handleHeightChange = React.useCallback(
    (_, rowCount) => {
      setContentRowCount(rowCount);
    },
    [setContentRowCount]
  );

  const { onChange } = props;

  const handleChange = React.useCallback(
    (event) => {
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

  const shouldToggleButtonTakeSpace =
    /*
      - if hasLanguagesControl and there are no errors/warnings to display
      - then the toggleButton is absolutely positioned
      This is because the toggle button is placed next to the LocalizedInputToggle without being siblings in the DOM.
      If there is a error or warning showing,
      then it can be placed statically because it will then be a sibling to the error/warning message
      and LocalizedInputToggle is placed below the errors/warnings.
    */
    (!props.isCollapsed &&
      contentExceedsShownRows &&
      !props.hasLanguagesControl) ||
    props.error ||
    props.warning;

  return (
    <Stack scale="xs">
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
          css={(theme) => getLanguageLabelStyles(props, theme)}
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
          css={(theme) => getTextareaStyles(props, theme)}
          hasError={props.hasError}
          hasWarning={props.hasWarning}
          isReadOnly={props.isReadOnly}
          isAutofocussed={props.isAutofocussed}
          isOpen={!props.isCollapsed}
          {...filterDataAttributes(props)}
        />
      </div>
      <Row shouldToggleButtonTakeSpace={shouldToggleButtonTakeSpace}>
        {(() => {
          if (props.error)
            return (
              <LeftColumn>
                <div>{props.error}</div>
              </LeftColumn>
            );
          if (props.warning)
            return (
              <LeftColumn>
                <div>{props.warning}</div>
              </LeftColumn>
            );
          return null;
        })()}
        {!props.isCollapsed && contentExceedsShownRows && (
          <React.Fragment>
            <LeftColumn />
            <RightColumn>
              <ToggleButtonWrapper
                shouldToggleButtonTakeSpace={shouldToggleButtonTakeSpace}
              >
                <FlatButton
                  onClick={props.onToggle}
                  isDisabled={props.isDisabled}
                  label={props.intl.formatMessage(messages.collapse)}
                  icon={<AngleUpIcon size="small" />}
                />
              </ToggleButtonWrapper>
            </RightColumn>
          </React.Fragment>
        )}
      </Row>
    </Stack>
  );
};

TranslationInput.displayName = 'TranslationInput';

TranslationInput.propTypes = {
  id: PropTypes.string,
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  language: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isCollapsed: PropTypes.bool,
  onToggle: PropTypes.func,
  isAutofocussed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  placeholder: PropTypes.string,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.node,
  warning: PropTypes.node,
  hasLanguagesControl: PropTypes.bool,
};

// The minimum ammount of rows the MultilineTextInput will show.
// When the input is closed, this is used as the maximum row count as well
// so that the input "collapses".
TranslationInput.MIN_ROW_COUNT = 1;

export default TranslationInput;
