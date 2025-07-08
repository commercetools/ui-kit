---
'@commercetools-uikit/date-time-input': patch
'@commercetools-uikit/calendar-time-utils': patch
---

Enhanced `getMonthCalendarLabel` and `getYearCalendarLabel` functions to accept optional timezone parameter. When provided, these functions now interpret dates in the specified timezone context rather than UTC, fixing display issues for timezones that are significantly ahead of or behind UTC.
