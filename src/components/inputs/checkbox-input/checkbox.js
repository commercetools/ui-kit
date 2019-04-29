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

  &:focus + div > svg [id$='borderAndContent'] > [id$='border'] {
    stroke: ${vars.borderColorInputFocus};
  }
`;

class Checkbox extends React.Component {
  static displayName = 'Checkbox';

  static propTypes = {
    isIndeterminate: PropTypes.bool,
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
    return <Input ref={this.ref} {...this.props} />;
  }
}

export default Checkbox;
