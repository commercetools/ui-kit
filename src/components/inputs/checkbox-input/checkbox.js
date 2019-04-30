import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import accessibleHiddenInputStyles from '../../internals/accessible-hidden-input.styles';
import vars from '../../../../materials/custom-properties';

// accessible input :)
const Input = styled.input`
  &:focus + div > svg [id$='borderAndContent'] > [id$='border'] {
    stroke: ${vars.borderColorInputFocus};
  }
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
        css={accessibleHiddenInputStyles}
        id={this.props.id}
        name={this.props.name}
        value={this.props.value}
        disabled={this.props.isDisabled}
        checked={this.props.isChecked && !this.props.isIndeterminate}
        onChange={this.props.onChange}
        ref={this.ref}
        {...this.props}
      />
    );
  }
}

export default Checkbox;
