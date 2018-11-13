# Dates: DateTimeInput

## Usage

```js
import { DateTimeInput } from '@commercetools-frontend/ui-kit';
```

#### Description

The `DateTimeInput` component allows the user to select a date. This component also supports
multiple date selection. It formats the selected date depending on the current locale.

#### Usage

```js
<DateTimeInput
  placeholder="Select a date..."
  value="2018-10-04T09:00:00.000Z"
  onChange={() => {}}
/>
```

#### Properties

| Props                  | Type     | Required | Values                             | Default | Description                                                                                                           |
| ---------------------- | -------- | :------: | ---------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string` |    -     | -                                  | -       | Used as the HTML `id` attribute.                                                                                      |
| `onChange`             | `func`   |    ✅    | -                                  | -       | Called when the date changes. Called with either an empty string (no value) or a string in this format: "YYYY-MM-DD". |
| `value`                | `string` |    -     | -                                  | -       | The selected date, must either be an empty string or a date formatted in ISO 8601 (e.g. "2018-10-04T09:00:00.000Z").  |
| `placeholder`          | `string` |    -     | -                                  | -       | Placeholder value to show in the input field                                                                          |
| `isDisabled`           | `bool`   |    -     | -                                  | `false` | Disables the date picker                                                                                              |
| `horizontalConstraint` | `object` |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input field.                                                                             |
| `isAutofocussed`       | `bool`   |    -     | -                                  | -       | Focus the input field on initial render                                                                               |
