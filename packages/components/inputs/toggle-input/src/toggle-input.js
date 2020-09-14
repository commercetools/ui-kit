import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import {
  filterDataAttributes,
  filterAriaAttributes,
} from '@commercetools-uikit/utils';
import accessibleHiddenInputStyles from '../../../../../src/components/internals/accessible-hidden-input.styles';

const thumbSmallSize = '13px';
const thumbBigSize = `calc(${thumbSmallSize} * 2)`;

const sizeStyles = (props) => {
  if (props.size === 'small')
    return css`
      height: calc(${vars.standardInputHeight} / 2);
      width: calc(${vars.standardInputHeight});
    `;
  return css`
    height: calc(${vars.standardInputHeight});
    width: calc(${vars.standardInputHeight} * 2);
  `;
};

const Label = styled.label`
  position: relative;
  display: inline-block;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};

  ${sizeStyles}

  &:focus-within {
    outline: auto 2px ${vars.borderColorForInputWhenFocused};
    outline-offset: 3px;
  }
`;

const Span = styled.span`
  /* this is the track */

  &::before {
    border-radius: 16px;
    box-shadow: ${vars.shadow9};
    background-color: ${vars.colorNeutral60};
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
    background-color: ${vars.colorSurface};
    box-shadow: ${vars.shadow7};
    border-radius: 50%;
    z-index: 1;
    transition: transform 0.2s ease, background 0.2s ease;
  }
`;

const Input = styled.input`
  /* when checked */
  &:checked {
    + ${Span}::before {
      background: ${vars.colorPrimary};
    }
    & + ${Span}::after {
      transform: ${(props) =>
        props.size === 'small'
          ? 'translate(117%, -50%)'
          : 'translate(127%, -50%)'};
    }
  }

  /* when disabled */
  &:disabled {
    & + ${Span}::before {
      background: ${vars.colorNeutral};
      box-shadow: none;
    }
    & + ${Span}::after {
      background: ${vars.colorAccent95};
      box-shadow: none;
    }
  }

  /* when disabled and checked */
  &:disabled&:checked {
    & + ${Span}::before {
      background: ${vars.colorPrimary25};
    }
    & + ${Span}::after {
      background: ${vars.colorNeutral};
    }
  }

  :not(:disabled)&:hover
    + ${Span}::after,
    :not(:disabled)&:focus
    + ${Span}::after {
    box-shadow: ${vars.shadow16};
  }
`;

const ToggleInput = (props) => {
  return (
    <Label htmlFor={props.id} size={props.size} isDisabled={props.isDisabled}>
      <Input
        css={accessibleHiddenInputStyles}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        disabled={props.isDisabled}
        checked={props.isChecked}
        value={props.value}
        type="checkbox"
        size={props.size}
        {...filterDataAttributes(props)}
        {...filterAriaAttributes(props)}
      />
      <Span aria-hidden="true" size={props.size} />
    </Label>
  );
};

ToggleInput.displayName = 'Toggle';
ToggleInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['small', 'big']).isRequired,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

ToggleInput.defaultProps = {
  isDisabled: false,
  isChecked: false,
  size: 'big',
};

export default ToggleInput;
