import DateField from '@commercetools-uikit/date-field';

const Example = () => (
  <DateField
    title="Release Date"
    value="2018-10-30"
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
