import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { useIntl } from 'react-intl';
import { css } from '@emotion/core';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import FlatButton from '@commercetools-uikit/flat-button';
import { useToggleState } from '@commercetools-uikit/hooks';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Stack from '@commercetools-uikit/spacings-stack';
import Constraints from '@commercetools-uikit/constraints';
import MultilineInput from '../../../../../src/components/internals/multiline-input';
import messages from '../../../../../src/components/internals/messages/multiline-input';

const MultilineTextInput = (props) => {
  const intl = useIntl();

  const [contentRowCount, setContentRowCount] = React.useState(
    MultilineTextInput.MIN_ROW_COUNT
  );

  const [isOpen, toggle] = useToggleState(props.defaultExpandMultilineText);

  const { onFocus } = props;
  const handleFocus = React.useCallback(() => {
    if (!isOpen) toggle();
    if (onFocus) onFocus();
  }, [isOpen, onFocus, toggle]);

  const handleHeightChange = React.useCallback(
    (_, rowCount) => {
      setContentRowCount(rowCount);
    },
    [setContentRowCount]
  );

  // This checks if the content in the textarea overflows the minimum
  // amount of lines it should have when collapsed
  const shouldRenderToggleButton =
    contentRowCount > MultilineTextInput.MIN_ROW_COUNT;

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Stack scale="xs">
        <MultilineInput
          name={props.name}
          autoComplete={props.autoComplete}
          value={props.value}
          onChange={props.onChange}
          onHeightChange={handleHeightChange}
          id={props.id}
          onBlur={props.onBlur}
          onFocus={handleFocus}
          isDisabled={props.isDisabled}
          hasError={props.hasError}
          hasWarning={props.hasWarning}
          placeholder={props.placeholder}
          isReadOnly={props.isReadOnly}
          isAutofocussed={props.isAutofocussed}
          isOpen={isOpen}
          {...filterDataAttributes(props)}
        />
        {shouldRenderToggleButton && (
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <FlatButton
              onClick={toggle}
              isDisabled={props.isDisabled}
              label={intl.formatMessage(
                isOpen ? messages.collapse : messages.expand
              )}
              icon={
                isOpen ? (
                  <AngleUpIcon size="small" />
                ) : (
                  <AngleDownIcon size="small" />
                )
              }
            />
          </div>
        )}
      </Stack>
    </Constraints.Horizontal>
  );
};

MultilineTextInput.displayName = 'MultilineTextInput';

// The minimum ammount of rows the MultilineTextInput will show.
// When the input is closed, this is used as the maximum row count as well
// so that the input "collapses".
MultilineTextInput.MIN_ROW_COUNT = 1;

MultilineTextInput.isEmpty = (value) => !value || value.trim().length === 0;

MultilineTextInput.propTypes = {
  /**
   * Used as HTML name of the input component. property
   */
  name: PropTypes.string,
  /**
   * Used as HTML `autocomplete` property
   */
  autoComplete: PropTypes.string,
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id: PropTypes.string,
  /**
   * Value of the input component.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   * <br />
   * Signature: `(event) => void`
   */
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  /**
   * Called when input is blurred
   * <br />
   * Signature: `(event) => void`
   */
  onBlur: PropTypes.func,
  /**
   * Called when input is focused
   * <br />
   * Signature: `(event) => void`
   */
  onFocus: PropTypes.func,
  /**
   * Focus the input on initial render
   */
  isAutofocussed: PropTypes.bool,
  /**
   * Expands multiline text input initially
   */
  defaultExpandMultilineText: PropTypes.bool,
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled: PropTypes.bool,
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly: PropTypes.bool,
  /**
   * Placeholder text for the input
   */
  placeholder: PropTypes.string,
  /**
   * Indicates that input has errors
   */
  hasError: PropTypes.bool,
  /**
   * Control to indicate on the input if there are selected values that are potentially invalid
   */
  hasWarning: PropTypes.bool,
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
};

MultilineTextInput.defaultProps = {
  defaultExpandMultilineText: false,
};

export default MultilineTextInput;
