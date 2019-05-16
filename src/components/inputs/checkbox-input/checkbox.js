import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import omit from 'lodash/omit';
import accessibleHiddenInputStyles from '../../internals/accessible-hidden-input.styles';
import vars from '../../../../materials/custom-properties';

// accessible input :)
const Input = styled.input`
  &:focus + div > svg [id$='borderAndContent'] > [id$='border'] {
    stroke: ${vars.borderColorForInputWhenFocused};
  }
`;

const getAriaChecked = (checked, isIndeterminate) => {
  if (isIndeterminate) return 'mixed';
  if (checked) return 'true';
  return 'false';
};

class Checkbox extends React.Component {
  static displayName = 'Checkbox';

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
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
    return (
      <Input
        ref={this.ref}
        css={accessibleHiddenInputStyles}
        type="checkbox"
        checked={this.props.checked && !this.props.isIndeterminate}
        // WAI-ARIA
        role="checkbox"
        aria-checked={getAriaChecked(
          this.props.checked,
          this.props.isIndeterminate
        )}
        // The 'checked' prop is omitted because it would override the logic for the same prop above
        {...omit(this.props, ['isIndeterminate', 'checked'])}
      />
    );
  }
}

export default Checkbox;
