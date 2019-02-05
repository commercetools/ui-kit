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

When you use a tooltip with a disabled element, you need to wrap element in a div, as
disabled elements do not fire events.

```js
<Tooltip
  position="left"
  label="You do not have permission to delete the database"
>
  <div style={{ cursor: 'not-allowed' }}>
    <button
      disabled
      onClick={deleteDb()}
      style={{
        pointerEvents: 'none',
      }}
    >
      Delete production database
    </button>
  </div>
</Tooltip>
```

#### Working with custom child elements

The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its properties to the underlying DOM element.

```js
const MyComponent = props => {
  // We spread the properties to the underlying DOM element.
  return <div {...props}>Bin</div>;
};

<Tooltip title="Delete">
  <MyComponent />
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
