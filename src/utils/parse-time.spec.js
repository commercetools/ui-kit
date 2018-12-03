import { parseTime } from './parse-time';

describe('parseTime', () => {
  it('should work with am/pm times', () => {
    // 0 am (does not exist)
    expect(parseTime('0 am')).toEqual(null);
    // 65 am (does not exist)
    expect(parseTime('65 am')).toEqual(null);
    // 0:30 am (does not exist)
    expect(parseTime('0:30 am')).toEqual(null);
    // 1 am (01:00)
    expect(parseTime('1 am')).toEqual({
      hours: 1,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 12 am (24:00) = 0:00
    expect(parseTime('12 am')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 12:30 am (00:30)
    expect(parseTime('12:30 am')).toEqual({
      hours: 0,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    });

    // 0 pm (does not exist)
    expect(parseTime('0 pm')).toEqual(null);
    // 0:30 pm (does not exist)
    expect(parseTime('0:30 pm')).toEqual(null);
    // 1 pm (13:00)
    expect(parseTime('1 pm')).toEqual({
      hours: 13,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 12 pm (12:00)
    expect(parseTime('12 pm')).toEqual({
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 11 pm (23:00)
    expect(parseTime('11 pm')).toEqual({
      hours: 23,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    // 12:30 pm (12:30)
    expect(parseTime('12:30 pm')).toEqual({
      hours: 12,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    });
  });

  it('should work with 24h times', () => {
    expect(parseTime('0:00')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    expect(parseTime('12:00')).toEqual({
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    expect(parseTime('23:59')).toEqual({
      hours: 23,
      minutes: 59,
      seconds: 0,
      milliseconds: 0,
    });
    expect(parseTime('23:59:34.010')).toEqual({
      hours: 23,
      minutes: 59,
      seconds: 34,
      milliseconds: 10,
    });
    expect(parseTime('23:59:34.001')).toEqual({
      hours: 23,
      minutes: 59,
      seconds: 34,
      milliseconds: 1,
    });
    expect(parseTime('23:59:34.1')).toEqual({
      hours: 23,
      minutes: 59,
      seconds: 34,
      milliseconds: 100,
    });
  });

  it('should work with some invalid 24:00 time for convenience', () => {
    expect(parseTime('24:00')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    expect(parseTime('24:30')).toEqual(null);
  });
});
