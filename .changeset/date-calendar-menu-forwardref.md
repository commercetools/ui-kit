---
'@commercetools-uikit/calendar-utils': patch
'@commercetools-uikit/date-input': patch
'@commercetools-uikit/date-range-input': patch
'@commercetools-uikit/date-time-input': patch
---

Fix `TypeError: t.contains is not a function` crash thrown when a date-input,
date-range-input, or date-time-input calendar closes on blur / click-outside
under `downshift` >= 9.3.4 (verified against `downshift` 9.4.0).

`CalendarMenu` (shared by all three inputs) received downshift's menu ref via
`getMenuProps()`, but as a class component the ref pointed at the class instance
— which has no `.contains()`. downshift 9.3.4 removed the guard that previously
tolerated non-DOM refs, so any consumer resolving downshift >= 9.3.4 crashed.
`CalendarMenu` is now a `forwardRef` function component that forwards the ref
onto the DOM node it already renders, so downshift's ref lands on a real element
with `.contains()`. The rendered DOM, roles, ARIA, and behavior are unchanged.
