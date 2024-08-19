import DateTimeInput, { TDateTimeInputProps } from './date-time-input';
// @todo: refactor DateTimeInput, make it a functional component to get rid of this wrapper
export const DateTimeInputWrapper = (props: TDateTimeInputProps) => (
  <DateTimeInput {...props} />
);
DateTimeInputWrapper.displayName = 'DateTimeInput';
