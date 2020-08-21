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
