import SearchTextInput from '@commercetools-uikit/search-text-input';

const Example = () => (
  <SearchTextInput
    value="foo"
    onChange={(event) => alert(event.target.value)}
    onSubmit={(event) => alert(event.target.value)}
  />
);

export default Example;
