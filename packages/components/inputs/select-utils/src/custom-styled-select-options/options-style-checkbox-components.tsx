import { type OptionProps, type GroupBase } from 'react-select';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import type { TOption } from '@commercetools-uikit/select-input';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

/**
 * Returns custom components to be used with react-select, when optionStyle is set to "checkbox"
 */

export const CheckboxSelectOption = <
  Option extends TOption,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group>
) => {
  const {
    innerRef,
    innerProps,
    label,
    isDisabled,
    isFocused,
    isSelected,
    className,
    data,
    selectProps,
  } = props;

  return (
    <div
      data-component="option"
      ref={innerRef}
      {...innerProps}
      css={css`
        padding: ${designTokens.spacing10} ${designTokens.spacing20};
        ${isFocused &&
        `background-color: ${designTokens.backgroundColorForInputWhenHovered};`}
        display: flex;
        justify-content: space-between;
      `}
      className={className}
      aria-disabled={isDisabled}
    >
      <CheckboxInput
        isDisabled={isDisabled}
        isChecked={isSelected}
        onChange={() => {}}
      >
        {label}
      </CheckboxInput>
      {selectProps.appearance === 'filter' && data?.count && (
        <div
          css={css`
            display: flex;
            align-items: center;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
            color: ${designTokens.colorNeutral50};
          `}
        >
          {data?.count}
        </div>
      )}
    </div>
  );
};

/**
 * Returns react-select props to be used with the <Select> component, when optionStyle is set to "checkbox"
 */
export const optionsStyleCheckboxSelectProps = () => {
  return {
    // selected options should still be visible in the option-list, otherwise you cant toggle them
    hideSelectedOptions: false,
    // don't close the menu on check / uncheck of a checkbox
    closeMenuOnSelect: false,
  };
};
