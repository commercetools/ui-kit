import React from 'react';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';

const Example = () => (
  <LocalizedTextField
    title="Description"
    value={{
      en: 'Parrot that knows how to party',
      de: 'Papagei der ordentlich abfeiert',
    }}
    selectedLanguage="en"
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
