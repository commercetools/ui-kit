const currencies = {
  ADP: { fractionDigits: 0 },
  AED: { fractionDigits: 2 },
  AFA: { fractionDigits: 2 },
  AFN: { fractionDigits: 2 },
  ALL: { fractionDigits: 2 },
  AMD: { fractionDigits: 2 },
  ANG: { fractionDigits: 2 },
  AOA: { fractionDigits: 2 },
  ARS: { fractionDigits: 2 },
  ATS: { fractionDigits: 2 },
  AUD: { fractionDigits: 2 },
  AWG: { fractionDigits: 2 },
  AYM: { fractionDigits: 2 },
  AZM: { fractionDigits: 2 },
  AZN: { fractionDigits: 2 },
  BAM: { fractionDigits: 2 },
  BBD: { fractionDigits: 2 },
  BDT: { fractionDigits: 2 },
  BEF: { fractionDigits: 0 },
  BGL: { fractionDigits: 2 },
  BGN: { fractionDigits: 2 },
  BHD: { fractionDigits: 3 },
  BIF: { fractionDigits: 0 },
  BMD: { fractionDigits: 2 },
  BND: { fractionDigits: 2 },
  BOB: { fractionDigits: 2 },
  BOV: { fractionDigits: 2 },
  BRL: { fractionDigits: 2 },
  BSD: { fractionDigits: 2 },
  BTN: { fractionDigits: 2 },
  BWP: { fractionDigits: 2 },
  BYB: { fractionDigits: 0 },
  BYN: { fractionDigits: 2 },
  BYR: { fractionDigits: 0 },
  BZD: { fractionDigits: 2 },
  CAD: { fractionDigits: 2 },
  CDF: { fractionDigits: 2 },
  CHF: { fractionDigits: 2 },
  CLF: { fractionDigits: 0 },
  CLP: { fractionDigits: 0 },
  CNY: { fractionDigits: 2 },
  COP: { fractionDigits: 2 },
  CRC: { fractionDigits: 2 },
  CSD: { fractionDigits: 2 },
  CUC: { fractionDigits: 2 },
  CUP: { fractionDigits: 2 },
  CVE: { fractionDigits: 2 },
  CYP: { fractionDigits: 2 },
  CZK: { fractionDigits: 2 },
  DEM: { fractionDigits: 2 },
  DJF: { fractionDigits: 0 },
  DKK: { fractionDigits: 2 },
  DOP: { fractionDigits: 2 },
  DZD: { fractionDigits: 2 },
  EEK: { fractionDigits: 2 },
  EGP: { fractionDigits: 2 },
  ERN: { fractionDigits: 2 },
  ESP: { fractionDigits: 0 },
  ETB: { fractionDigits: 2 },
  EUR: { fractionDigits: 2 },
  FIM: { fractionDigits: 2 },
  FJD: { fractionDigits: 2 },
  FKP: { fractionDigits: 2 },
  FRF: { fractionDigits: 2 },
  GBP: { fractionDigits: 2 },
  GEL: { fractionDigits: 2 },
  GHC: { fractionDigits: 2 },
  GHS: { fractionDigits: 2 },
  GIP: { fractionDigits: 2 },
  GMD: { fractionDigits: 2 },
  GNF: { fractionDigits: 0 },
  GRD: { fractionDigits: 0 },
  GTQ: { fractionDigits: 2 },
  GWP: { fractionDigits: 2 },
  GYD: { fractionDigits: 2 },
  HKD: { fractionDigits: 2 },
  HNL: { fractionDigits: 2 },
  HRK: { fractionDigits: 2 },
  HTG: { fractionDigits: 2 },
  HUF: { fractionDigits: 2 },
  IDR: { fractionDigits: 2 },
  IEP: { fractionDigits: 2 },
  ILS: { fractionDigits: 2 },
  INR: { fractionDigits: 2 },
  IQD: { fractionDigits: 3 },
  IRR: { fractionDigits: 2 },
  ISK: { fractionDigits: 0 },
  ITL: { fractionDigits: 0 },
  JMD: { fractionDigits: 2 },
  JOD: { fractionDigits: 3 },
  JPY: { fractionDigits: 0 },
  KES: { fractionDigits: 2 },
  KGS: { fractionDigits: 2 },
  KHR: { fractionDigits: 2 },
  KMF: { fractionDigits: 0 },
  KPW: { fractionDigits: 2 },
  KRW: { fractionDigits: 0 },
  KWD: { fractionDigits: 3 },
  KYD: { fractionDigits: 2 },
  KZT: { fractionDigits: 2 },
  LAK: { fractionDigits: 2 },
  LBP: { fractionDigits: 2 },
  LKR: { fractionDigits: 2 },
  LRD: { fractionDigits: 2 },
  LSL: { fractionDigits: 2 },
  LTL: { fractionDigits: 2 },
  LUF: { fractionDigits: 0 },
  LVL: { fractionDigits: 2 },
  LYD: { fractionDigits: 3 },
  MAD: { fractionDigits: 2 },
  MDL: { fractionDigits: 2 },
  MGA: { fractionDigits: 2 },
  MGF: { fractionDigits: 0 },
  MKD: { fractionDigits: 2 },
  MMK: { fractionDigits: 2 },
  MNT: { fractionDigits: 2 },
  MOP: { fractionDigits: 2 },
  MRO: { fractionDigits: 2 },
  MTL: { fractionDigits: 2 },
  MUR: { fractionDigits: 2 },
  MVR: { fractionDigits: 2 },
  MWK: { fractionDigits: 2 },
  MXN: { fractionDigits: 2 },
  MXV: { fractionDigits: 2 },
  MYR: { fractionDigits: 2 },
  MZM: { fractionDigits: 2 },
  MZN: { fractionDigits: 2 },
  NAD: { fractionDigits: 2 },
  NGN: { fractionDigits: 2 },
  NIO: { fractionDigits: 2 },
  NLG: { fractionDigits: 2 },
  NOK: { fractionDigits: 2 },
  NPR: { fractionDigits: 2 },
  NZD: { fractionDigits: 2 },
  OMR: { fractionDigits: 3 },
  PAB: { fractionDigits: 2 },
  PEN: { fractionDigits: 2 },
  PGK: { fractionDigits: 2 },
  PHP: { fractionDigits: 2 },
  PKR: { fractionDigits: 2 },
  PLN: { fractionDigits: 2 },
  PTE: { fractionDigits: 0 },
  PYG: { fractionDigits: 0 },
  QAR: { fractionDigits: 2 },
  ROL: { fractionDigits: 2 },
  RON: { fractionDigits: 2 },
  RSD: { fractionDigits: 2 },
  RUB: { fractionDigits: 2 },
  RUR: { fractionDigits: 2 },
  RWF: { fractionDigits: 0 },
  SAR: { fractionDigits: 2 },
  SBD: { fractionDigits: 2 },
  SCR: { fractionDigits: 2 },
  SDD: { fractionDigits: 2 },
  SDG: { fractionDigits: 2 },
  SEK: { fractionDigits: 2 },
  SGD: { fractionDigits: 2 },
  SHP: { fractionDigits: 2 },
  SIT: { fractionDigits: 2 },
  SKK: { fractionDigits: 2 },
  SLL: { fractionDigits: 2 },
  SOS: { fractionDigits: 2 },
  SRD: { fractionDigits: 2 },
  SRG: { fractionDigits: 2 },
  SSP: { fractionDigits: 2 },
  STD: { fractionDigits: 2 },
  SVC: { fractionDigits: 2 },
  SYP: { fractionDigits: 2 },
  SZL: { fractionDigits: 2 },
  THB: { fractionDigits: 2 },
  TJS: { fractionDigits: 2 },
  TMM: { fractionDigits: 2 },
  TMT: { fractionDigits: 2 },
  TND: { fractionDigits: 3 },
  TOP: { fractionDigits: 2 },
  TPE: { fractionDigits: 0 },
  TRL: { fractionDigits: 0 },
  TRY: { fractionDigits: 2 },
  TTD: { fractionDigits: 2 },
  TWD: { fractionDigits: 2 },
  TZS: { fractionDigits: 2 },
  UAH: { fractionDigits: 2 },
  UGX: { fractionDigits: 0 },
  USD: { fractionDigits: 2 },
  USN: { fractionDigits: 2 },
  USS: { fractionDigits: 2 },
  UYU: { fractionDigits: 2 },
  UZS: { fractionDigits: 2 },
  VEB: { fractionDigits: 2 },
  VEF: { fractionDigits: 2 },
  VND: { fractionDigits: 0 },
  VUV: { fractionDigits: 0 },
  WST: { fractionDigits: 2 },
  XAF: { fractionDigits: 0 },
  XAG: { fractionDigits: -1 },
  XAU: { fractionDigits: -1 },
  XBA: { fractionDigits: -1 },
  XBB: { fractionDigits: -1 },
  XBC: { fractionDigits: -1 },
  XBD: { fractionDigits: -1 },
  XCD: { fractionDigits: 2 },
  XDR: { fractionDigits: -1 },
  XFO: { fractionDigits: -1 },
  XFU: { fractionDigits: -1 },
  XOF: { fractionDigits: 0 },
  XPD: { fractionDigits: -1 },
  XPF: { fractionDigits: 0 },
  XPT: { fractionDigits: -1 },
  XSU: { fractionDigits: -1 },
  XTS: { fractionDigits: -1 },
  XUA: { fractionDigits: -1 },
  XXX: { fractionDigits: -1 },
  YER: { fractionDigits: 2 },
  YUM: { fractionDigits: 2 },
  ZAR: { fractionDigits: 2 },
  ZMK: { fractionDigits: 2 },
  ZMW: { fractionDigits: 2 },
  ZWD: { fractionDigits: 2 },
  ZWL: { fractionDigits: 2 },
  ZWN: { fractionDigits: 2 },
  ZWR: { fractionDigits: 2 },
} as const;

export default currencies;
