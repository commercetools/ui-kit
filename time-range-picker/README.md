# Dates: TimeRangePicker

## Usage

```js
import TimeRangePicker from '@commercetools-local/ui-kit/time-range-picker';
```

#### Description

The `TimeRangePicker` component renders two _time_ pickers next to each other.
Internally it uses the `DatePicker` component in `time` mode.

#### Usage

```js
<TimeRangePicker
  value={{ from: '02:00:000Z', to: '10:15:000Z' }}
  onChange={() => {}}
/>;
```

#### Properties

| Props | Type | Required | Values | Default | Description |
| --- | --- | :---: | --- | --- | --- |
| `value` | `object` | ✅ | - | | An object with (optional) `from` and/or `to` fields to indicate the range values |
| `onChange` | `func` | ✅  | - | - | The function is called as soon as `from` or `to` values changed. The argument is the updated object with the `from`/`to` fields. |
