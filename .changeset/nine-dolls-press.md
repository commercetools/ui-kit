---
'@commercetools-uikit/calendar-time-utils': patch
---

Update getLocalizedDateTimeFormatPattern method to use Intl.DateTimeFormat.formatToParts to generate localized date and time format description strings instead of relying on moment.js locale description methods
