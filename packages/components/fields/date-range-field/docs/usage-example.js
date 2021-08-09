import DateRangeField from '@commercetools-uikit/date-range-field';

const Example = () => (
  <DateRangeField
    title="Release Date"
    value={['2018-09-20', '2018-09-24']}
    onChange={(event) => alert(event.target.value)}
  />
);

export default Example;
