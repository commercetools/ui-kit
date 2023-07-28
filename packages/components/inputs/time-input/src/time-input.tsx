import {
  useCallback,
  useEffect,
  useRef,
  type FocusEventHandler,
  type ChangeEventHandler,
  type ChangeEvent,
} from 'react';
import { useIntl } from 'react-intl';
import Constraints from '@commercetools-uikit/constraints';
import {
  parseTime,
  filterDataAttributes,
  createSequentialId,
  warning,
} from '@commercetools-uikit/utils';
import { useFieldId } from '@commercetools-uikit/hooks';
import TimeInputBody from './time-input-body';
import messages from './messages';

type ParsedTime = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export type TTimeInputProps = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
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
  value?: string;
  /**
   * Called with an event holding the new value.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Called when input is focused
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
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

// Calling `eventTarget.dispatchEvent` does not natively work in React.
// Instead, we need to grab the element value setter, set the value, and dispatch a change event.
const dispatchReactChangeEvent = (node: HTMLInputElement, value?: string) => {
  const setValue = Object.getOwnPropertyDescriptor(
    node.constructor.prototype,
    'value'
  )?.set;
  setValue?.call(node, value);
  node.dispatchEvent(new Event('change', { bubbles: true }));
};

const TimeInput = (props: TTimeInputProps) => {
  const id = useFieldId(props.id, sequentialId);
  const intl = useIntl();
  const element = useRef<HTMLInputElement>(null);
  const { onChange } = props;

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'TimeInput: `onChange` is required when input is not read only.'
    );
  }

  const { onBlur } = props;
  const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      const rawValue = event.target.value;
      const formattedValue = TimeInput.toLocaleTime(rawValue, intl.locale);
      event.target.value = formattedValue;
      onBlur?.(event);
    },
    [intl.locale, onBlur]
  );

  const handleClear = useCallback(() => {
    if (element.current) {
      dispatchReactChangeEvent(element.current, '');
    }
    onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
  }, [onChange]);

  // if locale has changed trigger a new change event
  useEffect(() => {
    if (element.current) {
      dispatchReactChangeEvent(element.current, props.value);
    }
    // Only subscribe this effect to `intl.locale` changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intl.locale]);

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <TimeInputBody
        ref={element}
        id={id}
        name={props.name}
        autoComplete={props.autoComplete}
        value={props.value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={props.onFocus}
        isAutofocussed={props.isAutofocussed}
        isDisabled={props.isDisabled}
        isReadOnly={props.isReadOnly}
        hasError={props.hasError}
        onClear={handleClear}
        placeholder={
          typeof props.placeholder === 'string'
            ? props.placeholder
            : intl.formatMessage(messages.placeholder)
        }
        horizontalConstraint={props.horizontalConstraint}
        {...filterDataAttributes(props)}
        /* ARIA */
        aria-invalid={props['aria-invalid']}
        aria-errormessage={props['aria-errormessage']}
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
TimeInput.toLocaleTime = (time: string | undefined, locale: string) => {
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

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    // only show seconds when time contains seconds
    second: parsedTime.seconds > 0 ? 'numeric' : undefined,
  };

  const isValidDate = !isNaN(date.getTime());
  return isValidDate ? date.toLocaleTimeString(locale, options) : '';
};

export default TimeInput;
