import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import vars from '../../../../materials/custom-properties';

const thumbSmallSize = '13px';
const thumbBigSize = '26px;';

const Label = styled.label`
  position: relative;
  display: inline-block;
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};

  ${props =>
    props.size === 'small'
      ? `
        height: 16px;
        width: 32px;
      `
      : `

        height: 32px;
        width: 64px;
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
  pointer-events: none;
  height: 100%;
  left: 0;
  opacity: 0.0001;
  position: absolute;
  top: 0;
  width: 100%;

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
    filter: drop-shadow(${vars.shadow15First})
      drop-shadow(${vars.shadow15Second});
  }
`;

class ToggleInput extends React.PureComponent {
  static displayName = 'Toggle';
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf(['small', 'big']).isRequired,
    isDisabled: PropTypes.bool,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isDisabled: false,
    isChecked: false,
    size: 'big',
  };

  render() {
    return (
      <Label htmlFor={this.props.id} size={this.props.size}>
        <Input
          id={this.props.id}
          name={this.props.name}
          onChange={this.props.onChange}
          disabled={this.props.isDisabled}
          checked={this.props.isChecked}
          type="checkbox"
          size={this.props.size}
          {...filterDataAttributes(this.props)}
        />
        <Span aria-hidden="true" size={this.props.size} />
      </Label>
    );
  }
}

export default ToggleInput;
