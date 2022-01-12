import { useCallback, FocusEvent } from 'react';
import { useIntl } from 'react-intl';
import Constraints from '@commercetools-uikit/constraints';
import {
  parseTime,
  filterDataAttributes,
  createSequentialId,
} from '@commercetools-uikit/utils';
import { useFieldId, usePrevious } from '@commercetools-uikit/hooks';
import TimeInputBody from './time-input-body';
import messages from './messages';

type ParsedTime = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export type TTimeInput = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  /**
   * Used as HTML name of the input component.
   */
  name?: string;
  /**
   * Used as HTML autocomplete of the input component.
   */
  autoComplete?: string;
  /**
   * Value of the input
   */
  value: string;
  /**
   * Called with an event holding the new value.
   * <br/>
   * Required when input is not read only. Parent should pass it back as `value`-
   * <br />
   * Signature: `(event) => void`
   */
  onChange: (event: string | unknown) => void;
  /**
   * Called when input is blurred
   * <br/>
   * Signature: `(event) => void`
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Called when input is focused
   * <br/>
   * Signature: `(event) => void`
   */
  onFocus?: () => void;
  /**
   * Focus the input on initial render
   */
  isAutofocussed?: boolean;
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled?: boolean;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Indicates if the input has invalid values
   */
  hasError?: boolean;
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly?: boolean;
};

const sequentialId = createSequentialId('time-input-');

const leftPad = (value: number, length = 2) =>
  String(value).padStart(length, '0');

const format24hr = ({
  hours,
  minutes,
  seconds,
  milliseconds,
}: ParsedTime): string => {
  const base = `${leftPad(hours)}:${leftPad(minutes)}`;
  if (seconds === 0 && milliseconds === 0) return base;
  if (milliseconds === 0) return `${base}:${leftPad(seconds)}`;
  // string representation of a time without timezone in ISO 8601 format
  return `${base}:${leftPad(seconds)}.${leftPad(milliseconds, 3)}`;
};

const hasMilliseconds = (parsedTime: {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds: number;
}) => parsedTime.milliseconds !== 0;

const TimeInput = (props: TTimeInput) => {
  const id = useFieldId(props.id, sequentialId);
  const intl = useIntl();
  const prevLocale = usePrevious(intl.locale);

  const { name, value, onBlur, onChange } = props;

  const emitChange = useCallback(
    (nextValue) => {
      const event = {
        target: { id, name, value: nextValue },
      };
      onChange(event);
    },
    [id, name, onChange]
  );

  const handleBlur = useCallback(
    (event) => {
      // check formatting and reformat when necessary
      const formattedTime = TimeInput.toLocaleTime(value, intl.locale);

      if (formattedTime !== value) emitChange(formattedTime);

      // forward the onBlur call
      if (onBlur) onBlur(event);
    },
    [intl.locale, value, onBlur, emitChange]
  );

  const onClear = useCallback(() => emitChange(''), [emitChange]);

  // if locale has changed
  if (typeof prevLocale !== 'undefined' && prevLocale !== intl.locale) {
    emitChange(TimeInput.toLocaleTime(value, intl.locale));
  }

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <TimeInputBody
        id={id}
        name={props.name}
        autoComplete={props.autoComplete}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={handleBlur}
        isAutofocussed={props.isAutofocussed}
        isDisabled={props.isDisabled}
        hasError={props.hasError}
        isReadOnly={props.isReadOnly}
        onClear={onClear}
        placeholder={
          typeof props.placeholder === 'string'
            ? props.placeholder
            : intl.formatMessage(messages.placeholder)
        }
        {...filterDataAttributes(props)}
      />
    </Constraints.Horizontal>
  );
};

TimeInput.displayName = 'TimeInput';

// Takes any input like 15:10, 3 AM, 3AM, 3:15AM, 3:5AM and turns it
// into a 24h format (with seconds and milliseconds if present)
TimeInput.to24h = (time: string) => {
  const parsedTime = parseTime(time);
  return parsedTime ? format24hr(parsedTime) : '';
};

TimeInput.defaultProps = {
  horizontalConstraint: 'scale',
};

// Converts any value to either a formatted value or an empty string
// The resulting format might use 12h or 24h, unless the time contains
// milliseconds. If milliseconds are contained, the
// the 24h format is returned.
//
// Returns time in a format suitable for the locale.
TimeInput.toLocaleTime = (time: string, locale: string) => {
  const parsedTime = parseTime(time);
  if (!parsedTime) return '';

  const timeIn24hFormat = format24hr(parsedTime);

  // return the 24h format, as the time has high precision
  if (hasMilliseconds(parsedTime)) return timeIn24hFormat;

  // return the localized time (12h or 24h format)
  const date = new Date(
    1970,
    0,
    1,
    parsedTime.hours,
    parsedTime.minutes,
    parsedTime.seconds,
    parsedTime.milliseconds
  );

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    // only show seconds when time contains seconds
    second: parsedTime.seconds > 0 ? 'numeric' : undefined,
  } as const;

  const isValidDate = !isNaN(date.getTime());
  return isValidDate ? date.toLocaleTimeString(locale, options) : '';
};

export default TimeInput;
