---
'@commercetools-uikit/design-system': minor
'@commercetools-uikit/calendar-utils': patch
'@commercetools-uikit/avatar': patch
'@commercetools-uikit/accessible-button': patch
'@commercetools-uikit/flat-button': patch
'@commercetools-uikit/icon-button': patch
'@commercetools-uikit/link-button': patch
'@commercetools-uikit/primary-button': patch
'@commercetools-uikit/secondary-button': patch
'@commercetools-uikit/secondary-icon-button': patch
'@commercetools-uikit/card': patch
'@commercetools-uikit/collapsible-panel': patch
'@commercetools-uikit/constraints': patch
'@commercetools-uikit/data-table': patch
'@commercetools-uikit/data-table-manager': patch
'@commercetools-uikit/field-label': patch
'@commercetools-uikit/icons': patch
'@commercetools-uikit/async-creatable-select-input': patch
'@commercetools-uikit/async-select-input': patch
'@commercetools-uikit/checkbox-input': patch
'@commercetools-uikit/creatable-select-input': patch
'@commercetools-uikit/date-time-input': patch
'@commercetools-uikit/input-utils': patch
'@commercetools-uikit/localized-multiline-text-input': patch
'@commercetools-uikit/localized-rich-text-input': patch
'@commercetools-uikit/localized-text-input': patch
'@commercetools-uikit/money-input': patch
'@commercetools-uikit/multiline-text-input': patch
'@commercetools-uikit/number-input': patch
'@commercetools-uikit/password-input': patch
'@commercetools-uikit/radio-input': patch
'@commercetools-uikit/rich-text-utils': patch
'@commercetools-uikit/search-select-input': patch
'@commercetools-uikit/select-input': patch
'@commercetools-uikit/select-utils': patch
'@commercetools-uikit/text-input': patch
'@commercetools-uikit/time-input': patch
'@commercetools-uikit/toggle-input': patch
'@commercetools-uikit/label': patch
'@commercetools-uikit/link': patch
'@commercetools-uikit/loading-spinner': patch
'@commercetools-uikit/notifications': patch
'@commercetools-uikit/primary-action-dropdown': patch
'@commercetools-uikit/spacings-inline': patch
'@commercetools-uikit/spacings-inset': patch
'@commercetools-uikit/spacings-inset-squish': patch
'@commercetools-uikit/spacings-stack': patch
'@commercetools-uikit/stamp': patch
'@commercetools-uikit/tag': patch
'@commercetools-uikit/text': patch
'@commercetools-uikit/tooltip': patch
'@commercetools-uikit/view-switcher': patch
'visual-testing-app': minor
---

Introduce theming support to ui-kit components based on the use of **CSS custom properties** (sometimes referred to as **CSS variables** or **cascading variables**).

The theming implementation consists of 2 key parts:

- `<ThemeProvider>` component from `@commercetools-uikit/design-system` added to the React component hierarchy will be responsible for declaring CSS custom properties and `data-theme` attribute (by default) in the `:root` element. For instance:
```html
<html data-theme="default" style="--color-primary:#00b39e”>
```

- `customProperties` as well as `designTokens` objects exporteded from the `@commercetools-uikit/design-system` package make the components in the ui-kit refer to CSS variables values rather than use fixed values, for instance:
```ts
const customProperties = {
  colorPrimary: 'var(--color-primary, #00b39e)',
  …
}
```

When accessing CSS variables using the `var()` function [fallback values](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#custom_property_fallback_values) are provided, therefore lack of `<ThemeProvider>` component in the React component tree does not introduce any visual changes.