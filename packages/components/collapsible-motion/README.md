<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->
<!-- This file is created by the `yarn generate-readme` script. -->

# CollapsibleMotion

## Description

A component which allows building collapsible elements with an arbitrary height. The component can be controlled or uncontrolled, depending if the `isClosed` props is defined or not. A controlled component requires the `onToggle` prop additionally.

## Details

Animating a div from `height: 0` to `height: auto` is something the browser will refuse to do out of the box, because calculations of this animation would be expensive.
There are [many existing workaround](https://css-tricks.com/using-css-transitions-auto-dimensions/) which all have their different tradeoffs.

`CollapsibleMotion` uses a nice workaround which allows the browser to run this animation. `CollapsibleMotion` measures the resulting since and then animates between `height: 0` and the resulting size (at 99% of the animation). At the end of the animation, it sets the `height` back to `auto`.

This component also supports passing in a `minHeight` prop. By default this is 0.

Technically, we need to dynamically create the keyframes for this animation.

## Installation

```
yarn add @commercetools-uikit/collapsible-motion
```

```
npm --save install @commercetools-uikit/collapsible-motion
```

Additionally install the peer dependencies (if not present)

```
yarn add react
```

```
npm --save install react
```

## Usage

```jsx
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';

const Example = () => (
  <CollapsibleMotion>
    {({ isOpen, toggle, containerStyles, registerContentNode }) => (
      <div>
        <button data-testid="button" onClick={toggle}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        <div data-testid="container-node" style={containerStyles}>
          <div data-testid="content-node" ref={registerContentNode}>
            Content
          </div>
        </div>
      </div>
    )}
  </CollapsibleMotion>
);

export default Example;
```

## Properties

| Props             | Type                                                 | Required | Default | Description                                                                                                                                                                                                                                                                                                                        |
| ----------------- | ---------------------------------------------------- | :------: | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`        | `Function`<br/>[See signature.](#signature-children) |    ✅    |         | A render function, called with the following named arguments: `isOpen` (boolean), `toggle` (function),&#xA;`containerStyles` (css-in-js object), `registerContentNode` (React reference to be used on the animated container).&#xA;<br/>&#xA;Siganture: `({ isOpen, containerStyles, toggle, registerContentNode }) => React.node` |
| `isClosed`        | `boolean`                                            |          |         |                                                                                                                                                                                                                                                                                                                                    |
| `onToggle`        | `Function`<br/>[See signature.](#signature-ontoggle) |          |         | A callback function called when the `toggle` function is called. This prop is required when the component is **controlled**.                                                                                                                                                                                                       |
| `minHeight`       | `number`                                             |          |         | The minimal height of the container being animated.                                                                                                                                                                                                                                                                                |
| `isDefaultClosed` | `boolean`                                            |          |         | The initial value to the internal toggle state `isOpen`.                                                                                                                                                                                                                                                                           |

## Signatures

### Signature `children`

```ts
(options: TRenderFunctionOptions) => ReactNode;
```

### Signature `onToggle`

```ts
() => void
```
