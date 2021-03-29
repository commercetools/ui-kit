import React from 'react';
import SearchSelectField from '@commercetools-uikit/async-select-field';

const Example = () => (
  <SearchSelectField
    title="customer"
    id="customer"
    name="customer"
    isRequired={true}
    horizontalConstraint={7}
    optionType="single-lined"
    isAutofocussed={false}
    backspaceRemovesValue={true}
    isClearable={true}
    isDisabled={false}
    isReadOnly={false}
    isMulti={false}
    onChange={
      (/* event */) => {
        /** onChange logic */
      }
    }
    noOptionsMessage="No exact match found"
    loadingMessage="loading exact matches"
    placeholder="Select customer"
    loadOptions={
      (/* inputValue */) => {
        // async fetch logic
      }
    }
    renderError={(key) => {
      // This example shows how to handle custom errors on top of the
      // predefined errors of FieldErrors which this component and other
      // Field components use under the hood.
      switch (key) {
        case 'missing':
          return 'This field is required.';
        case 'duplicate':
          return 'This customer is already attached to the store. Customers must be unique.';
        case 'customError':
          return 'A custom error.';
        default:
          return null;
      }
    }}
    cacheOptions={false}
  />
);

export default Example;
