import SelectableSearchInput from '@commercetools-uikit/selectable-search-input';

const value = {
  text: 'foo',
  option: 'bar',
};

const Example = () => (
  <SelectableSearchInput
    value={value}
    onChange={(event) => alert(event.target.value)}
    onSubmit={(val) => alert(val)}
    onReset={() => alert('reset')}
    options={[
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ]}
    selectDataProps={[{ 'prop-1': 'value-1' }, { 'prop-2': 'value-2' }]}
    inputDataProps={[{ 'prop-3': 'value-1' }, { 'prop-4': 'value-2' }]}
  />
);

export default Example;
