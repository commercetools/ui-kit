import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import accessibleHiddenInputStyles from '../../internals/accessible-hidden-input.styles';
import vars from '../../../../materials/custom-properties';
import throwDeprecationWarning from '../../../utils/warn-deprecated-prop';

const thumbSmallSize = '13px';
const thumbBigSize = `calc(${thumbSmallSize} * 2)`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  ${props =>
    props.size === 'small'
      ? `
        height: calc(${vars.standardInputHeight} / 2);
        width: calc(${vars.standardInputHeight});
      `
      : `
        height: calc(${vars.standardInputHeight});
        width: calc(${vars.standardInputHeight} * 2);
      `}
`;

const Span = styled.span`
  // this is the track
  &:before {
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

  // this is the thumb
  &:after {
    content: '';
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    left: ${props => (props.size === 'small' ? '2px' : '3px')};
    height: ${props =>
      props.size === 'small' ? thumbSmallSize : thumbBigSize};
    width: ${props => (props.size === 'small' ? thumbSmallSize : thumbBigSize)};
    background-color: ${vars.colorSurface};
    box-shadow: ${vars.shadow7};
    border-radius: 50%;
    z-index: 1;
    transition: transform 0.2s ease, background 0.2s ease;
  }
`;

const Input = styled.input`
  &:checked + ${Span}:before {
    background: ${vars.colorPrimary};
  }

  &:disabled + ${Span}:before {
    background: ${vars.colorNeutral};
  }

  &:disabled&:checked + ${Span}:before {
    background: ${vars.colorPrimary25};
  }

  &:checked + ${Span}:after {
    transform: ${props =>
      props.size === 'small'
        ? 'translate(117%, -50%)'
        : 'translate(127%, -50%)'};
  }

  :not(:disabled)&:hover
    + ${Span}:after,
    :not(:disabled)&:focus
    + ${Span}:after {
    box-shadow: ${vars.shadow16};
  }
`;

const getToggleInputProps = (props = {}) => ({
  type: 'checkbox',
  checked: props.checked || props.isChecked,
  disabled: props.disabled || props.isDisabled,
  // WAI-ARIA
  role: 'checkbox',
  'aria-checked': props.checked || props.isChecked ? 'true' : 'false',
  ...omit(props, [
    /* deprecated */
    'isChecked',
    'isDisabled',
  ]),
});

class ToggleInput extends React.PureComponent {
  static displayName = 'Toggle';
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf(['small', 'big']).isRequired,
    isChecked(props, propName, componentName, ...rest) {
      if (!isNil(props[propName])) {
        throwDeprecationWarning(
          propName,
          componentName,
          `\n Please use "checked" prop instead.`
        );
      }
      return PropTypes.bool(props, propName, componentName, ...rest);
    },
    isDisabled(props, propName, componentName, ...rest) {
      if (!isNil(props[propName])) {
        throwDeprecationWarning(
          propName,
          componentName,
          `\n Please use "disabled" prop instead.`
        );
      }
      return PropTypes.bool(props, propName, componentName, ...rest);
    },
  };

  static defaultProps = {
    size: 'big',
  };

  render() {
    const toggleInputProps = getToggleInputProps(this.props);

    return (
      <Label
        htmlFor={this.props.id}
        size={this.props.size}
        disabled={toggleInputProps.disabled}
      >
        <Input css={accessibleHiddenInputStyles} {...toggleInputProps} />
        <Span aria-hidden="true" size={this.props.size} />
      </Label>
    );
  }
}

export default ToggleInput;
