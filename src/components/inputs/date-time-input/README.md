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
  timeZone="Europe/Berlin"
  value="2018-10-04T09:00:00.000Z"
  onChange={() => {}}
/>
```

#### Properties

| Props                  | Type     | Required | Values                             | Default | Description                                                                                                                             |
| ---------------------- | -------- | :------: | ---------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string` |    -     | -                                  | -       | Used as the HTML `id` attribute.                                                                                                        |
| `name`                 | `string` |    -     | -                                  | -       | Used as the HTML `name` attribute.                                                                                                      |
| `timeZone`             | `string` |    ✅    | -                                  | -       | Specifies the time zone in which the calendar and selected values are shown. It also influences how entered dates and times are parsed. |
| `onChange`             | `func`   |    ✅    | -                                  | -       | Called when the date changes. Called with an event containing an empty string (no value) or a string in this format: "YYYY-MM-DD".      |
| `onFocus`              | `func`   |    -     | -                                  | -       | Called when the date input gains focus.                                                                                                 |
| `onBlur`               | `func`   |    -     | -                                  | -       | Called when the date input loses focus.                                                                                                 |
| `value`                | `string` |    -     | -                                  | -       | The selected date, must either be an empty string or a date formatted in ISO 8601 (e.g. "2018-10-04T09:00:00.000Z").                    |
| `placeholder`          | `string` |    -     | -                                  | -       | Placeholder value to show in the input field                                                                                            |
| `isDisabled`           | `bool`   |    -     | -                                  | `false` | Disables the date picker                                                                                                                |
| `horizontalConstraint` | `object` |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input field.                                                                                               |

##### `props.timeZone`

The `timeZone` specifies which time zone the calendar uses, which time zone the selected value is shown in and which time zone entered dates and times are parsed in. For example, given the value is `2018-10-18T00:00:00.000Z and the`timeZone`is set to`Europe/Berlin`, then entering "13:00" as the time results in the`onChange`being called with`2018-10-15T11:00:00.000Z` (as the time zone offset for that date is two hours).

> Note: It is not possible to supply a general time-zone offset, one has to always use the time-zone. This is because the offset depends on the selected date and time. That's why it's also not possible to get the general offset of a time zone from UTC. It is only possible to get the offset from UTC for a specific date & time.
