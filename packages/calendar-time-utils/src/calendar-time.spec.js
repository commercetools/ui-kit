import { getLocalizedDateTimeFormatPattern } from './calendar-time';

describe('getLocalizedDateTimeFormatPattern', () => {
  const DATE_LOCALIZED_FORMATS = {
    de: 'TT.MM.JJJJ',
    en: 'MM/DD/YYYY',
    'en-GB': 'DD/MM/YYYY',
    'en-AU': 'DD/MM/YYYY',
    es: 'DD/MM/AAAA',
    'fr-FR': 'JJ/MM/AAAA',
    ja: '年/月/日',
    'zh-CN': '年/月/日',
    xx: 'MM/DD/YYYY', // unknown locale returns the default pattern moment provides
  };

  const TIME_LOCALIZED_FORMATS = {
    de: 'SS:mm',
    en: 'HH:mm AM/PM',
    'en-GB': 'HH:mm',
    'en-AU': 'HH:mm AM/PM',
    es: 'HH:mm',
    'fr-FR': 'HH:mm',
    ja: '午前/午後 時:分',
    'zh-CN': '小时:分钟',
    xx: 'h:mm A', // unknown locale returns the default pattern moment provides
  };

  const FULL_LOCALIZED_FORMATS = {
    de: 'TT.MM.JJJJ - SS:mm',
    en: 'MM/DD/YYYY - HH:mm AM/PM',
    'en-GB': 'DD/MM/YYYY - HH:mm',
    'en-AU': 'DD/MM/YYYY - HH:mm AM/PM',
    es: 'DD/MM/AAAA - HH:mm',
    'fr-FR': 'JJ/MM/AAAA - HH:mm',
    ja: '年/月/日 - 午前/午後 時:分',
    'zh-CN': '年/月/日 - 小时:分钟',
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
      ).toThrowError(
        "CalendarTime.getLocalizedDateTimeFormatPattern: Unknown format type 'unknownFormatType'"
      );
    });
  });
});
