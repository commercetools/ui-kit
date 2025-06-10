---
'@commercetools-uikit/date-range-input': minor
'@commercetools-uikit/date-time-input': minor
'@commercetools-uikit/date-input': minor
'@commercetools-uikit/calendar-utils': minor
---

feat: add `appearance` prop with 'filter' option to date input components

To use the date filters, there are some visual modifications that need to happen in the different date inputs to support the designs and ux of the filters pattern. Most of these changes are dependent on new props to set these options when the component is used in a filter component.

Add support for `appearance: 'filter'` to DateInput, DateTimeInput, and DateRangeInput components. When set to 'filter', the components:

- Remove borders and box shadows for a clean, inline appearance
- Keep the calendar always open (when not disabled or read-only)
- Maintain transparent backgrounds to blend seamlessly with filter UIs

This follows the same design pattern established in select input components and enables date inputs to be used effectively within filter components and search interfaces.

**New Props:**
- `appearance?: 'default' | 'filter'` - Controls the visual styling of the date input

**Examples:**
```jsx
<DateInput appearance="filter" value="2024-01-15" />
<DateTimeInput appearance="filter" value="2024-01-15T10:30:00Z" />
<DateRangeInput appearance="filter" value={['2024-01-15', '2024-01-20']} />
```
```
