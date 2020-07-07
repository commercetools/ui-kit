import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import accessibleHiddenInputStyles from '../../../../../src/components/internals/accessible-hidden-input.styles';

// accessible input :)
const Input = styled.input`
  &:focus + div > svg [id$='borderAndContent'] > [id$='border'] {
    stroke: ${vars.borderColorForInputWhenFocused};
  }
`;

const Checkbox = (props) => {
  const ref = React.useRef();
  React.useEffect(() => {
    if (props.isIndeterminate) {
      ref.current.indeterminate = true;
    }
  }, [props.isIndeterminate]);

  const { onChange } = props;

  const handleChange = React.useCallback(
    (event) => !props.isReadOnly && onChange && onChange(event),
    [props.isReadOnly, onChange]
  );

  return (
    <Input
      css={accessibleHiddenInputStyles}
      id={props.id}
      name={props.name}
      value={props.value}
      disabled={props.isDisabled || props.isReadOnly}
      readOnly={props.isReadOnly}
      checked={props.isChecked && !props.isIndeterminate}
      onChange={handleChange}
      ref={ref}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      {...props}
    />
  );
};

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  isChecked: PropTypes.bool,
  isIndeterminate: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
};

export default Checkbox;
