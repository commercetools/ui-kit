# Switches: Radio

## Usage

```js
import { Radio } from '@commercetools-frontend/ui-kit';
```

#### Description

A `Radio` is grouped within a set of disjoint items where one item should always
be selected. As a result the named `Radio` export exposes a `Group` and an
`Option`.

#### Usage

```js
import { Radio } from '@commercetools-frontend/ui-kit/switches';

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

| Props      | Type     | Required | Values                      | Default | Description                                                                  |
| ---------- | -------- | :------: | --------------------------- | ------- | ---------------------------------------------------------------------------- |
| `children` | `node`   |    ✅    | -                           | -       | The `Radio.Option` or another node (mixed children are allowed)              |
| `value`    | `string` |    -     | -                           | -       | The selected value of the of a `Radio.Option` determining its checked status |
| `onChange` | `func`   |    ✅    | -                           | -       | What will trigger whenever an `Radio.Option` is clicked                      |
| `scale`    | `string` |    -     | ['xs', 's', 'm', 'l', 'xl'] | `m`     | Spacing between options                                                      |

##### Radio.Option

| Props        | Type     | Required | Values | Default | Description                                                   |
| ------------ | -------- | :------: | ------ | ------- | ------------------------------------------------------------- |
| `children`   | `string` |    -     | -      | -       | The descriptive text of the Radio.Option                      |
| `isDisabled` | `bool`   |    -     | -      | `false` | Disables the Radio.Option within the Radio.Group              |
| `value`      | `string` |    ✅    | -      | -       | The value of the option passed to `onChange` in `Radio.Group` |

#### Invariants

1.  The `Radio.Option` must have at least one `Radio.Option` element as
    `children`
