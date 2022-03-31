import LocalizedRichTextInput from '@commercetools-uikit/localized-rich-text-input';

const Example = () => (
  <LocalizedRichTextInput
    value={{
      en: '',
      de: '',
    }}
    onChange={(state) => console.log(state)}
    selectedLanguage="en"
  />
);

export default Example;
