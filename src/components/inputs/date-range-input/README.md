# Dates: DateRangeInput

## Usage

```js
import { DateRangeInput } from '@commercetools-frontend/ui-kit';
```

#### Description

The `DateRangeInput` component allows the user to select a date range.

#### Usage

```js
<DateRangeInput
  placeholder="Select a date..."
  value={['2017-01-11', '2017-01-14']}
  onChange={() => {}}
/>
```

#### Properties

| Props                  | Type     | Required | Values                             | Default | Description                                                                                                                                   |
| ---------------------- | -------- | :------: | ---------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string` |    -     | -                                  | -       | Used as the HTML `id` attribute.                                                                                                              |
| `onChange`             | `func`   |    ✅    | -                                  | -       | Called when the date range changes. Called with either an empty array (no value) or an array holding two string in this format: "YYYY-MM-DD". |
| `value`                | `string` |    -     | -                                  | -       | The selected date range, must either be an empty array or an array of two strings holding dates formatted as "YYYY-MM-DD".                    |
| `placeholder`          | `string` |    -     | -                                  | -       | Placeholder value to show in the input field                                                                                                  |
| `isDisabled`           | `bool`   |    -     | -                                  | `false` | Disables the date picker                                                                                                                      |
| `horizontalConstraint` | `object` |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input field.                                                                                                     |
| `isAutofocussed`       | `bool`   |    -     | -                                  | -       | Focus the input field on initial render                                                                                                       |
