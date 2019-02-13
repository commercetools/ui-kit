# RadioInput

## Usage

```js
import { RadioInput } from '@commercetools-frontend/ui-kit';
```

#### Description

A `RadioInput` represents a group of options where only one option can be selected at a time.
The exported component contains a `Group` and `Option` components, with the `Group` component
being the wrapped around the list of `Option`s.

Most of the props should be assigned to the `Group` component, which internally forwards them
to each `Option` component. This is mostly to avoid passing a lot of props to each `Option` component.

#### Usage

```js
import { RadioInput } from '@commercetools-frontend/ui-kit/switches';

<RadioInput.Group onChange={...} name="fruits" value="apples">
  <RadioInput.Option value="apple">
    <Spacings.Inline alignItems="center">
      <div>🍎</div>
      <Text.Body>Apple</Text.Body>
    </Spacings.Inline>
  </RadioInput.Option>
  <RadioInput.Option value="banana">
    <Spacings.Inline alignItems="center">
      <div>🍌</div>
      <Text.Body>Banana</Text.Body>
    </Spacings.Inline>
  </RadioInput.Option>
</RadioInput.Group>
```

#### Properties

##### RadioInput.Group

| Props                  | Type                  | Required | Values                        | Default | Description                                                                                                                             |
| ---------------------- | --------------------- | :------: | ----------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string`              |    -     | -                             | -       | Used as HTML `id` property for the radion `Group`. Each `Option` will also get an `id` with an index number appended, to make it unique |
| `name`                 | `string`              |    -     | -                             | -       | Used as HTML `name` property for each `Option`                                                                                          |
| `value`                | `string`              |    ✅    | -                             | -       | Value of the selected radio `Option`                                                                                                    |
| `onChange`             | `func`                |    -     | -                             | -       | Called with the new value. Required when input is not read only. Parent should pass it back as `value`                                  |
| `onBlur`               | `func`                |    -     | -                             | -       | Called when an `Option` is blurred                                                                                                      |
| `onFocus`              | `func`                |    -     | -                             | -       | Called when an `Option` is focused                                                                                                      |
| `isDisabled`           | `bool`                |    -     | -                             | `false` | Indicates that all `Option`s cannot be used (e.g not authorised, or changes not saved)                                                  |
| `isReadOnly`           | `bool`                |    -     | -                             | `false` | Indicates that all `Option`s are displaying read-only content                                                                           |
| `hasError`             | `bool`                |    -     | -                             | -       | Indicates the radio `Option` has an error                                                                                               |
| `hasWarning`           | `bool`                |    -     | -                             | -       | Indicates the radio `Option` has a warning                                                                                              |
| `horizontalConstraint` | `string`              |    -     | `m` \| `l` \| `xl` \| `scale` | `scale` | Horizontal size limit of the radio `Group` (only available in `stack` direction)                                                        |
| `direction`            | `string`              |    -     | `stack` \| `inline`           | `stack` | Rendering direction of the radio `Option`s                                                                                              |
| `children`             | `node`                |    ✅    | -                             | -       | At least one `Option` component or another node (mixed children are allowed)                                                            |
| `value`                | `string` \| `boolean` |    -     | -                             | -       | The selected value of one of the `Option`s                                                                                              |

##### RadioInput.Option

| Props        | Type                  | Required | Values | Default | Description                                                                                                                                                                                                                                                                     |
| ------------ | --------------------- | :------: | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`      | `string` \| `boolean` |    ✅    | -      | -       | The value identifying this `Option`                                                                                                                                                                                                                                             |
| `children`   | `node`                |    ✅    | -      | -       | Pass any react components to describe what the `Option` represents.                                                                                                                                                                                                             |
| `isDisabled` | `bool`                |    -     | -      | `false` | Radio `Option` automatically get the `isDisabled` state passed to the `Group` component. Only in cases where you would need force the `disabled` state of one of the `Option`s, you can pass this prop which will take precedence over the one passed to the `Group` component. |
| `isHovered`  | `bool`                |    -     | -      | `false` | Forces `Option` to be rendered in a hovered state. That's needed for cases when hovered appearance should be triggered by the parent component and not the `Option` itself. An `Option` is capable of handling it's own hovering without the need to pass this prop.            |

#### Invariants

1.  The `RadioInput.Group` must have at least one `RadioInput.Option` element as `children`
