import moment from 'moment-timezone';
import parseDateTime from './parse-datetime';

jest.mock('moment-timezone');

describe('parseDateTime', () => {
  describe('with `time` type', () => {
    let isoTime;
    beforeEach(() => {
      moment.tz = {
        guess: jest.fn(() => 'Europe/Madrid'),
      };
      moment.mockImplementation(() => ({
        locale: jest.fn(() => ({
          format: jest.fn(() => '10:00:00.000'),
        })),
      }));
      isoTime = parseDateTime('time', '10:00');
    });
    it('gets the time in ISO format', () => {
      expect(isoTime).toBe('10:00:00.000');
    });
  });

  describe('with `datetime` type', () => {
    let isoDateTime;
    beforeEach(() => {
      moment.tz = {
        guess: jest.fn(() => 'Europe/Madrid'),
      };
      moment.mockImplementation(() => ({
        tz: jest.fn(() => ({
          locale: jest.fn(() => ({
            toISOString: jest.fn(() => '2016-12-31T13:45:00.000Z'),
          })),
        })),
      }));
      const value = '12/31/2016 13:45';
      isoDateTime = parseDateTime('datetime', value);
    });
    it('gets the date time in ISO format in UTC time', () => {
      expect(isoDateTime).toBe('2016-12-31T13:45:00.000Z');
    });
  });

  describe('with `date` type', () => {
    let isoDateTime;
    beforeEach(() => {
      moment.tz = {
        guess: jest.fn(() => 'Europe/Madrid'),
      };
      moment.mockImplementation(() => ({
        locale: jest.fn(() => ({
          format: jest.fn(() => '2016-12-31'),
        })),
      }));
      const value = '12/31/2016';
      isoDateTime = parseDateTime('date', value);
    });
    it('gets the date time in ISO format in UTC time', () => {
      expect(isoDateTime).toBe('2016-12-31');
    });
  });

  describe('when no type', () => {
    it('returns the passed value when the type is not datetime/time', () => {
      const value = '12/31/2016 13:45';
      const isoDateValue = parseDateTime('dummyType', value);
      expect(isoDateValue).toBe(value);
    });
  });
});
