# MoneyInput

#### Description

A controlled input component for money values with validation states.

## Usage

```js
import MoneyInput from '@commercetools-local/ui-kit/inputs/money-input';

<MoneyInput language="en" value={10} />;
```

#### Properties

| Props                  | Type     | Required | Values                             | Default | Description                                                                                                                                    |
| ---------------------- | -------- | :------: | ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                 | `string` |    -     | -                                  | -       | Used as HTML `name` property                                                                                                                   |
| `value`                | `string` |    -     | -                                  | -       | Value of the input. This is a string as the parent is responsible for converting it into a number.                                             |
| `language`             | `string` |    ✅    | -                                  | -       | Language of the input. This is a string as the parent is responsible for converting it into a money value according to format of the language. |
| `onChange`             | `func`   |    -     | -                                  | -       | Called with the new value. Parent should pass it back as `value`                                                                               |
| `onBlur`               | `func`   |    -     | -                                  | -       | Called when field is blurred                                                                                                                   |
| `hasError`             | `bool`   |    -     | -                                  | -       | Indicates the input field has an error                                                                                                         |
| `hasWarning`           | `bool`   |    -     | -                                  | -       | Indicates the input field has a warning                                                                                                        |
| `isDisabled`           | `bool`   |    -     | -                                  | `false` | Indicates that the field cannot be used (e.g not authorised)                                                                                   |
| `horizontalConstraint` | `object` |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input fields.                                                                                                     |
