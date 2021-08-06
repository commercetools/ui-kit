import LocalizedMultilineTextField from '@commercetools-uikit/localized-multiline-text-field';

const Example = () => (
  <LocalizedMultilineTextField
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
