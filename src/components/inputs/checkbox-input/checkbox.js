import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import vars from '../../../../materials/custom-properties';

// accessible input :)
const Input = styled.input`
  pointer-events: none;
  height: 100%;
  left: 0;
  opacity: 0.0001;
  position: absolute;
  top: 0;
  width: 100%;

  ${props =>
    !props.hasError &&
    `
  &:focus + div > svg [id$='borderAndContent'] > [id$='border'] {
    stroke: ${vars.borderColorInputFocus};
  }`}
`;

class Checkbox extends React.Component {
  static displayName = 'Checkbox';

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    isChecked: PropTypes.bool,
    isIndeterminate: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    hasError: PropTypes.bool,
  };

  componentDidMount() {
    if (this.props.isIndeterminate) {
      this.ref.current.indeterminate = true;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isIndeterminate !== this.props.isIndeterminate) {
      this.ref.current.indeterminate = this.props.isIndeterminate;
    }
  }

  ref = React.createRef();

  render() {
    return (
      <Input
        id={this.props.id}
        name={this.props.name}
        value={this.props.value}
        disabled={this.props.isDisabled}
        checked={this.props.isChecked && !this.props.isIndeterminate}
        onChange={this.props.onChange}
        hasError={this.props.hasError}
        ref={this.ref}
        {...this.props}
      />
    );
  }
}

export default Checkbox;
