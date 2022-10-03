---
'@commercetools-uikit/design-system': minor
'@commercetools-uikit/calendar-utils': minor
'@commercetools-uikit/avatar': minor
'@commercetools-uikit/accessible-button': minor
'@commercetools-uikit/flat-button': minor
'@commercetools-uikit/icon-button': minor
'@commercetools-uikit/link-button': minor
'@commercetools-uikit/primary-button': minor
'@commercetools-uikit/secondary-button': minor
'@commercetools-uikit/secondary-icon-button': minor
'@commercetools-uikit/card': minor
'@commercetools-uikit/collapsible-panel': minor
'@commercetools-uikit/constraints': minor
'@commercetools-uikit/data-table': minor
'@commercetools-uikit/data-table-manager': minor
'@commercetools-uikit/field-label': minor
'@commercetools-uikit/grid': minor
'@commercetools-uikit/icons': minor
'@commercetools-uikit/async-creatable-select-input': minor
'@commercetools-uikit/async-select-input': minor
'@commercetools-uikit/checkbox-input': minor
'@commercetools-uikit/creatable-select-input': minor
'@commercetools-uikit/date-time-input': minor
'@commercetools-uikit/input-utils': minor
'@commercetools-uikit/localized-multiline-text-input': minor
'@commercetools-uikit/localized-rich-text-input': minor
'@commercetools-uikit/localized-text-input': minor
'@commercetools-uikit/money-input': minor
'@commercetools-uikit/multiline-text-input': minor
'@commercetools-uikit/number-input': minor
'@commercetools-uikit/password-input': minor
'@commercetools-uikit/radio-input': minor
'@commercetools-uikit/rich-text-utils': minor
'@commercetools-uikit/search-select-input': minor
'@commercetools-uikit/select-input': minor
'@commercetools-uikit/select-utils': minor
'@commercetools-uikit/text-input': minor
'@commercetools-uikit/time-input': minor
'@commercetools-uikit/toggle-input': minor
'@commercetools-uikit/label': minor
'@commercetools-uikit/link': minor
'@commercetools-uikit/loading-spinner': minor
'@commercetools-uikit/notifications': minor
'@commercetools-uikit/primary-action-dropdown': minor
'@commercetools-uikit/spacings-inline': minor
'@commercetools-uikit/spacings-inset': minor
'@commercetools-uikit/spacings-inset-squish': minor
'@commercetools-uikit/spacings-stack': minor
'@commercetools-uikit/stamp': minor
'@commercetools-uikit/tag': minor
'@commercetools-uikit/text': minor
'@commercetools-uikit/tooltip': minor
'@commercetools-uikit/view-switcher': minor
'@commercetools-frontend/ui-kit': minor
'visual-testing-app': minor
---

Prepare theming support in our design system.

This is an internal change to restructure how we define and use design tokens, in particular by relying on CSS variables. Consumers are not affected by any of these changes.

Note that the `customProperties` object exported from the `@commercetools-uikit/design-system` package is now deprecated (although still exported for backwards compatibility) in favour of the `designTokens` object.