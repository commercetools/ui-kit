import {
  getLocalizedDateTimeFormatPattern,
  formatDefaultTime,
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
