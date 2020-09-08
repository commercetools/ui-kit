import React from 'react';
import PropTypes from 'prop-types';
import AsyncCreatableSelectInput from '@commercetools-uikit/async-creatable-select-input';

const Example = (props) => (
  <AsyncCreatableSelectInput
    name="form-field-name"
    value={props.value}
    onChange={
      (/** event */) => {
        // console.log(event)
      }
    }
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
