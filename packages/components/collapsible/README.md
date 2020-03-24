# Collapsible

## Description

A render-prop component that holds a toggle state. The component can be controlled or uncontrolled, depending if the `isClosed` props is defined or not. A controlled component requires the `onToggle` prop additionally.

## Usage

```js
import Collapsible from '@commercetools-uikit/collapsible';

<Collapsible>
  {(options) => (
    <div>
      <div data-testid="openState">{options.isOpen ? 'open' : 'closed'}</div>
      <button data-testid="toggle" onClick={options.toggle}>
        Toggle
      </button>
    </div>
  )}
</Collapsible>;
```

## Properties

| Props             | Type       | Required | Values | Default | Description                                                                                                                  |
| ----------------- | ---------- | :------: | ------ | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `isDefaultClosed` | `boolean`  |    -     |        | false   |  The initial value to the internal toggle state `isOpen`.                                                                    |
| `children`        | `function` |    ✅    |        |         | A render function, called with the following named arguments: `isOpen` (boolean) and `toggle` (function).                    |
| `isClosed`        | `boolean`  |    -     |        |         | Determines the state of the toggle `isOpen`. Setting this prop will make the component **controlled**.                       |
| `onToggle`        | `function` |    -     |        |         | A callback function called when the `toggle` function is called. This prop is required when the component is **controlled**. |
