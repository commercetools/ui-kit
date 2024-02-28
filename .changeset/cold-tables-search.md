---
'@commercetools-uikit/localized-multiline-text-field': patch
'@commercetools-uikit/localized-text-field': patch
---

We've changed how we internally manage the `errorsByLanguage` property to make it easy for consumers to style them.

If you currently want to render an error for an specific language, you need to use the `ErrorMessage` component to wrap the error text you provide to the component:

```jsx
<LocalizedTextField
  title="Title"
  value={value}
  onChange={handleChange}
  errorsByLanguage={{
    en: <ErrorMessage>This is an error</ErrorMessage>,
  }}
/>
```

With the new update, you no longer need to wrap the error text so you can provide it as it is:

```jsx
<LocalizedTextField
  title="Title"
  value={value}
  onChange={handleChange}
  errorsByLanguage={{
    en: 'This is an error',
  }}
/>
```

We still support the former, but we encourage using the new way to provide errors.
