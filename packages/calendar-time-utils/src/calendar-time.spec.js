import { getLocalizedDateFormatPattern } from './calendar-time';

describe('getLocalizedDateFormatPattern', () => {
  const SHORT_LOCALIZED_FORMATS = {
    de: 'TT.MM.JJJJ',
    en: 'MM/DD/YYYY',
    es: 'DD/MM/AAAA',
    'fr-FR': 'JJ/MM/AAAA',
    ja: '年/月/日',
    'zh-CN': '年/月/日',
    xx: 'MM/DD/YYYY', // unknown locale returns the default pattern moment provides
  };

  const LONG_LOCALIZED_FORMATS = {
    de: 'TT.MM.JJJJ - SS:mm',
    en: 'MM/DD/YYYY - HH:mm AM/PM',
    es: 'DD/MM/AAAA - HH:mm',
    'fr-FR': 'JJ/MM/AAAA - HH:mm',
    ja: '年/月/日 - 午前/午後 時:分',
    'zh-CN': '年/月/日 - 小时:分钟',
    xx: 'MM/DD/YYYY - h:mm A', // unknown locale returns the default pattern moment provides
  };

  const checkLocales = (mockFormats, formatType) => {
    Object.entries(mockFormats).forEach(([locale, expectedFormat]) => {
      expect(getLocalizedDateFormatPattern(locale, formatType)).toBe(
        expectedFormat
      );
    });
  };

  describe('when using default format type (short)', () => {
    it('should return the right format based on locale', () => {
      checkLocales(SHORT_LOCALIZED_FORMATS);
    });
  });

  describe('when passing short format type', () => {
    it('should return the right format based on locale', () => {
      checkLocales(SHORT_LOCALIZED_FORMATS, 'short');
    });
  });

  describe('when passing long format type', () => {
    it('should return the right format based on locale', () => {
      checkLocales(LONG_LOCALIZED_FORMATS, 'long');
    });
  });
});
