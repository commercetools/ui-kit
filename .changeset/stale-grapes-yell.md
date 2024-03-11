---
'@commercetools-uikit/design-system': minor
---

This package now contains a CSS file with all CSS variables per theme.

We still support the `custom-properties.css` file for backwards compatibility, but we now create other files based on each theme using their names as suffix.

Pattern:
```
custom-properties_<theme-name>.css
```

Example:
```
custom-properties_default.css
```
