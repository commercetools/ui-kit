// TODO: @redesign cleanup
import type { ChangeEventHandler } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import {
  filterDataAttributes,
  filterAriaAttributes,
} from '@commercetools-uikit/utils';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';

export type TToggleInputProps = {
  /**
   * Used as the HTML `id` property
   */
  id?: string;
  /**
   * Used as the HTML `name` property
   */
  name?: string;
  /**
   * The size of the ToggleInput component.
   */
  size: 'small' | 'big';
  /**
   * Disables the ToggleInput
   */
  isDisabled: boolean;
  /**
   * Checks the ToggleInput
   */
  isChecked: boolean;
  /**
   * Determines the toggle state.
   */
  value?: string;
  /**
   * Handler when toggle state changes. <br/>
   * **Note**: that key value of the `target` is `checked`.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
};

type NewThemeProps = {
  isNewTheme?: boolean;
};

type TStyledLabelProps = Pick<TToggleInputProps, 'isDisabled' | 'size'> &
  NewThemeProps;
type TStyledSpanProps = Pick<TToggleInputProps, 'size'> & NewThemeProps;

export const defaultProps: Pick<
  TToggleInputProps,
  'isDisabled' | 'isChecked' | 'size'
> = {
  isDisabled: false,
  isChecked: false,
  size: 'big',
};

const labelSizeStyles = (props: TStyledLabelProps) => {
  if (props.size === 'small') {
    if (props.isNewTheme) {
      return css`
        height: 12px;
        width: 29px;
      `;
    }
    return css`
      height: 16px;
      width: 32px;
    `;
  }
  if (props.isNewTheme) {
    return css`
      height: 24px;
      width: 56px;
    `;
  }
  return css`
    height: 32px;
    width: 64px;
  `;
};

const getThumbSize = (props: TStyledSpanProps) => {
  if (props.size === 'small') {
    if (props.isNewTheme) {
      return '18px';
    }
    return '13px';
  }
  if (props.isNewTheme) {
    return '32px';
  }
  return '26px';
};

const getThumbShift = (props: TStyledSpanProps) => {
  if (props.size === 'small') {
    if (props.isNewTheme) {
      return '-3px';
    }
    return '2px';
  }
  if (props.isNewTheme) {
    return '-4px';
  }
  return '3px';
};

const Label = styled.label<TStyledLabelProps>`
  position: relative;
  display: inline-block;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};

  ${labelSizeStyles}

  &:focus-within {
    outline: auto 2px ${designTokens.borderColorForInputWhenFocused};
    outline-offset: 3px;
  }
`;

const Span = styled.span<TStyledSpanProps>`
  /* this is the track */

  &::before {
    border-radius: ${(props) => (props.isNewTheme ? '12px' : '16px')};
    box-shadow: ${(props) =>
      props.isNewTheme ? 'none' : designTokens.shadow9};
    background-color: ${designTokens.colorNeutral60};
    left: 0;
    top: 50%;
    transition: background 0.2s ease-in-out;
    content: '';
    position: absolute;
    transform: translateY(-50%);
    height: 100%;
    width: 100%;
  }

  /* this is the thumb */
  &::after {
    content: '';
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    left: ${getThumbShift};
    height: ${getThumbSize};
    width: ${getThumbSize};
    background-color: ${designTokens.colorSurface};
    box-shadow: ${designTokens.shadowForToggleInputThumb};
    border-radius: 50%;
    z-index: 1;
    transition: transform 0.2s ease, background 0.2s ease;
  }
`;

const getInputStyles = (props: TToggleInputProps & NewThemeProps) => css`
  /* when checked */
  &:checked {
    + span::before {
      background: ${designTokens.backgroundColorForToggleInputTrackWhenChecked};
    }
    & + span::after {
      background: ${designTokens.backgroundColorForToggleInputThumbWhenChecked};
      transform: ${props.size === 'small'
        ? `translate(${
            props.isNewTheme ? 'calc(3px * 2 + 29px - 18px)' : '117%'
          }, -50%)`
        : `translate(${
            props.isNewTheme ? 'calc(4px * 2 + 56px - 32px)' : '127%'
          }, -50%)`};
    }
  }

  /* when disabled */
  &:disabled {
    & + span::before {
      background: ${designTokens.backgroundColorForToggleInputTrackWhenDisabled};
      box-shadow: none;
    }
    & + span::after {
      background: ${designTokens.backgroundColorForToggleInputThumbWhenDisabled};
      box-shadow: ${props.isNewTheme
        ? designTokens.shadowForToggleInputThumb
        : 'none'};
    }
  }

  /* when disabled and checked */
  &:disabled&:checked {
    & + span::before {
      background: ${designTokens.backgroundColorForToggleInputTrackWhenCheckedAndDisabled};
    }
    & + span::after {
      background: ${designTokens.backgroundColorForToggleInputThumbWhenCheckedAndDisabled};
    }
  }

  :not(:disabled)&:hover + span::after,
  :not(:disabled)&:focus + span::after {
    box-shadow: ${props.isNewTheme ? 'none' : designTokens.shadow16};
    outline: ${props.isNewTheme
      ? `${props.size === 'small' ? '4px' : '8px'} solid rgba(0, 0, 0, 0.1)`
      : 'none'};
  }
`;

const ToggleInput = (props: TToggleInputProps) => {
  const { isNewTheme } = useTheme();

  return (
    <Label
      htmlFor={props.id}
      size={props.size}
      isDisabled={props.isDisabled}
      isNewTheme={isNewTheme}
    >
      <input
        type="checkbox"
        css={[
          accessibleHiddenInputStyles,
          getInputStyles({ ...props, isNewTheme }),
        ]}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        disabled={props.isDisabled}
        checked={props.isChecked}
        value={props.value}
        {...filterDataAttributes(props)}
        {...filterAriaAttributes(props)}
      />
      <Span aria-hidden="true" size={props.size} isNewTheme={isNewTheme} />
    </Label>
  );
};

ToggleInput.displayName = 'Toggle';
ToggleInput.defaultProps = defaultProps;

export default ToggleInput;
