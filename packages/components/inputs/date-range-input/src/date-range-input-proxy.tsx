import DateRangeInput, { TDateRangeInputProps } from './date-range-input';

export const DateRangeInputProxy = (props: TDateRangeInputProps) => (
  <DateRangeInput {...props} />
);

DateRangeInputProxy.displayName = 'DateRangeInput';
