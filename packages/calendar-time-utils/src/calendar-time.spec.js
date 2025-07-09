import {
  getLocalizedDateTimeFormatPattern,
  formatDefaultTime,
  getMonthCalendarLabel,
  getYearCalendarLabel,
  getToday,
} from './calendar-time';
import { warning } from '@commercetools-uikit/utils';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

describe('getLocalizedDateTimeFormatPattern', () => {
  const DATE_LOCALIZED_FORMATS = {
    de: 'TT.MM.JJJJ',
    en: 'MM/DD/YYYY',
    'en-GB': 'DD/MM/YYYY',
    'en-AU': 'DD/MM/YYYY',
    es: 'DD/MM/AAAA',
    'fr-FR': 'JJ/MM/AAAA',
    'pt-BR': 'DD/MM/AAAA',
    xx: 'MM/DD/YYYY', // unknown locale returns the default pattern moment provides
  };

  const TIME_LOCALIZED_FORMATS = {
    de: 'SS:mm',
    en: 'HH:mm AM/PM',
    'en-GB': 'HH:mm',
    'en-AU': 'HH:mm AM/PM',
    es: 'HH:mm',
    'fr-FR': 'HH:mm',
    'pt-BR': 'HH:mm',
    xx: 'h:mm A', // unknown locale returns the default pattern moment provides
  };

  const FULL_LOCALIZED_FORMATS = {
    de: 'TT.MM.JJJJ - SS:mm',
    en: 'MM/DD/YYYY - HH:mm AM/PM',
    'en-GB': 'DD/MM/YYYY - HH:mm',
    'en-AU': 'DD/MM/YYYY - HH:mm AM/PM',
    es: 'DD/MM/AAAA - HH:mm',
    'fr-FR': 'JJ/MM/AAAA - HH:mm',
    'pt-BR': 'DD/MM/AAAA - HH:mm',
    xx: 'MM/DD/YYYY - h:mm A', // unknown locale returns the default pattern moment provides
  };

  const checkLocales = (mockFormats, formatType) => {
    Object.entries(mockFormats).forEach(([locale, expectedFormat]) => {
      expect(getLocalizedDateTimeFormatPattern(locale, formatType)).toBe(
        expectedFormat
      );
    });
  };

  describe('when using default format type (date)', () => {
    it('should return the right format based on locale', () => {
      checkLocales(DATE_LOCALIZED_FORMATS);
    });
  });

  describe('when passing "date" format type', () => {
    it('should return the right format based on locale', () => {
      checkLocales(DATE_LOCALIZED_FORMATS, 'date');
    });
  });

  describe('when passing "time" format type', () => {
    it('should return the right format based on locale', () => {
      checkLocales(TIME_LOCALIZED_FORMATS, 'time');
    });
  });

  describe('when passing "full" format type', () => {
    it('should return the right format based on locale', () => {
      checkLocales(FULL_LOCALIZED_FORMATS, 'full');
    });
  });

  describe('when passing an unknown format type', () => {
    it('should throw and error', () => {
      expect(() =>
        getLocalizedDateTimeFormatPattern('en', 'unknownFormatType')
      ).toThrow(
        "CalendarTime.getLocalizedDateTimeFormatPattern: Unknown format type 'unknownFormatType'"
      );
    });
  });
});

describe('formatDefaultTime', () => {
  it('should format the time', () => {
    expect(formatDefaultTime('09:00', 'en')).toBe('9:00 AM');
    expect(formatDefaultTime('13:00', 'en')).toBe('1:00 PM');
    expect(formatDefaultTime('13:00', 'es')).toBe('13:00');
  });

  it('should return 12:00 AM for incorrect time format', () => {
    expect(formatDefaultTime('1221', 'en')).toBe('12:00 AM');
    expect(warning).toHaveBeenCalledWith(
      false,
      "DataTimeInput: the specified defaultDaySelectionTime '1221' is not supported. The format should be hh:mm, e.g. 11:10. Using 00:00 as default time."
    );
  });
});

describe('getMonthCalendarLabel', () => {
  it('should return the month label without timezone', () => {
    const date = '2025-01-01T10:00:00.000Z'; // January 1, 2025 in UTC
    expect(getMonthCalendarLabel(date, 'en')).toBe('January');
  });

  it('should return the month label with timezone that shows correct month when timezone conversion would change the day', () => {
    // This represents January 1st, 2025 in Pacific/Kiritimati (UTC+14)
    // When converted to UTC, this becomes December 31st, 2024
    const dateInKiritimati = '2024-12-31T10:00:00.000Z'; // This is January 1st in Pacific/Kiritimati

    // Without timezone, it would show December (wrong)
    expect(getMonthCalendarLabel(dateInKiritimati, 'en')).toBe('December');

    // With timezone, it should show January (correct)
    expect(
      getMonthCalendarLabel(dateInKiritimati, 'en', 'Pacific/Kiritimati')
    ).toBe('January');
  });

  it('should work with different locales and timezones', () => {
    const dateInUTC = '2025-06-15T12:00:00.000Z'; // June 15, 2025 in UTC

    expect(getMonthCalendarLabel(dateInUTC, 'en', 'UTC')).toBe('June');
    expect(getMonthCalendarLabel(dateInUTC, 'de', 'UTC')).toBe('Juni');
    expect(getMonthCalendarLabel(dateInUTC, 'fr', 'UTC')).toBe('juin');
  });
});

describe('getYearCalendarLabel', () => {
  it('should return the year label without timezone', () => {
    const date = '2025-01-01T10:00:00.000Z'; // January 1, 2025 in UTC
    expect(getYearCalendarLabel(date, 'en')).toBe('2025');
  });

  it('should return the year label with timezone that shows correct year when timezone conversion would change the day', () => {
    // This represents January 1st, 2025 in Pacific/Kiritimati (UTC+14)
    // When converted to UTC, this becomes December 31st, 2024
    const dateInKiritimati = '2024-12-31T10:00:00.000Z'; // This is January 1st, 2025 in Pacific/Kiritimati

    // Without timezone, it would show 2024 (wrong)
    expect(getYearCalendarLabel(dateInKiritimati, 'en')).toBe('2024');

    // With timezone, it should show 2025 (correct)
    expect(
      getYearCalendarLabel(dateInKiritimati, 'en', 'Pacific/Kiritimati')
    ).toBe('2025');
  });
});

describe('timezone edge cases', () => {
  beforeEach(() => {
    // Mock the current date to January 1st, 2025 in Pacific/Kiritimati
    const mockDate = new Date('2025-01-01T02:00:00+14:00'); // 2025-01-01 02:00 in UTC+14 = 2024-12-31 12:00 in UTC
    jest.spyOn(Date, 'now').mockReturnValue(mockDate.getTime());

    // Mock moment to return this specific date when getting "now"
    jest.doMock('moment-timezone', () => {
      const actualMoment = jest.requireActual('moment-timezone');
      return {
        ...actualMoment,
        tz: jest.fn().mockImplementation((...args) => {
          if (args[0] === 'Pacific/Kiritimati' && args.length === 1) {
            // Return January 1st, 2025 in that timezone
            return actualMoment.tz('2025-01-01 02:00', 'Pacific/Kiritimati');
          }
          return actualMoment.tz.apply(actualMoment, args);
        }),
      };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.dontMock('moment-timezone');
  });

  it('should display correct month when today in timezone converts to yesterday in UTC', () => {
    // Test the scenario from the bug report:
    // It's January 1st in Pacific/Kiritimati, but December 31st in UTC

    const today = getToday('Pacific/Kiritimati');

    // The month label should show January when using timezone
    expect(getMonthCalendarLabel(today, 'en', 'Pacific/Kiritimati')).toBe(
      'January'
    );

    // The year label should show 2025 when using timezone
    expect(getYearCalendarLabel(today, 'en', 'Pacific/Kiritimati')).toBe(
      '2025'
    );
  });
});
