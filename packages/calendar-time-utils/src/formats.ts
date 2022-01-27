// Reference: https://momentjs.com/docs/#/displaying/format/
enum FormatToken {
  D = 'D', // NUMERIC_SINGLE_DAY
  DD = 'DD', // NUMERIC_TWO_DIGITS_DAY
  M = 'M', // NUMERIC_SINGLE_MONTH
  MM = 'MM', // NUMERIC_TWO_DIGIT_MONTH
  YY = 'YY', // TWO_DIGITS_YEAR
  YYYY = 'YYYY', // FOUR_DIGITS_YEAR
  h = 'h', // HOUR_12_SINGLE
  hh = 'hh', // HOUR_12_TWO_DIGITS
  H = 'H', // HOUR_24_SINGLE
  HH = 'HH', // HOUR_24_TWO_DIGITS
  m = 'm', // MINUTE_SINGLE
  mm = 'mm', // MINUTE_TWO_DIGITS
  A = 'A', // PERIOD - https://unicode.org/reports/tr35/tr35-6.html#Date_Format_Patterns
}

type TLocaleDateFormatMapping = {
  [key in FormatToken]?: string;
};

type TLocalizedDateFormatMapping = {
  [locale: string]: TLocaleDateFormatMapping;
};

export const DATE_FORMAT_LOCALIZED_MAPPINGS: TLocalizedDateFormatMapping = {
  en: {
    // MM/DD/YYYY - h:mm A -> MM/DD/YYYY - HH:mm AM/PM
    [FormatToken.h]: 'HH',
    [FormatToken.A]: 'AM/PM',
  },
  de: {
    // DD.MM.YYYY - HH:mm -> TT.MM.JJJJ - SS:mm
    [FormatToken.DD]: 'TT',
    [FormatToken.YYYY]: 'JJJJ',
    [FormatToken.HH]: 'SS',
  },
  es: {
    // DD/MM/YYYY - H:mm -> DD/MM/AAAA - HH:mm
    [FormatToken.H]: 'HH',
    [FormatToken.YYYY]: 'AAAA',
  },
  fr: {
    // DD/MM/YYYY - HH:mm -> JJ/MM/AAAA - HH:mm
    [FormatToken.DD]: 'JJ',
    [FormatToken.YYYY]: 'AAAA',
  },
  ja: {
    // YYYY/MM/DD - HH:mm -> 年/月/日 - 午前/午後 時:分
    [FormatToken.HH]: '午前/午後 時',
    [FormatToken.mm]: '分',
    [FormatToken.DD]: '日',
    [FormatToken.MM]: '月',
    [FormatToken.YYYY]: '年',
  },
  'zh-CN': {
    // YYYY/MM/DD - HH:mm -> 年/月/日 - 小时：分钟
    [FormatToken.HH]: '小时',
    [FormatToken.mm]: '分钟',
    [FormatToken.DD]: '日',
    [FormatToken.MM]: '月',
    [FormatToken.YYYY]: '年',
  },
};
