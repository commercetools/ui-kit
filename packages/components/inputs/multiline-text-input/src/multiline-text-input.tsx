import {
  useState,
  useCallback,
  ChangeEventHandler,
  FocusEventHandler,
  FocusEvent,
} from 'react';
import { useIntl } from 'react-intl';
import { css } from '@emotion/react';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import FlatButton from '@commercetools-uikit/flat-button';
import { useToggleState } from '@commercetools-uikit/hooks';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Stack from '@commercetools-uikit/spacings-stack';
import Constraints from '@commercetools-uikit/constraints';
import {
  MultilineInput,
  messagesMultilineInput,
} from '@commercetools-uikit/input-utils';

export type TMultilineTextInputProps = {
  /**
   * Used as HTML name of the input component. property
   */
  name?: string;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
  /**
   * Used as HTML `autocomplete` property
   */
  autoComplete?: string;
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Value of the input component.
   */
  value: string;
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   */
  onChange?: ChangeEventHandler;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler;
  /**
   * Called when input is focused
   */
  onFocus?: FocusEventHandler;
  /**
   * Focus the input on initial render
   */
  isAutofocussed?: boolean;
  /**
   * Expands multiline text input initially
   */
  defaultExpandMultilineText?: boolean;
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled?: boolean;
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly?: boolean;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Indicates that input has errors
   */
  hasError?: boolean;
  /**
   * Control to indicate on the input if there are selected values that are potentially invalid
   */
  hasWarning?: boolean;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
};

const defaultProps: Pick<
  TMultilineTextInputProps,
  'defaultExpandMultilineText'
> = {
  defaultExpandMultilineText: false,
};

const MultilineTextInput = (props: TMultilineTextInputProps) => {
  const intl = useIntl();

  const [contentRowCount, setContentRowCount] = useState<number>(
    MultilineTextInput.MIN_ROW_COUNT
  );

  const [isOpen, toggle] = useToggleState(props.defaultExpandMultilineText);

  const { onFocus } = props;
  const handleFocus = useCallback<FocusEventHandler>(
    (event: FocusEvent) => {
      if (!isOpen) toggle(true);
      if (onFocus) onFocus(event);
    },
    [isOpen, onFocus, toggle]
  );

  const handleHeightChange = useCallback<
    (height: number, rowCount: number) => void
  >(
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
    <Constraints.Horizontal max={props.horizontalConstraint}>
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
          /* ARIA */
          aria-invalid={props['aria-invalid']}
          aria-errormessage={props['aria-errormessage']}
        />
        {shouldRenderToggleButton && (
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <FlatButton
              onClick={() => toggle()}
              isDisabled={props.isDisabled}
              label={intl.formatMessage(
                isOpen
                  ? messagesMultilineInput.collapse
                  : messagesMultilineInput.expand
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

MultilineTextInput.isEmpty = (value: TMultilineTextInputProps['value']) =>
  !value || value.trim().length === 0;
MultilineTextInput.defaultProps = defaultProps;

export default MultilineTextInput;
