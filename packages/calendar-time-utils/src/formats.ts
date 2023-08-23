// Reference: https://momentjs.com/docs/#/displaying/format/
const formatToken = {
  D: 'D', // NUMERIC_SINGLE_DAY
  DD: 'DD', // NUMERIC_TWO_DIGITS_DAY
  M: 'M', // NUMERIC_SINGLE_MONTH
  MM: 'MM', // NUMERIC_TWO_DIGIT_MONTH
  YY: 'YY', // TWO_DIGITS_YEAR
  YYYY: 'YYYY', // FOUR_DIGITS_YEAR
  h: 'h', // HOUR_12_SINGLE
  hh: 'hh', // HOUR_12_TWO_DIGITS
  H: 'H', // HOUR_24_SINGLE
  HH: 'HH', // HOUR_24_TWO_DIGITS
  m: 'm', // MINUTE_SINGLE
  mm: 'mm', // MINUTE_TWO_DIGITS
  A: 'A', // PERIOD - https://unicode.org/reports/tr35/tr35-6.html#Date_Format_Patterns
} as const;

export type TLocaleDateFormatMapping = {
  [key in keyof typeof formatToken]?: string;
};

export type TLocalizedDateFormatMapping = {
  [locale: string]: TLocaleDateFormatMapping;
};

// Here is where we translate from the standard characters used in the pattern
// (calculated in the moment.js library) to the characters used in the locale
// We just need to provide the translation for the characters that are different
// For instance, in english we don't need to translate date characters as
// they are the same as the pattern characters
export const DATE_FORMAT_LOCALIZED_MAPPINGS: TLocalizedDateFormatMapping = {
  en: {
    // MM/DD/YYYY - h:mm A -> MM/DD/YYYY - HH:mm AM/PM
    [formatToken.h]: 'HH',
    [formatToken.A]: 'AM/PM',
  },
  de: {
    // DD.MM.YYYY - HH:mm -> TT.MM.JJJJ - SS:mm
    [formatToken.DD]: 'TT',
    [formatToken.YYYY]: 'JJJJ',
    [formatToken.HH]: 'SS',
  },
  es: {
    // DD/MM/YYYY - H:mm -> DD/MM/AAAA - HH:mm
    [formatToken.H]: 'HH',
    [formatToken.YYYY]: 'AAAA',
  },
  fr: {
    // DD/MM/YYYY - HH:mm -> JJ/MM/AAAA - HH:mm
    [formatToken.DD]: 'JJ',
    [formatToken.YYYY]: 'AAAA',
  },
  pt: {
    // DD/MM/YYYY - HH:mm -> DD/MM/AAAA - HH:mm
    [formatToken.YYYY]: 'AAAA',
  },
  'zh-CN': {
    // YYYY/MM/DD - HH:mm -> 年/月/日 - 小时：分钟
    [formatToken.HH]: '小时',
    [formatToken.mm]: '分钟',
    [formatToken.DD]: '日',
    [formatToken.MM]: '月',
    [formatToken.YYYY]: '年',
  },
};
