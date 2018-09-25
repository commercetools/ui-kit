# HoCs: withMouseDownState

## Usage

```js
import { withMouseDownState } from '@commercetools-frontend/ui-kit';

const FooElement = props => (
  <div onMouseDown={props.handleMouseDown} onMouseUp={props.handleMouseUp}>
    {props.isMouseDown ? 'Mouse is down' : 'Mouse is up'}
  </div>
);

export default withMouseDownState(FooElement);
```

#### Description

Manages the state of `isMouseDown` injecting it into a wrapped component.
Moreover, the handlers injected must be used to update the state in the HoC.

#### Properties

| Props             | Type   | Required | Values | Default | Description                                                      |
| ----------------- | ------ | :------: | ------ | ------- | ---------------------------------------------------------------- |
| `isMouseDown`     | `bool` |    ✅    | -      | -       | Indicates if the mouse is currently down on the element          |
| `handleMouseDown` | `func` |    ✅    | -      | -       | Callback function to update the state whenever the mouse is down |
| `handleMouseUp`   | `func` |    ✅    | -      | -       | Callback function to update the state whenever the mouse is up   |

Main Functions and use cases are:

- Icon buttons _example: icon needs change the theme whenever mouse is down_
