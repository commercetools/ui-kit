# RadioInput

## Description

A `RadioInput` represents a group of options where only one option can be selected at a time.
The exported component contains a `RadioInput.Group` and `RadioInput.Option` components, with the `RadioInput.Group` component
being the wrapped around the list of `RadioInput.Option`s.

Most of the props should be assigned to the `RadioInput.Group` component, which internally forwards them
to each `RadioInput.Option` component. This is mostly to avoid passing a lot of props to each `RadioInput.Option` component.

## Usage

```js
import RadioInput from '@commercetools-uikit/radio-input';

<RadioInput.Group onChange={...} name="fruits" value="apples">
  <RadioInput.Option value="apple">
    <Spacings.Inline alignItems="center">
      <div>🍎</div>
      Apple
    </Spacings.Inline>
  </RadioInput.Option>
  <RadioInput.Option value="banana">
    <Spacings.Inline alignItems="center">
      <div>🍌</div>
      Banana
    </Spacings.Inline>
  </RadioInput.Option>
  <RadioInput.Option
    value="pineapple"
    additionalContent='Lorem ipsum dolor sit amet, consetetur sadipscing elitr'
  >
    <Spacings.Inline alignItems="center">
      <div>🍍</div>
      Pineapple
    </Spacings.Inline>
  </RadioInput.Option>
</RadioInput.Group>
```

## Properties

### RadioInput.Group

| Props                  | Type                  | Required | Values                        | Default          | Description                                                                                                                                                   |
| ---------------------- | --------------------- | :------: | ----------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `string`              |    -     | -                             | -                | Used as HTML `id` property for the radion `RadioInput.Group`. Each `RadioInput.Option` will also get an `id` with an index number appended, to make it unique |
| `name`                 | `string`              |    -     | -                             | -                | Used as HTML `name` property for each `RadioInput.Option`                                                                                                     |
| `value`                | `string`              |    ✅    | -                             | -                | Value of the selected radio `RadioInput.Option`                                                                                                               |
| `onChange`             | `func`                |    -     | -                             | -                | Called with the new value. Required when input is not read only. Parent should pass it back as `value`                                                        |
| `onBlur`               | `func`                |    -     | -                             | -                | Called when an `RadioInput.Option` is blurred                                                                                                                 |
| `onFocus`              | `func`                |    -     | -                             | -                | Called when an `RadioInput.Option` is focused                                                                                                                 |
| `isDisabled`           | `bool`                |    -     | -                             | `false`          | Indicates that all `RadioInput.Option`s cannot be used (e.g not authorised, or changes not saved)                                                             |
| `isReadOnly`           | `bool`                |    -     | -                             | `false`          | Indicates that all `RadioInput.Option`s are displaying read-only content                                                                                      |
| `hasError`             | `bool`                |    -     | -                             | -                | Indicates the radio `RadioInput.Option` has an error                                                                                                          |
| `hasWarning`           | `bool`                |    -     | -                             | -                | Indicates the radio `RadioInput.Option` has a warning                                                                                                         |
| `horizontalConstraint` | `string`              |    -     | `m` \| `l` \| `xl` \| `scale` | `scale`          | Horizontal size limit of the radio `RadioInput.Group` (only available in `stack` direction)                                                                   |
| `direction`            | `string`              |    -     | `stack` \| `inline`           | `stack`          | Rendering direction of the radio `RadioInput.Option`s                                                                                                         |
| `directionProps`       | `object`              |    -     | -                             | `{ scale: "m" }` | Passes props of the `Spacings.Stack` or `Spacings.Inline`, dependeing on the chosen direction                                                                 |
| `children`             | `node`                |    ✅    | -                             | -                | At least one `RadioInput.Option` component or another node (mixed children are allowed)                                                                       |
| `value`                | `string` \| `boolean` |    -     | -                             | -                | The selected value of one of the `RadioInput.Option`s                                                                                                         |

### RadioInput.Option

| Props                | Type                  | Required | Values | Default | Description                                                                                                                                                                                                                                                                                                                                              |
| -------------------- | --------------------- | :------: | ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`              | `string` \| `boolean` |    ✅    | -      | -       | The value identifying this `RadioInput.Option`                                                                                                                                                                                                                                                                                                           |
| `children`           | `node`                |    ✅    | -      | -       | Pass any react components to describe what the `RadioInput.Option` represents. NOTE that the children components are wrapped into a `Text.Body`, which applies a `secondary` tone in case the `RadioInput` is disabled. If you have a `Text` component within the children, make sure to apply the `secondary` tone to it in case of `isDisabled` state. |
| `isDisabled`         | `bool`                |    -     | -      | `false` | Radio `RadioInput.Option` automatically gets the `isDisabled` state passed to the `RadioInput.Group` component. Only in cases where you would need to force the `disabled` state of one of the `RadioInput.Option`s, you can pass this prop which will take precedence over the one passed to the `RadioInput.Group` component.                          |
| `isHovered`          | `bool`                |    -     | -      | `false` | Forces `RadioInput.Option` to be rendered in a hovered state. That's needed for cases when hovered appearance should be triggered by the parent component and not the `RadioInput.Option` itself. An `RadioInput.Option` is capable of handling it's own hovering without the need to pass this prop.                                                    |
| `components.wrapper` | `function`            |    -     | -      | -       | Pass a function that receives one argument and returns a react element. The function will be called by passing the `RadioInput.Option` as an argument and the resulting react element will be rendered. This can be used to add a controlled `ToolTip` around individual `RadioInput.Option`s.                                                           |
| `additionalContent`  | `node`                |    -     | -      | -       | Pass any react component or a string to describe what the additional content on `RadioInput.Option` should represent. This is useful when radio option has additional children that need to be rendered as contents on the `RadioInput.Option`.                                                                                                          |

## Invariants

1.  The `RadioInput.Group` must have at least one `RadioInput.Option` element as `children`
