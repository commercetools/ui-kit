import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelectInput from '@commercetools-uikit/creatable-select-input';

const Example = (props) => (
  <CreatableSelectInput
    name="form-field-name"
    value={props.value}
    onChange={() => {}}
    options={[
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ]}
  />
);
Example.propTypes = {
  value: PropTypes.string,
};
export default Example;
