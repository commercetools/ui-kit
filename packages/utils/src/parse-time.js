// Attempts to parse a string containing a time in either 12h or 24h format,
// with precision of up to three milliseconds
// Valid inputs:
//   13:00
//   3:00
//   3 PM
//   14:5 am
//   13:00:00.000
//   13:00:60
//   13:00:59.908
// Returns an object containing
//   { hours, minutes, seconds, milliseconds }
// or null
// eslint-disable-next-line import/prefer-default-export
const parseTime = (rawTime) => {
  if (!rawTime || typeof rawTime !== 'string') return null;

  const time = rawTime.trim().toLowerCase();

  const match = time.match(
    /^(\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?)?\s*(am|pm)?$/
  );
  if (!match) return null;

  // As we accept eg "3 AM" there might not be a value for minutes, seconds or
  // milliseconds, so we default them
  let [
    ,
    hours,
    minutes = '00',
    seconds = '00',
    milliseconds = '000',
    // eslint-disable-next-line prefer-const
    amPm,
  ] = match;
  minutes = Number(minutes);
  seconds = Number(seconds);
  // Parses the number as a fraction to ensure that .5, .05 and .005 are
  // parsed correctily (they are 500, 50 and 5 respectively).
  milliseconds = Number(`0.${milliseconds}`) * 1000;
  // edge-case: allow 24:00, but nothing over it
  hours =
    Number(hours) === 24 && minutes === 0 && seconds === 0 && milliseconds === 0
      ? 0
      : Number(hours);

  if (amPm) {
    if (hours > 12) return null;
    if (hours === 0) return null;
    if (minutes > 59) return null;
  } else {
    if (hours > 23) return null;
    if (minutes > 59) return null;
  }
  if (seconds > 59) return null;
  if (milliseconds > 999) return null;

  // 12 pm (just like 24:00) would be on the next day, so we treat it as an
  // invalid value to avoid edge cases like the day jumping forward
  // if (amPm === 'pm' && Number(hours) === 12) return null;

  const hourOffset = (() => {
    if (amPm === 'am' && hours === 12) return -12;
    if (amPm === 'am') return 0;
    if (amPm === 'pm' && hours !== 12) return 12;
    return 0;
  })();

  return {
    hours: Number(hours) + hourOffset,
    minutes,
    seconds,
    milliseconds,
  };
};

export default parseTime;
