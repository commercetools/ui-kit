# Icons

## Description

All SVG icons are rendered as React components.

## Usage

```js
import { ExportIcon } from '@commercetools-uikit/icons';

<ExportIcon />;
```

## Properties

| Props   | Type     | Required | Values                                                                   | Default | Description                                                                                            |
| ------- | -------- | :------: | ------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------ |
| `size`  | `string` |          | 'small', 'medium', 'big', 'scale'                                        | 'big'   | Specifies the icon size (if `scale` is selected, the dimensions will scale according with the parents) |
| `color` | `string` |          | 'solid', 'neutral60', 'info', 'primary', 'primary40', 'warning', 'error' | 'solid' | Specifies the icon color                                                                               |

### Where to use

Main use cases are:

- Buttons

  ```jsx
  <SecondaryButton
    onClick={() => {}}
    iconLeft={<ExportIcon />}
    label={this.props.intl.formatMessage(messages.exportList)}
  />
  ```

- Icon Buttons

  ```jsx
  <IconButton
    onClick={() => {}}
    icon={<ExportIcon />}
    label={this.props.intl.formatMessage(messages.exportList)}
  />
  ```

## Inline SVG for rendering custom icons

If you need to render an SVG icon that is not part of the default set of icons, it's possible to render it using a special component `<InlineSvg>`.

The component is exported as a separate entry point:

```js
import InlineSvg from '@commercetools-uikit/icons/inline-svg';
```

The SVG data must be provided as an inline string.

```js
// OK
const svg = `<svg><path ... /></svg>`;

// NO
import svg from './cart.svg';
const svg = 'https://website.com/cart.svg';
```

### Usage

```js
import InlineSvg from '@commercetools-uikit/icons/inline-svg';

const svg = `<svg><path ... /></svg>`;

const App = () => <InlineSvg data={svg} color="primary" size="medium" />;
```

The component accepts the same props as the icon components `color` and `size`. Additionally it requires the `data` prop, which is the actual SVG content.

### XSS protection

The component is designed to prevent execution of unwanted `script` elements embedded into the `<svg>` document.

To do so, the SVG can be rendered in two different ways:

- as an `image`: the SVG content is base64 encoded and rendered as a DATA URI of an `<img>` HTML element.

- within a sandboxed `iframe`: the SVG document is rendered normally into the DOM but within a sandboxed `<iframe>`. This prevents any embedded `script` to be executed outside of the `<iframe>`.

You can choose either option by providing the `as` prop.

### Where to use

This component can be used whenever the icon has to be rendered dynamically on runtime. For example in the Merchant Center this can be the case for the navigation menu icons, etc.
