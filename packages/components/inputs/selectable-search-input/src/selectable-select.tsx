import { useIntl } from 'react-intl';
import Select, {
  components,
  type SingleValueProps,
  type Props as ReactSelectProps,
} from 'react-select';
import { DropdownIndicator, messages } from '@commercetools-uikit/select-utils';
import { useTheme } from '@commercetools-uikit/design-system';
import { type ReactNode, useCallback } from 'react';
import type {
  TSelectableSearchInputProps,
  TOption,
} from './selectable-search-input';
import { createSelectableSelectStyles } from './selectable-search-input.styles';

type TSingleValue = {
  id?: string;
  children?: ReactNode;
} & SingleValueProps;

const SingleValue = ({ id, ...props }: TSingleValue) => (
  <components.SingleValue {...props}>
    <label htmlFor={id}>{props.children}</label>
  </components.SingleValue>
);

type TSelectableSelect = {
  textInputHasFocus: boolean;
  dropdownHasFocus: boolean;
  isNewTheme: boolean;
  handleDropdownFocus: () => void;
  handleDropdownBlur: () => void;
  textInputRef: React.RefObject<HTMLInputElement>;
  selectedOption: TOption;
} & TSelectableSearchInputProps;

const SelectableSelect = (props: TSelectableSelect) => {
  const intl = useIntl();
  const { isNewTheme } = useTheme();

  const dropdownStyles = createSelectableSelectStyles({
    hasWarning: props.hasWarning,
    hasError: props.hasError,
    isDisabled: props.isDisabled,
    isReadOnly: props.isReadOnly,
    menuPortalZIndex: props.menuPortalZIndex,
    isNewTheme,
    dropdownHasFocus: props.dropdownHasFocus,
    textInputHasFocus: props.textInputHasFocus,
  }) as ReactSelectProps['styles'];

  const handleDropdownChange = useCallback(
    (nextSelectedOptions) => {
      if (props.onChange) {
        props.onChange({
          target: {
            id: props.id,
            name: props.name,
            value: (nextSelectedOptions as TOption).value,
          },
        });
      }
      props.textInputRef.current?.focus();
    },
    [props.onChange, props.id, props.name, props.textInputRef]
  );

  return (
    <Select
      inputId={props.id}
      name={props.name}
      value={props.selectedOption}
      isDisabled={props.isDisabled}
      isSearchable={props.isMenuSearchable}
      maxMenuHeight={props.maxMenuHeight}
      closeMenuOnSelect={props.closeMenuOnSelect}
      components={{
        SingleValue: (innerProps) => (
          <SingleValue {...innerProps} id={props.id} />
        ),
        Input: (ownProps) => (
          <components.Input {...ownProps} readOnly={props.isReadOnly} />
        ),
        DropdownIndicator,
      }}
      options={props.options}
      menuIsOpen={props.isReadOnly ? false : undefined}
      placeholder=""
      styles={dropdownStyles}
      onFocus={props.handleDropdownFocus}
      menuPortalTarget={props.menuPortalTarget}
      menuShouldBlockScroll={props.menuShouldBlockScroll}
      onBlur={props.handleDropdownBlur}
      onChange={handleDropdownChange}
      onInputChange={props.onMenuInputChange}
      noOptionsMessage={
        props.noMenuOptionsMessage ||
        (({ inputValue }) =>
          !inputValue || inputValue === ''
            ? intl.formatMessage(messages.noOptionsMessageWithoutInputValue)
            : intl.formatMessage(messages.noOptionsMessageWithInputValue, {
                inputValue,
              }))
      }
    />
  );
};

export default SelectableSelect;
