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

Introduce theming support to ui-kit components based on the use of **CSS custom properties** (sometimes referred to as **CSS variables** or **cascading variables**).

The theming implementation consists of 2 key parts:

- `<ThemeProvider>` component from `@commercetools-uikit/design-system` added to the React component hierarchy will be responsible for declaring CSS custom properties and `data-theme` attribute (by default) in the `:root` element. For instance:
```html
<html data-theme="default" style="--color-primary:#00b39e”>
```

- `designTokens` object exporteded from the `@commercetools-uikit/design-system` package make the components using design tokens refer to CSS variables values rather than use fixed values, for instance:
```ts
const designTokens = {
  colorPrimary: 'var(--color-primary, #00b39e)',
  …
}
```

When accessing CSS variables using the `var()` function, [fallback values](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#custom_property_fallback_values) are provided, therefore lack of `<ThemeProvider>` component in the React component tree does not introduce any visual changes.

`customProperties` object exporteded from the `@commercetools-uikit/design-system` is now deprecated (although still exported for backwards compatibility). It is advised to use the `designTokens` object instead.