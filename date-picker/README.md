# Dates: DatePicker

## Usage

```js
import DatePicker from '@commercetools-local/ui-kit/date-picker';
```

#### Description

The `DatePicker` component allows the user to select a date or a datetime
depending on the defined configuration. This component also supports the
multiple date selection. It formats the selected date depending on the current
locale.

#### Usage

```js
<DatePicker
  placeholder="Select a date..."
  timeScale="date"
  value="2017-12-31T16:02:50.000Z"
  onChange={() => {}}
/>
```

#### Properties

| Props                     | Type     | Required | Values                        | Default                                                                                                | Description                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------- | -------- | :------: | ----------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `onChange`                | `func`   |    ✅    | -                             | -                                                                                                      | a function called whenever the value changes.<br /><br />- `undefined` when mode is single and value was cleared<br />- `String` (`ISO` _date/time/datetime_) when mode is single and value changed<br />- `[]` when mode is multiple or range and value was cleared<br />- `Array<String>` (`ISO` _date/time/datetime_) when mode is multiple or range and at least one date was selected |
| `onClose`                 | `func`   |    -     | -                             | a function called whenever the picker closes. The function accepts an argument with the picker `value` |
| `mode`                    | `oneOf`  |    -     | `range`, `multiple`, `single` | `single`                                                                                               | Indicates the mode we can select dates                                                                                                                                                                                                                                                                                                                                                     |
| `timeScale`               | `oneOf`  |    -     | `time`, `date`, `datetime`    | `date`                                                                                                 | Indicates the time scale for the picker                                                                                                                                                                                                                                                                                                                                                    |
| `value`                   | `string` |    -     | -                             |                                                                                                        | The date value                                                                                                                                                                                                                                                                                                                                                                             |
| `placeholder`             | `string` |    -     | -                             | -                                                                                                      | Placeholder value to show in the input field                                                                                                                                                                                                                                                                                                                                               |
| `isDisabled`              | `bool`   |    -     | -                             | `false`                                                                                                | Disables the date picker                                                                                                                                                                                                                                                                                                                                                                   |
| `size`                    | `oneOf`  |    -     | `static`, `scale`             | `static`                                                                                               | Switches between standard-size and full-width of the container (must be a flex-context)                                                                                                                                                                                                                                                                                                    |
| `isInvalid`               | `bool`   |    -     | -                             | `false`                                                                                                | Switches to invalid-state                                                                                                                                                                                                                                                                                                                                                                  |
| `shouldInitializeOnMount` | `bool`   |    -     | -                             | `false`                                                                                                | In case the picker plugin should be initialized when the component mounts (by default it will be initialized first when the user hovers with the mouse)                                                                                                                                                                                                                                    |
