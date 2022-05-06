---
'@commercetools-uikit/calendar-time-utils': patch
---

Added a new function to calculate localized date/time patterns.

Examples:
```js
import { getLocalizedDateTimeFormatPattern } from '@commercetools-uikit/calendar-time-utils';

getLocalizedDateTimeFormatPattern('en', 'date');
// MM/DD/YYYY

getLocalizedDateTimeFormatPattern('en-GB', 'date');
// DD/MM/YYYY

getLocalizedDateTimeFormatPattern('de', 'date');
// TT.MM.JJJJ

getLocalizedDateTimeFormatPattern('en', 'time');
// HH:mm AM/PM

getLocalizedDateTimeFormatPattern('de', 'time');
// SS:mm

getLocalizedDateTimeFormatPattern('en', 'full');
// MM/DD/YYYY - HH:mm AM/PM

getLocalizedDateTimeFormatPattern('de', 'full');
// TT.MM.JJJJ - SS:mm
```
