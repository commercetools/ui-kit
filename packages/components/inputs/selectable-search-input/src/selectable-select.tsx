import has from 'lodash/has';
import flatMap from 'lodash/flatMap';
import { useIntl } from 'react-intl';

import Select, {
  components,
  type Props as ReactSelectProps,
} from 'react-select';
import {
  createSelectStyles,
  DropdownIndicator,
  messages,
} from '@commercetools-uikit/select-utils';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import { useCallback } from 'react';
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
      minWidth: designTokens.minWidthForSelectableSelectInputDropdown,
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
  toggleDropdownHasFocus: (value: boolean) => void;
  isNewTheme: boolean;
  dropdownId?: string;
  dropdownName?: string;
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

  const handleDropdownFocus = useCallback(() => {
    if (props.onFocus)
      props.onFocus({
        target: {
          id: props.id,
          name: props.dropdownName,
        },
      });
    props.toggleDropdownHasFocus(true);
  }, [props.toggleDropdownHasFocus]);

  const handleDropdownBlur = useCallback(() => {
    if (props.onBlur)
      props.onBlur({
        target: {
          id: props.id,
          name: props.dropdownName,
        },
      });
    props.toggleDropdownHasFocus(false);
  }, [props.toggleDropdownHasFocus]);

  return (
    <Select
      inputId={props.dropdownId}
      name={props.dropdownName}
      value={selectedOptions}
      isDisabled={props.isDisabled}
      isSearchable={props.IsMenuSearchable}
      maxMenuHeight={props.maxMenuHeight}
      closeMenuOnSelect={props.closeMenuOnSelect}
      components={{
        Input: (ownProps) => (
          <components.Input {...ownProps} readOnly={props.isReadOnly} />
        ),
        DropdownIndicator,
      }}
      options={props.menuOptions}
      menuIsOpen={props.isReadOnly ? false : undefined}
      placeholder=""
      styles={
        createSelectableSelectStyles({
          hasWarning: props.hasWarning,
          hasError: props.hasError,
          isDisabled: props.isDisabled,
          isReadOnly: props.isReadOnly,
          menuPortalZIndex: props.menuPortalZIndex,
          isNewTheme,
          dropdownHasFocus: props.dropdownHasFocus,
          textInputHasFocus: props.textInputHasFocus,
        }) as ReactSelectProps['styles']
      }
      onFocus={handleDropdownFocus}
      menuPortalTarget={props.menuPortalTarget}
      menuShouldBlockScroll={props.menuShouldBlockScroll}
      onBlur={handleDropdownBlur}
      onChange={(nextSelectedOptions) => {
        props.onChange &&
          props.onChange({
            target: {
              id: props.id,
              name: props.dropdownName,
              value: (nextSelectedOptions as TOption).value,
            },
          });
      }}
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
