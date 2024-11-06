import { type Props as ReactSelectProps, OptionProps } from 'react-select';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import type { TSelectInputProps } from '@commercetools-uikit/select-input';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

/**
 * Returns custom components to be used with react-select, when optionStyle is set to "checkbox"
 */
type OptionType = {
  label: string;
  value: string;
  count: number;
};

export const optionStyleCheckboxComponents = (
  appearance: TSelectInputProps['appearance']
) => {
  return {
    Option: (props: OptionProps<OptionType>) => {
      const {
        innerRef,
        innerProps,
        label,
        isDisabled,
        isFocused,
        isSelected,
        className,
        data,
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
            font-size: 14px;
            span {
              font-size: 14px;
            }
          `}
          className={className}
          aria-disabled={isDisabled}
        >
          <CheckboxInput
            isDisabled={isDisabled}
            isChecked={isSelected}
            onChange={() => {}}
          >
            <span>{label}</span>
          </CheckboxInput>
          {appearance === 'filter' && (
            <div
              css={css`
                display: flex;
                align-items: center;
                font-weight: 400;
                line-height: 18px;
                color: ${designTokens.colorNeutral50};
              `}
            >
              {data.count}
            </div>
          )}
        </div>
      );
    },
  } as ReactSelectProps['components'];
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
