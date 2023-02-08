import {
  type FocusEventHandler,
  type ChangeEventHandler,
  type MouseEvent,
  type KeyboardEvent,
  type ChangeEvent,
  useState,
} from 'react';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import Constraints from '@commercetools-uikit/constraints';
import { SearchIcon, CloseIcon } from '@commercetools-uikit/icons';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import {
  getClearIconButtonStyles,
  getSearchIconButtonStyles,
  getSearchTextInputContainerStyles,
  getSearchTextInputStyles,
} from './search-text-input.styles';

export type TSearchTextInputProps = {
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
   * Used as HTML name of the input component. property.
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
   * Handler when the search button is clicked.
   */
  onSubmit: (searchValue: string) => void;
  /**
   * Handler when the clear button is clicked.
   */
  onReset: () => void;
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
  /**
   * Indicates if the input has warning values
   */
  hasWarning?: boolean;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Indicates if the input should be cleared when the clear button is clicked.
   * Defaults to true.
   *
   */
  isClearable?: boolean;
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

const defaultProps: Pick<
  TSearchTextInputProps,
  'horizontalConstraint' | 'isClearable'
> = {
  horizontalConstraint: 'scale',
  isClearable: true,
};

const SearchTextInput = (props: TSearchTextInputProps) => {
  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'TextInput: `onChange` is required when is not read only.'
    );
  }

  const [searchValue, setSearchValue] = useState(props.value || '');

  const handleClear = () => {
    setSearchValue('');
    if (props.onReset) {
      props.onReset();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  const handleSubmit = (
    event: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(searchValue);
    }
  };

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <div css={getSearchTextInputContainerStyles(props)}>
        <input
          id={props.id}
          name={props.name}
          type="text"
          value={searchValue}
          onChange={handleChange}
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
          {...filterDataAttributes(props)}
        />
        {props.isClearable &&
          searchValue &&
          !props.isDisabled &&
          !props.isReadOnly && (
            <SecondaryIconButton
              icon={<CloseIcon size="medium" />}
              label={'clear-button'}
              onClick={handleClear}
              css={getClearIconButtonStyles(props)}
            />
          )}
        <SecondaryIconButton
          icon={<SearchIcon />}
          label={'search-button'}
          onClick={handleSubmit}
          css={getSearchIconButtonStyles(props)}
        />
      </div>
    </Constraints.Horizontal>
  );
};

SearchTextInput.displayName = 'SearchTextInput';
SearchTextInput.defaultProps = defaultProps;
SearchTextInput.isEmpty = (value: TSearchTextInputProps['value']) =>
  !value || value.trim().length === 0;

export default SearchTextInput;
