import {
  FocusEventHandler,
  ChangeEventHandler,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { SearchIcon } from '@commercetools-uikit/icons';
import {
  getSearchTextInputButtonStyles,
  getSearchTextInputContainerStyles,
  getSearchTextInputStyles,
} from './search-text-input.styles';

export type SearchTextInputProps = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Used as HTML autocomplete property
   */
  autoComplete?: string;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
  /**
   * `className` forwarded to the underlying `<input />`.
   */
  className?: string;
  /**
   * Used as HTML name of the input component. property
   */
  name?: string;
  /**
   * Value of the input component.
   */
  value: string;
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Called when input is focused
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Handler when the button is clicked.
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Focus the input on initial render
   */
  isAutofocussed?: boolean;
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled?: boolean;
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly?: boolean;
  /**
   * Indicates if the input has invalid values
   */
  hasError?: boolean;
  hasWarning?: boolean;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
    | 3
    | 4
    | 5
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

const SearchTextInput = (props: SearchTextInputProps) => {
  return (
    <div css={getSearchTextInputContainerStyles(props)}>
      <input
        id={props.id}
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        readOnly={props.isReadOnly}
        autoFocus={props.isAutofocussed}
        autoComplete={props.autoComplete}
        aria-readonly={props.isReadOnly}
        contentEditable={!props.isReadOnly}
        aria-invalid={props['aria-invalid']}
        aria-errormessage={props['aria-errormessage']}
        css={getSearchTextInputStyles(props)}
      />
      <SecondaryIconButton
        icon={<SearchIcon />}
        label={'search-button'}
        onClick={props.onClick}
        css={getSearchTextInputButtonStyles(props)}
      />
    </div>
  );
};

export default SearchTextInput;
