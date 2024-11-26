---
'@commercetools-uikit/async-creatable-select-field': major
'@commercetools-uikit/localized-rich-text-input': major
'@commercetools-uikit/async-select-field': major
'@commercetools-uikit/secondary-button': major
'@commercetools-uikit/primary-action-dropdown': major
'@commercetools-uikit/link-button': major
'@commercetools-uikit/select-input': major
'@commercetools-uikit/icons': major
'@commercetools-uikit/card': major
'@commercetools-uikit/link': major
'@commercetools-uikit/tag': major
'visual-testing-app': major
'@commercetools-uikit/buttons': major
'@commercetools-uikit/fields': major
'@commercetools-uikit/inputs': major
'@commercetools-frontend/ui-kit': major
---

These changes introduce an upgrade from react-router v5 to v6. The most obvious change is how the <Link to> component is now used. Unlike the the pattern in v5 where the `to` props in a nested route requires you to manually interpolate `match.url` for a relative route, v6 accepts a string where all urls are automatically relative routes.

```jsx
// v5: relative path requires you to manually interpolate
<Link to={`${match.url}/me`}>My Profile</Link>
```

```jsx
// v6: directly passed string is automatically interpreted as relative path
<Link to="me">My Profile</Link>
```
