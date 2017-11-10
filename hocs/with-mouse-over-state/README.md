# HoCs: withMouseOverState

## Usage

```js
import withMouseOverState from 'ui-kit/hocs/with-mouse-over-state';

const FooElement = props => (
  <div onMouseOver={props.handleMouseOver} onMouseOut={props.handleMouseOut}>
    {props.isMouseOver ? 'Mouse is over' : 'Mouse is out'}
  </div>
);

export default withMouseOverState(FooElement);
```

#### Description

Manages the state of `isMouseOver` injecting it into a wrapped component.
Moreover, the handlers injected must be used to update the state in the HoC.

#### Properties

| Props             | Type   | Required | Values | Default | Description                                                      |
| ----------------- | ------ | :------: | ------ | ------- | ---------------------------------------------------------------- |
| `isMouseOver`     | `bool` |    ✅    | -      | -       | Indicates if the mouse is currently over the element             |
| `handleMouseOver` | `func` |    ✅    | -      | -       | Callback function to update the state whenever the mouse is over |
| `handleMouseOut`  | `func` |    ✅    | -      | -       | Callback function to update the state whenever the mouse is out  |

Main Functions and use cases are:

* Buttons and icons _example: icon needs change in theme whenever button is
  hovered_
