import { type Props as ReactSelectProps } from 'react-select';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

/**
 * Returns custom components to be used with react-select, when optionStyle is set to "checkbox"
 */
export const optionStyleCheckboxComponents = () => {
  return {
    Option: (props) => {
      const {
        innerRef,
        innerProps,
        label,
        isDisabled,
        isFocused,
        isSelected,
        className,
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
