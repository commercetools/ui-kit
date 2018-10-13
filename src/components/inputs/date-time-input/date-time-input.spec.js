import { splitDateTimeString } from './date-time-input';

describe('splitDateTimeString', () => {
  describe('when called with a string containing date and time', () => {
    it('should return the best match', () => {
      expect(splitDateTimeString('Monday at 4pm', [' at ', ' @ '])).toEqual([
        'Monday',
        '4pm',
      ]);
      expect(splitDateTimeString('Monday @ 4pm', [' at ', ' @ '])).toEqual([
        'Monday',
        '4pm',
      ]);
    });
  });
  describe('when called with non-matching case string containing date and time', () => {
    it('should return the best match', () => {
      expect(splitDateTimeString('Monday AT 4pm', [' at ', ' @ '])).toEqual([
        'Monday',
        '4pm',
      ]);
    });
  });
  describe('when called with a string containing a date only', () => {
    it('should return the best match', () => {
      expect(splitDateTimeString('Today', [' at ', ' @ '])).toEqual(['Today']);
      expect(splitDateTimeString('Today', [' at ', ' @ '])).toEqual(['Today']);
    });
  });
});
