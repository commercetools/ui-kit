import LocalizedRichTextInput from '@commercetools-uikit/localized-rich-text-input';

const Example = () => (
  <LocalizedRichTextInput
    value={{
      en: '',
      de: '',
    }}
    onChange={(event) => console.log('event.target.value', event.target.value)}
    selectedLanguage="en"
  />
);

export default Example;
