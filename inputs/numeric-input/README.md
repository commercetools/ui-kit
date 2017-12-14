# NumericInput

#### Description

A controlled input component for numbers with validation states.

## Usage

```js
import NumericInput from '@commercetools-local/ui-kit/inputs/numeric-input';

<NumericInput value="2.5" onChange={value => alert(value)} />;
```

#### Properties

| Props         | Type     | Required | Values | Default | Description                                                                                        |
| ------------- | -------- | :------: | ------ | ------- | -------------------------------------------------------------------------------------------------- |
| `name`        | `string` |    ✅    | -      | -       | Used as HTML `name` property                                                                       |
| `value`       | `string` |    ✅    | -      | -       | Value of the input. This is a string as the parent is responsible for converting it into a number. |
| `onChange`    | `func`   |    ✅    | -      | -       | Called with the new value. Parent should pass it back as `value`                                   |
| `onBlur`      | `func`   |    -     | -      | -       | Called when field is blurred                                                                       |
| `isDisabled`  | `bool`   |    -     | -      | `false` | Indicates that the field cannot be used (e.g not authorised, or changes not saved) |
| `isInactive`  | `bool`   |    -     | -      | `false` | Applies the inactive style. Indicate that a service (unit) is currently not "running", but may get started - i.e become active (e.G when a fetch is being executed in a search input field the user should have a feedback that while the search is being made, the field is currently inactive) |
| `placeholder` | `string` |    -     | -      | -       | Placeholder text for the input                                                                          |
| `tone`    | `oneOf`   |    -     | ['warning', 'error', 'info']      | `default` | applies the styles regarding the received tone |
