import {
  useState,
  useCallback,
  type ChangeEventHandler,
  type FocusEventHandler,
  ReactElement,
} from 'react';
import SecondaryIconButton, {
  type TSecondaryButtonIconProps,
} from '@commercetools-uikit/secondary-icon-button';
import { useIntl } from 'react-intl';
import { css } from '@emotion/react';
import { AngleUpIcon, AngleDownIcon } from '@commercetools-uikit/icons';
import FlatButton from '@commercetools-uikit/flat-button';
import { useToggleState } from '@commercetools-uikit/hooks';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import Stack from '@commercetools-uikit/spacings-stack';
import Constraints from '@commercetools-uikit/constraints';
import { designTokens } from '@commercetools-uikit/design-system';
import {
  MultilineInput,
  messagesMultilineInput,
} from '@commercetools-uikit/input-utils';
import {
  MultilineInputWrapper,
  getMultilineTextInputActionIconStyles,
} from './multiline-text-input.styles';

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
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  /**
   * Called when input is focused
   */
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
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

  /**
   * Custom action icon to be displayed on the right side of the input.
   * **Will only show**, if `rightActionProps` is provided.
   */
  rightActionIcon?: ReactElement;
  /**
   * Props for the right-action icon-button. Required when rightActionIcon is provided.
   * At least a `label` and an `onClick` prop/function need to be provided.
   */
  rightActionProps?: TSecondaryButtonIconProps;
  /**
   * Set this to `true` to reduce the paddings of the input allowing the input to display
   * more data in less space.
   *
   */
  isCondensed?: boolean;
  /**
   * Set this to value to determine the maximum text rows of the text area.
   * Any text overflow past this row number would implement a scroll
   */
  maxRows?: number;
};

const MultilineTextInput = ({
  defaultExpandMultilineText = false,
  ...props
}: TMultilineTextInputProps) => {
  const intl = useIntl();
  const [shouldRenderToggleButton, setShouldRenderToggleButton] =
    useState(false);

  const [isOpen, toggle] = useToggleState(defaultExpandMultilineText);

  const { onFocus } = props;
  const handleFocus = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (event) => {
      if (!isOpen) toggle(true);
      if (onFocus) onFocus(event);
    },
    [isOpen, onFocus, toggle]
  );

  const handleHeightChange = useCallback<
    (height: number, rowCount: number) => void
  >(
    (_, rowCount) => {
      // This checks if the content in the textarea is greater than one row. If it is, then the toggle button will be shown.
      // This is to prevent the toggle button from showing when there is not enough content to expand/collapse.
      setShouldRenderToggleButton(rowCount > 1);
    },
    [setShouldRenderToggleButton]
  );

  if (props.rightActionIcon && !props.rightActionProps) {
    warning(
      false,
      'SelectableSearchInput: `rightActionIcon` is provided but `rightActionProps` is missing. Provide an object with a `label` and `onClick` property.'
    );
  }

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Stack scale="xs">
        <MultilineInputWrapper>
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
            cacheMeasurements={false}
            css={css`
              padding-right: ${props.rightActionIcon &&
              props.rightActionProps &&
              designTokens.spacing50};
            `}
            isCondensed={props.isCondensed}
            maxRows={props.maxRows}
            {...filterDataAttributes({
              defaultExpandMultilineText,
              ...props,
            })}
            /* ARIA */
            aria-invalid={props['aria-invalid']}
            aria-errormessage={props['aria-errormessage']}
          />
          {props.rightActionIcon && props.rightActionProps && (
            <div
              css={getMultilineTextInputActionIconStyles({
                defaultExpandMultilineText,
                ...props,
              })}
            >
              <SecondaryIconButton
                color="info"
                isDisabled={props.isDisabled || props.isReadOnly}
                size={props.isCondensed ? '30' : '40'}
                icon={props.rightActionIcon}
                {...props.rightActionProps}
              />
            </div>
          )}
        </MultilineInputWrapper>
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

MultilineTextInput.isEmpty = (value: TMultilineTextInputProps['value']) =>
  !value || value.trim().length === 0;

export default MultilineTextInput;
