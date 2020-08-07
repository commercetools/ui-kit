# Dates: DateTimeInput

## Description

The `DateTimeInput` component allows the user to select a date. This component also supports
multiple date selection. It formats the selected date depending on the current locale.

## Usage

```js
import DateTimeInput from '@commercetools-uikit/date-time-input';

<DateTimeInput
  placeholder="Select a date..."
  timeZone="Europe/Berlin"
  value="2018-10-04T09:00:00.000Z"
  onChange={() => {}}
/>;
```

## Properties

| Props                  | Type     | Required | Values                  | Default | Description                                                                                                                             |
| ---------------------- | -------- | :------: | ----------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `horizontalConstraint` | `object` |    -     | `m`, `l`, `xl`, `scale` | `scale` | Horizontal size limit of the input field.                                                                                               |
| `value`                | `string` |    -     | -                       | -       | The selected date, must either be an empty string or a date formatted in ISO 8601 (e.g. "2018-10-04T09:00:00.000Z").                    |
| `onChange`             | `func`   |    ✅    | -                       | -       | Called when the date changes. Called with an event containing an empty string (no value) or a string in this format: "YYYY-MM-DD".      |
| `onFocus`              | `func`   |    -     | -                       | -       | Called when the date input gains focus.                                                                                                 |
| `onBlur`               | `func`   |    -     | -                       | -       | Called when the date input loses focus.                                                                                                 |
| `timeZone`             | `string` |    ✅    | -                       | -       | Specifies the time zone in which the calendar and selected values are shown. It also influences how entered dates and times are parsed. |
| `id`                   | `string` |    -     | -                       | -       | Used as the HTML `id` attribute.                                                                                                        |
| `name`                 | `string` |    -     | -                       | -       | Used as the HTML `name` attribute.                                                                                                      |
| `placeholder`          | `string` |    -     | -                       | -       | Placeholder value to show in the input field                                                                                            |
| `isDisabled`           | `bool`   |    -     | -                       | `false` | Disables the date picker                                                                                                                |
| `isReadOnly`           | `bool`   |    -     | -                       | `false` | Disables the date picker menu and sets the input field as read-only                                                                     |
| `hasError`             | `bool`   |    -     | -                       | -       | Indicates the input field has an error                                                                                                  |
| `hasWarning`           | `bool`   |    -     | -                       | -       | Indicates the input field has a warning                                                                                                 |

### `props.timeZone`

The `timeZone` specifies which time zone the calendar uses, which time zone the selected value is shown in and which time zone entered dates and times are parsed in. For example, given the value is `2018-10-18T00:00:00.000Z` and the`timeZone`is set to`Europe/Berlin`, then entering "13:00" as the time results in the`onChange`being called with`2018-10-15T11:00:00.000Z` (as the time zone offset for that date is two hours).
