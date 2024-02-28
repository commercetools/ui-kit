---
'@commercetools-uikit/localized-multiline-text-input': minor
'@commercetools-uikit/localized-rich-text-input': minor
'@commercetools-uikit/localized-money-input': minor
'@commercetools-uikit/localized-text-input': minor
---

---
'@commercetools-uikit/localized-multiline-text-field': patch
'@commercetools-uikit/localized-text-field': patch
---

We've changed how we internally manage the `errors` and `warnings` properties to make it easy for consumers to style them.

If you currently want to render an error for an specific language, you need to use the `WarningMessage` component to wrap the error text you provide to the component:

```jsx
<LocalizexTextInput
  title="Title"
  value={value}
  onChange={handleChange}
  warnings={{
    en: <WarningMessage>This is a warning</WarningMessage>,
  }}
>
```

With the new update, you no longer need to wrap the error text so you can provide it as it is:

```jsx
<LocalizexTextInput
  title="Title"
  value={value}
  onChange={handleChange}
  warnings={{
    en: 'This is a warning</WarningMessage',
  }}
>
```

We still support the former, but we encourage using the new way to provide errors and warnings.

