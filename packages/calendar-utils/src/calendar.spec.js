import moment from 'moment';
import {
  getIsDateInRange,
  getExampleDateStrings,
  getPaddingDayCount,
} from './calendar';

describe('getIsDateInRange', () => {
  const min = '2019-01-01';
  const max = '2019-12-31';

  describe('when passing a min and max', () => {
    it('should be true if the given date is within the min and max', () => {
      expect(getIsDateInRange('2019-06-01', min, max)).toBeTruthy();
    });
    it('should be true if the given date is the same as min or max', () => {
      expect(getIsDateInRange('2019-01-01', min, max)).toBeTruthy();
    });
    it('should be false if the given date is outside min and max', () => {
      expect(getIsDateInRange('1991-01-01', min, max)).toBeFalsy();
    });
  });
  describe('when passing only a min', () => {
    it('should be true if the given date is after min', () => {
      expect(getIsDateInRange('2019-06-01', min)).toBeTruthy();
    });
    it('should be true if the given date is the same as min', () => {
      expect(getIsDateInRange('2019-01-01', min)).toBeTruthy();
    });
    it('should be false if the given date is before min', () => {
      expect(getIsDateInRange('1991-01-01', min)).toBeFalsy();
    });
  });
  describe('when passing only a max', () => {
    it('should be true if the given date is before max', () => {
      expect(getIsDateInRange('2019-06-01', undefined, max)).toBeTruthy();
    });
    it('should be true if the given date is the same as max', () => {
      expect(getIsDateInRange('2019-12-31', undefined, max)).toBeTruthy();
    });
    it('should be false if the given date is after max', () => {
      expect(getIsDateInRange('2020-01-01', undefined, max)).toBeFalsy();
    });
  });
  describe('when passing no min or max', () => {
    it('should be true', () => {
      expect(getIsDateInRange('2019-06-01')).toBeTruthy();
    });
  });
});

describe('getExampleDateStrings', () => {
  let exampleDates;
  beforeEach(() => {
    exampleDates = getExampleDateStrings();
  });
  it('should return an object with four date fields', () => {
    expect(exampleDates).toHaveProperty('currentDate');
    expect(exampleDates).toHaveProperty('preselectedDate');
    expect(exampleDates).toHaveProperty('minDate');
    expect(exampleDates).toHaveProperty('maxDate');
  });
  it('should return the date strings in format YYYY-MM-DD', () => {
    expect(moment(exampleDates.currentDate).format('YYYY-MM-DD')).toEqual(
      exampleDates.currentDate
    );
    expect(moment(exampleDates.preselectedDate).format('YYYY-MM-DD')).toEqual(
      exampleDates.preselectedDate
    );
    expect(moment(exampleDates.minDate).format('YYYY-MM-DD')).toEqual(
      exampleDates.minDate
    );
    expect(moment(exampleDates.maxDate).format('YYYY-MM-DD')).toEqual(
      exampleDates.maxDate
    );
  });
  it('preselectedDate should be between minDate and maxDate', () => {
    expect(
      moment(exampleDates.preselectedDate).isBetween(
        exampleDates.minDate,
        exampleDates.maxDate
      )
    ).toBeTruthy();
  });
});
describe('getPaddingDayCount', () => {
  it('should return a number for valid and NaN input', () => {
    expect(getPaddingDayCount('2019-01-01')).toEqual(2);
    expect(getPaddingDayCount(NaN)).toEqual(0);
  });
  it('in a month where for en-US locale first day of the month is also first day of the week (and getPaddingDayCount is 0) should return a positive value for en-GB locale due to a different first day of week', () => {
    expect(getPaddingDayCount('2023-10-23', 'en-US')).toEqual(0);
    expect(getPaddingDayCount('2023-10-23', 'en-GB')).toEqual(6);
  });
});
