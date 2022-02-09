import LocalizedMultilineTextInput from '@commercetools-uikit/localized-multiline-text-input';

const Example = () => (
  //@ts-ignore
  <LocalizedMultilineTextInput
    value={{ en: 'House\nFoo', de: 'House' }}
    onChange={
      (/** event */) => {
        // alert(event.target.name, event.target.value)
      }
    }
  />
);

export default Example;
