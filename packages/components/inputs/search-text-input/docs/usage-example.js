import SearchTextInput from '@commercetools-uikit/search-text-input';

const Example = () => (
  <SearchTextInput
    value="foo"
    onChange={(event) => alert(event.target.value)}
    onSubmit={(val) => alert(val)}
    onReset={() => alert('reset')}
  />
);

export default Example;
