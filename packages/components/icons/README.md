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

## Adding New Icons to UI-Kit

1. Add the icon's SVG to `packages/components/icons/src/raw-components` directory. Please follow the style conventions of existing icon files. File names are the icon's name and are kebab-case.
2. Utilize the component in the `packages/components/icons/src/components` directory. Please follow existing style and naming conventions of existing icons.
3. Add the raw SVG to `packages/components/icons/src/svg`.
4. Add the icon name, in PascalCase, to `transforms/v10/icons/icon-names.js`. Icon names are listed in alphabetical order.
5. Run `yarn generate-icons` to have the icon added to `packages/components/icons/src/index.js`. This file should never be edited manually.
