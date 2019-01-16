# RadioInput

## Usage

```js
import { RadioInput } from '@commercetools-frontend/ui-kit';
```

#### Description

A `RadioInput` is grouped within a set of disjoint items where one item should always
be selected. As a result the named `RadioInput` export exposes a `Group` and an
`Option`.

#### Usage

```js
import { RadioInput } from '@commercetools-frontend/ui-kit/switches';

<RadioInput.Group onChange={...} value="foo-radio-value">
   <RadioInput.Option value="foo-radio-value">
      What ever option
   </RadioInput.Option>
   <RadioInput.Option value="bar-radio-value" isDisabled={true}>
      Another option
   </RadioInput.Option>
</RadioInput.Group>
```

#### Properties

##### RadioInput.Group

| Props      | Type     | Required | Values                      | Default | Description                                                                       |
| ---------- | -------- | :------: | --------------------------- | ------- | --------------------------------------------------------------------------------- |
| `children` | `node`   |    ✅    | -                           | -       | The `RadioInput.Option` or another node (mixed children are allowed)              |
| `value`    | `string` |    -     | -                           | -       | The selected value of the of a `RadioInput.Option` determining its checked status |
| `onChange` | `func`   |    ✅    | -                           | -       | What will trigger whenever an `RadioInput.Option` is clicked                      |
| `scale`    | `string` |    -     | ['xs', 's', 'm', 'l', 'xl'] | `m`     | Spacing between options                                                           |

##### RadioInput.Option

| Props        | Type     | Required | Values | Default | Description                                                                                                                                                                                                                                                                                 |
| ------------ | -------- | :------: | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`   | `string` |    -     | -      | -       | The descriptive text of the RadioInput.Option                                                                                                                                                                                                                                               |
| `isDisabled` | `bool`   |    -     | -      | `false` | Disables the RadioInput.Option within the RadioInput.Group                                                                                                                                                                                                                                  |
| `isHovered`  | `bool`   |    -     | -      | `false` | Forces RadioInput.Option to be rendered in a hovered state. That's needed for the cases when hovered appearance should be triggered by the parent component and not the Radio.Option itself. RadioInput.Option is capable of handling it's own hovering without the need to pass this prop. |
| `value`      | `string` |    ✅    | -      | -       | The value of the option passed to `onChange` in `RadioInput.Group` a                                                                                                                                                                                                                        |

#### Invariants

1.  The `RadioInput.Option` must have at least one `RadioInput.Option` element as
    `children`
