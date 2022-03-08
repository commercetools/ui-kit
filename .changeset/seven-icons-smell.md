---
'@commercetools-uikit/async-creatable-select-field': patch
'@commercetools-uikit/async-select-field': patch
'@commercetools-uikit/creatable-select-field': patch
'@commercetools-uikit/date-field': patch
'@commercetools-uikit/date-range-field': patch
'@commercetools-uikit/date-time-field': patch
'@commercetools-uikit/localized-multiline-text-field': patch
'@commercetools-uikit/localized-text-field': patch
'@commercetools-uikit/money-field': patch
'@commercetools-uikit/multiline-text-field': patch
'@commercetools-uikit/number-field': patch
'@commercetools-uikit/password-field': patch
'@commercetools-uikit/radio-field': patch
'@commercetools-uikit/search-select-field': patch
'@commercetools-uikit/select-field': patch
'@commercetools-uikit/text-field': patch
'@commercetools-uikit/time-field': patch
---

Expose static method `toFieldErrors` for each `*Field` component.

Use this function to convert the Formik `errors` object type to our custom field errors type. This is primarily useful when using TypeScript.

```ts
type FormValues = {
  myField: string,
};

<TextField
  // ...
  name="my-field"
  errors={
    TextField.toFieldErrors<FormValues>(formik.errors).myField
  }
/>
```
