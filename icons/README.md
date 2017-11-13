# Icons

## Usage

```js
import { ExportIcon } from '@commercetools-local/ui-kit/icons';

<ExportIcon />;
```

#### Description

You can find a list of all available icons in the UIKit.

#### How to add new icons

1. add the SVG file you got from the designer to `@commercetools-local/ui-kit/icons/svg`
2. restart webpack (`npm start` in development)

#### Properties

| Props   | Type     | Required | Values                                            | Default | Description                                                                                            |
| ------- | -------- | :------: | ------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `size`  | `string` |          | 'small', 'big', 'scale'                           | 'big'   | Specifies the icon size (if `scale` is selected, the dimensions will scale according with the parents) |
| `theme` | `string` |          | 'black', 'grey', 'blue', 'green', 'orange', 'red' | 'black' | Specifies the icon theme                                                                               |

#### Where to use

Main use cases are:

* Buttons

  ```jsx
  <SecondaryButton
    onClick={() => {}}
    iconLeft={<ExportIcon />}
    label={this.props.intl.formatMessage(messages.exportList)}
  />;
  ```

* Icon Buttons
  ```jsx
  <IconButton
    onClick={() => {}}
    icon={<ExportIcon />}
    label={this.props.intl.formatMessage(messages.exportList)}
  />;
  ```
