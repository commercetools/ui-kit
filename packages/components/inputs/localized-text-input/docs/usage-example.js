import LocalizedTextInput from '@commercetools-uikit/localized-text-input';

const Example = () => (
  <LocalizedTextInput
    value={{ en: 'House', de: 'House' }}
    onChange={
      (/** event */) => {
        // alert(event.target.name, event.target.value)
      }
    }
  />
);

export default Example;
