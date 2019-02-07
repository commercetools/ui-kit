# Tooltip

#### Description

Tooltips display informative text when users hover over or focus on an element.

#### Usage

```js
<Tooltip
  position="left"
  label="If you buy a pizza, you will also get a free ice cream :)"
>
  <button onClick={orderPizza({ freeIceCream: 'yes please' })}>Submit</button>
</Tooltip>
```

#### Working with disabled child elements

When you use a tooltip with a disabled element, you should the style `pointer-events: none` to the disabled element to stop it from capturing events.

```js
<Tooltip
  position="left"
  label="You do not have permission to delete the database"
>
  <button
    disabled
    onClick={deleteDb()}
    style={{
      pointerEvents: 'none',
    }}
  >
    Delete production database
  </button>
</Tooltip>
```

#### Customizing the wrapper

The tooltip applies event listeners (`onMouseOver`, `onMouseLeave`, `onFocus`, and `onBlur`) to a wrapping component around the passed in component. By default, this wrapper is displayed with style `inline-block`. If you want to customize this behaviour, then you can pass in a custom wrapping element.

```js
const Wrapper = styled.div`
  display: block;
`;

const FullWidthButton = styled.button`
  display: block;
  width: 100%;
`;

<Tooltip title="Delete" components={{ WrapperComponent: Wrapper }}>
  <FullWidthButton>Submit</FullWidthButton>
</Tooltip>;
```

#### Properties

| Props                  | Type     | Required | Values                                                                                                                                       | Default | Description                                                                                     |
| ---------------------- | -------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `isOpen`               | `bool`   |    -     | -                                                                                                                                            | -       | If passed, the tooltip's open and closed states are controlled by this prop                     |
| `leaveDelay`           | `number` |    -     | -                                                                                                                                            | 0       | Delay (in milliseconds) between the end of the user interaction, and the closing of the tooltip |
| `onOpen`               | `func`   |    -     | -                                                                                                                                            | -       | Called when the tooltip is opened                                                               |
| `onClose`              | `func`   |    -     | -                                                                                                                                            | -       | Called after the tooltip is closed                                                              |
| `position`             | `object` |    -     | `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-end`, `bottom-start`, `left`, `left-start`, `left-end` | `top`   | How the tooltip is positioned relative to the child element                                     |
| `horizontalConstraint` | `object` |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale`                                                                                                           | `scale` | Horizontal size limit of the tooltip                                                            |
| `children`             | `node`   |    ✅    | -                                                                                                                                            | -       | Content rendered within the tooltip                                                             |
| `components`           | `object` |    -     | `WrapperComponent`                                                                                                                           | -       | If passed, the tooltip will wrap your component with this element                               |
