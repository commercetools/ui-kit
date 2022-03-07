## `data-*` props

The component further forwards all `data-` attributes to the underlying `input` component.

## `errors`

This object is a key-value map. The `renderError` prop will be called for each entry with the key and the value. The return value will be rendered inside an `ErrorMessage` component underneath the input.

The `LocalizedTextField` supports some errors out of the box. Return `undefined` from `renderError` for these and the default errors will be shown instead. This prevents consumers from having to reimplement the same error messages for known errors while still keeping the flexibility of showing custom error messages for them.

When the `key` is known, and when the value is truthy, and when `renderError` returned `undefined` for that error entry, then the `LocalizedTextField` will render an appropriate error automatically.

Known error keys are:

- `missing`: tells the user that this field is required

## Static methods

### `LocalizedTextField.toFieldErrors`

Use this function to convert the Formik `errors` object type to our custom field errors type. This is primarily useful when using TypeScript.

```ts
type FormValues = {
  myField: string;
};

<LocalizedTextField
  // ...
  name="my-field"
  errors={LocalizedTextField.toFieldErrors<FormValues>(formik.errors).myField}
/>;
```
