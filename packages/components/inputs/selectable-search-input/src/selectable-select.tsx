import has from 'lodash/has';
import flatMap from 'lodash/flatMap';
import { useIntl } from 'react-intl';

import Select, {
  components,
  SingleValueProps,
  type Props as ReactSelectProps,
} from 'react-select';
import {
  createSelectStyles,
  DropdownIndicator,
  messages,
} from '@commercetools-uikit/select-utils';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import { ReactNode, useCallback } from 'react';
import {
  TSelectableSearchInputProps,
  TOption,
  TOptionObject,
} from './selectable-search-input';

type TBase = {
  backgroundColor?: string;
  color?: string;
};

type TCreateSelectableSelectStyles = {
  isDisabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  menuPortalZIndex?: number;
  isNewTheme: boolean;
  dropdownHasFocus?: boolean;
  textInputHasFocus?: boolean;
};

type TSingleValue = {
  id?: string;
  children?: ReactNode;
} & SingleValueProps;

const SingleValue = ({ id, ...props }: TSingleValue) => (
  <components.SingleValue {...props}>
    <label htmlFor={id}>{props.children}</label>
  </components.SingleValue>
);

const createSelectableSelectStyles = ({
  hasWarning,
  hasError,
  isDisabled,
  isReadOnly,
  menuPortalZIndex,
  isNewTheme,
  dropdownHasFocus,
  textInputHasFocus,
}: TCreateSelectableSelectStyles) => {
  const selectStyles = createSelectStyles({
    hasWarning,
    hasError,
    menuPortalZIndex,
    isNewTheme,
  });

  return {
    ...selectStyles,
    control: (base: TBase, state: ReactSelectProps) => ({
      ...selectStyles.control(base, state),
      padding: designTokens.paddingForSelectableSelectInputDropdown,
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
      borderRight: '0',
      height: '100%',
      borderColor: (() => {
        if (isDisabled)
          return `${designTokens.borderColorForInputWhenDisabled} !important`;
        if (hasError) return designTokens.borderColorForInputWhenError;
        if (hasWarning) return designTokens.borderColorForInputWhenWarning;
        if (textInputHasFocus && !isNewTheme) {
          return designTokens.borderColorForInputWhenFocused;
        }
        if (dropdownHasFocus) {
          return designTokens.borderColorForInputWhenFocused;
        }
        if (isReadOnly)
          return `${designTokens.borderColorForInputWhenReadonly} !important`;
        return designTokens.borderColorForInput;
      })(),
      cursor: (() => {
        if (isDisabled) return 'not-allowed';
        if (isReadOnly) return `default`;
        return 'pointer';
      })(),
      backgroundColor: (() => {
        if (isReadOnly) return designTokens.backgroundColorForInput;
        return base.backgroundColor;
      })(),
      '&:hover': {
        backgroundColor: designTokens.backgroundColorForInputWhenHovered,
      },
    }),
    dropdownIndicator: () => ({
      fill: isReadOnly
        ? designTokens.fontColorForInputWhenReadonly
        : designTokens.fontColorForMoneyInputCurrencyDropdownIndicator,
    }),
  };
};

type TSelectableSelect = {
  textInputHasFocus: boolean;
  dropdownHasFocus: boolean;
  isNewTheme: boolean;
  handleDropdownFocus: () => void;
  handleDropdownBlur: () => void;
  textInputRef: React.RefObject<HTMLInputElement>;
} & TSelectableSearchInputProps;

const SelectableSelect = (props: TSelectableSelect) => {
  const intl = useIntl();
  const { isNewTheme } = useTheme();

  const optionsWithoutGroups = flatMap(props.menuOptions, (option) =>
    has(option, 'value') ? option : (option as TOptionObject).options
  );

  const selectedOptions =
    optionsWithoutGroups.find(
      (option) =>
        has(option, 'value') &&
        (option as TOption).value === props.value.dropdownValue
    ) || null;

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
      value={selectedOptions}
      isDisabled={props.isDisabled}
      isSearchable={props.IsMenuSearchable}
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
      options={props.menuOptions}
      menuIsOpen={props.isReadOnly ? false : undefined}
      placeholder=""
      styles={dropdownStyles}
      onFocus={props.handleDropdownFocus}
      menuPortalTarget={props.menuPortalTarget}
      menuShouldBlockScroll={props.menuShouldBlockScroll}
      onBlur={props.handleDropdownBlur}
      onChange={handleDropdownChange}
      onInputChange={props.onMenuInputChange}
      data-testid="selectable-search-dropdown"
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
