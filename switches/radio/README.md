# Swtiches: Radio

## Usage

```js
import { Radio } from '@commercetools-local/ui-kit/switches';
```

#### Description

A `Radio` is grouped within a set of disjoint items where one item should always
be selected. As a result the named `Radio` export exposes a `Group` and an
`Option`.

#### Usage

```js
import { Radio } from '@commercetools-local/ui-kit/switches';

<Radio.Group onChange={...} value="foo-radio-value">
   <Radio.Option value="foo-radio-value">
      What ever option
   </Radio.Option>
   <Radio.Option value="bar-radio-value" isDisabled={true}>
      Another option
   </Radio.Option>
</Radio.Group>
```

#### Properties

##### Radio.Group

| Props      | Type     | Required | Values | Default | Description                                             |
| ---------- | -------- | :------: | ------ | ------- | ------------------------------------------------------- |
| `children` | `node`   |    ✅    | -      | -       | The `Radio.Option` or an intermediary node              |
| `value`    | `string` |    -     | -      | -       | The initially selected value of the of a `Radio.Option` |
| `onChange` | `func`   |    ✅    | -      | -       | What will trigger whenever an `Radio.Option` is clicked |

##### Radio.Option

| Props        | Type     | Required | Values | Default | Description                                                   |
| ------------ | -------- | :------: | ------ | ------- | ------------------------------------------------------------- |
| `children`   | `string` |    -     | -      | -       | The descriptive text of the option                            |
| `isDisabled` | `bool`   |    -     | -      | `false` | Disables the option within the Radio.Group                    |
| `value`      | `string` |    ✅    | -      | -       | The value of the option passed to `onChange` in `Radio.Group` |
| `children`   | `string` |    ✅    | -      | -       | The label of the option                                       |

#### Invariants

1. The `Radio.Option` must have at least one `Radio.Option` element as
   `children`
2. The `selectedValue` must be one of the `Radio.Option`'s values
