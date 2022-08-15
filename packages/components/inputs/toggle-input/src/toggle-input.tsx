import { ChangeEventHandler } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
import {
  filterDataAttributes,
  filterAriaAttributes,
} from '@commercetools-uikit/utils';
import { accessibleHiddenInputStyles } from '@commercetools-uikit/input-utils';

const thumbSmallSize = '13px';
const thumbBigSize = `calc(${thumbSmallSize} * 2)`;

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

type TStyledLabelProps = Pick<TToggleInputProps, 'isDisabled' | 'size'>;
type TStyledSpanProps = Pick<TToggleInputProps, 'size'>;

export const defaultProps: Pick<
  TToggleInputProps,
  'isDisabled' | 'isChecked' | 'size'
> = {
  isDisabled: false,
  isChecked: false,
  size: 'big',
};

const labelSizeStyles = (props: TStyledLabelProps) => {
  if (props.size === 'small')
    return css`
      height: calc(${customProperties.standardInputHeight} / 2);
      width: calc(${customProperties.standardInputHeight});
    `;
  return css`
    height: calc(${customProperties.standardInputHeight});
    width: calc(${customProperties.standardInputHeight} * 2);
  `;
};

const Label = styled.label<TStyledLabelProps>`
  position: relative;
  display: inline-block;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};

  ${labelSizeStyles}

  &:focus-within {
    outline: auto 2px ${customProperties.borderColorForInputWhenFocused};
    outline-offset: 3px;
  }
`;

const Span = styled.span<TStyledSpanProps>`
  /* this is the track */

  &::before {
    border-radius: 16px;
    box-shadow: ${customProperties.shadow9};
    background-color: ${customProperties.colorNeutral60};
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
    left: ${(props) => (props.size === 'small' ? '2px' : '3px')};
    height: ${(props) =>
      props.size === 'small' ? thumbSmallSize : thumbBigSize};
    width: ${(props) =>
      props.size === 'small' ? thumbSmallSize : thumbBigSize};
    background-color: ${customProperties.colorSurface};
    box-shadow: ${customProperties.shadow7};
    border-radius: 50%;
    z-index: 1;
    transition: transform 0.2s ease, background 0.2s ease;
  }
`;

const getInputStyles = (props: TToggleInputProps) => css`
  /* when checked */
  &:checked {
    + span::before {
      background: ${customProperties.colorPrimary};
    }
    & + span::after {
      transform: ${props.size === 'small'
        ? 'translate(117%, -50%)'
        : 'translate(127%, -50%)'};
    }
  }

  /* when disabled */
  &:disabled {
    & + span::before {
      background: ${customProperties.colorNeutral};
      box-shadow: none;
    }
    & + span::after {
      background: ${customProperties.colorAccent95};
      box-shadow: none;
    }
  }

  /* when disabled and checked */
  &:disabled&:checked {
    & + span::before {
      background: ${customProperties.colorPrimary25};
    }
    & + span::after {
      background: ${customProperties.colorNeutral};
    }
  }

  :not(:disabled)&:hover + span::after,
  :not(:disabled)&:focus + span::after {
    box-shadow: ${customProperties.shadow16};
  }
`;

const ToggleInput = (props: TToggleInputProps) => (
  <Label htmlFor={props.id} size={props.size} isDisabled={props.isDisabled}>
    <input
      type="checkbox"
      css={[accessibleHiddenInputStyles, getInputStyles(props)]}
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      disabled={props.isDisabled}
      checked={props.isChecked}
      value={props.value}
      {...filterDataAttributes(props)}
      {...filterAriaAttributes(props)}
    />
    <Span aria-hidden="true" size={props.size} />
  </Label>
);

ToggleInput.displayName = 'Toggle';
ToggleInput.defaultProps = defaultProps;

export default ToggleInput;
