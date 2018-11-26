# Icons

## Usage

```js
import { Icons } from '@commercetools-frontend/ui-kit';

<Icons.Add />;
```

#### Description

You can find a list of all available icons in the UIKit.

#### How to add new icons

1.  add the SVG file you got from the designer to the [`svg`](./svg) folder
2.  run the script `node scripts/generate-icon-exports.js` from the project root folder

#### Properties

| Props   | Type     | Required | Values                                            | Default | Description                                                                                            |
| ------- | -------- | :------: | ------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `size`  | `string` |          | 'small', 'medium', 'big', 'scale'                 | 'big'   | Specifies the icon size (if `scale` is selected, the dimensions will scale according with the parents) |
| `theme` | `string` |          | 'black', 'grey', 'blue', 'green', 'orange', 'red' | 'black' | Specifies the icon theme                                                                               |

#### Where to use

Main use cases are:

- Buttons

  ```jsx
  <FormattedMessage {...messages.add}>
    {label => (
      <SecondaryButton
        onClick={() => {}}
        iconLeft={<Icons.Add />}
        label={label}
      />
    )}
  </FormattedMessage>
  ```

- Icon Buttons

  ```jsx
  <FormattedMessage {...messages.add}>
    {label => (
      <IconButton onClick={() => {}} icon={<Icons.Add />} label={label} />
    )}
  </FormattedMessage>
  ```
