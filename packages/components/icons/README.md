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

### Usage

```js
import InlineSvg from '@commercetools-uikit/icons/inline-svg';

const svg = `<svg><path ... /></svg>`;

const App = () => <InlineSvg data={svg} color="primary" size="medium" />;
```

The component accepts the same props as the `<*Icon>` components `color` and `size`. Additionally it requires the `data` prop, which is the actual SVG content.

### XSS protection

The `data` passed to the component is run through a DOM sanitizer to prevent unwanted XSS injections.

### Where to use

This component can be used whenever the icon has to be rendered dynamically on runtime. For example in the Merchant Center this can be the case for the navigation menu icons, etc.

## Leading Icon

The leading icon is a an eye-catching visual element that should be used when an additional visual prominence is needed for a content section in the UI. The different colours in combination with the icons can be utilised to create certain categorisation of the elements in the UI.

The component is exported as a separate entry point:

```js
import LeadingIcon from '@commercetools-uikit/icons/leading-icon';
```

### Usage

```js
import LeadingIcon from '@commercetools-uikit/icons/leading-icon';
import { ExportIcon } from '@commercetools-uikit/icons';

const app = () => <LeadingIcon icon={<ExportIcon />} />;
```

### Properties

| Props        | Type           | Required | Values                                                       | Default   | Description                                                                                                                 |
| ------------ | -------------- | :------: | ------------------------------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `size`       | `string`       |          | '10', '20', '30', '40'                                       | '20'      | Specifies the icon size                                                                                                     |
| `color`      | `string`       |          | 'accent', 'brown', 'neutral', 'purple', 'turquoise', 'white' | 'neutral' | Specifies the icon's background color and fill color                                                                        |
| `isInverted` | `boolean`      |          | `true`, `false`                                              | `false`   | Specifies whether the icon has a light background and dark fill (`false`), or dark background and light fill (`true`)       |
| `icon`       | `ReactElement` |          | UI Kit `<Icon/>` component                                   |           | Icon that is displayed within the component, you must supply a child icon with with this prop or the `svg` prop             |
| `svg`        | `string`       |          | A custom SVG to display                                      |           | Icon that is displayed using the `InlineSvg` component, you must supply a child icon with with this prop or the `icon` prop |

### Where to use

This component can be used wherever it is necessary to display a themed icon.

## Custom Icon

This component is meant to be used whenever consumers need to render an icon which is not part of the [ui-kit icon set](https://uikit.commercetools.com/?path=/story/components-icons--all-icons).

In order to keep visual consistency, we want to keep the available sizes of all icons equal. Bear in mind we would expect custom SVG icons to not contain size attributes so it can be controlled based on the components size attribute.

The component is exported as a separate entry point:

```js
import CustomIcon from '@commercetools-uikit/icons/custom-icon';
```

### Usage

```js
import CustomIcon from '@commercetools-uikit/icons/custom-icon';
import { YourCustomIcon } from './your-custom-icon-directory';

const app = () => <Icon icon={<YourCustomIcon />} />;
```

### Properties

| Props       | Type                                                      | Required | Values                                              | Default | Description                                     |
| ----------- | --------------------------------------------------------- | :------: | --------------------------------------------------- | ------- | ----------------------------------------------- |
| `size`      | `string`                                                  |          | '10', '20', '30', '40'                              | '20'    | Specifies the icon size                         |
| `icon`      | `union`<br/>Possible values:<br/>`, ReactElement, string` |    -     | A `ReactNode` or `string` that display a custom SVG |         | Icon displayed as a child of this component     |
| `hasBorder` | `boolean`                                                 |          | `true`, `false`                                     | `false` | Specifies whether the element displays a border |
