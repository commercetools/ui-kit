import SelectableSearchInput from '@commercetools-uikit/selectable-search-input';

const Example = () => (
  <SelectableSearchInput
    value="foo"
    onChange={(event) => alert(event.target.value)}
    onSubmit={(val) => alert(val)}
    onReset={() => alert('reset')}
  />
);

export default Example;
