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

When you use a tooltip with a disabled element, you should define the style `pointer-events: none` to the disabled element to stop it from capturing events.

The Button components from `ui-kit` already support this functionality.

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

The tooltip applies event listeners (`onMouseOver`, `onMouseLeave`, `onFocus`, and `onBlur`) to a wrapping `div` component around the children element. By default, this wrapper is displayed with style `inline-block`. If you want to customize this behaviour, then you can pass in a custom element.

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

### Customizing the tooltip body

You can customize the look and feel of the tooltip body by passing in a custom `BodyComponent`

```js
const Body = styled.div`
  color: red;
`;

<Tooltip title="Delete" components={{ BodyComponent: Body }}>
  <button>Submit</button>
</Tooltip>;
```

### Customizing where the portal is rendered

When you are dealing with virtualized components, it can be useful to render the tooltip into another part of the document. You can define a `TooltipWrapperComponent` to do this.

```js
const Portal = props => ReactDOM.createPortal(props.children, document.body);

<Tooltip title="Delete" components={{ TooltipWrapperComponent: Portal }}>
  <button>Submit</button>
</Tooltip>;
```

### Conditionally displaying tooltips

There may be cases when you only want to enable the display of a tooltip under a certain condition. In these cases, you may want to use the `off` prop.

In the following example, the tooltip text only appears on hover when the button is disabled.

```js
<Tooltip
  off={props.isDisabled}
  title="You do not have permission to perform this action"
>
  <button disabled={props.isDisabled}>Submit</button>
</Tooltip>
```

#### Properties

| Props                  | Type     | Required | Values                                                                                                                                       | Default | Description                                                                                     |
| ---------------------- | -------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `off`                  | `bool`   |    -     | -                                                                                                                                            | false   | Whether or not the tooltip opens and closes as a result of event listeners.                     |
| `isOpen`               | `bool`   |    -     | -                                                                                                                                            | -       | If passed, the tooltip's open and closed states are controlled by this prop                     |
| `closeAfter`           | `number` |    -     | -                                                                                                                                            | 0       | Delay (in milliseconds) between the end of the user interaction, and the closing of the tooltip |
| `onOpen`               | `func`   |    -     | -                                                                                                                                            | -       | Called when the tooltip is opened                                                               |
| `onClose`              | `func`   |    -     | -                                                                                                                                            | -       | Called after the tooltip is closed                                                              |
| `position`             | `object` |    -     | `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-end`, `bottom-start`, `left`, `left-start`, `left-end` | `top`   | How the tooltip is positioned relative to the child element                                     |
| `horizontalConstraint` | `object` |    -     | `xs`, `s`, `m`, `l`, `xl`, `scale`                                                                                                           | `scale` | Horizontal size limit of the tooltip                                                            |
| `children`             | `node`   |    ✅    | -                                                                                                                                            | -       | Content rendered within the tooltip                                                             |
| `components`           | `object` |    -     | `WrapperComponent`, `BodyComponent`                                                                                                          | -       | If passed, the tooltip will wrap your component with this element                               |
| `styles.body`          | `object` |    -     | -                                                                                                                                            | -       | If passed, these styles will be spread onto the div surrounding the tooltip body                |
