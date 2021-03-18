import React from 'react';
import SearchSelectInput from '@commercetools-uikit/search-select-input';

const Example = () => {
  return (
    <SearchSelectInput
      id="customers"
      name="customers"
      horizontalConstraint="7"
      optionType="single-lined"
      isAutofocussed={false}
      backspaceRemovesValue={true}
      isClearable={true}
      isDisabled={false}
      isReadOnly={false}
      isMulti={true}
      noOptionsMessage="No exact match found"
      loadingMessage="loading exact matches"
      placeholder="Select customers"
      // eslint-disable-next-line no-undef
      loadOptions={customLoadOptionsFunction}
      cacheOptions={false}
    />
  );
};

export default Example;
