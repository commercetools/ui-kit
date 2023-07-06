## Codemods

Make sure to have `jscodeshift` installed globally.

```bash
$ yarn global add jscodeshift
$ pnpm add --global jscodeshift
$ npm -g install jscodeshift
```

#### Example usage

```bash
$ jscodeshift -t  @commercetools-frontend/transforms/v10/icon-theme-to-color.js src/
```

Useful options:

- `-d`: dry-run
- `-p`: print the output for comparison (use it together with `-d`)

## Included scripts

#### `icon-theme-to-color`

Renames the prop `theme` to `color` for all UI-Kit icons.

#### `icon-element-type-to-as`

Renames the prop `elementType` to `as` for all Text components.

```bash
$ jscodeshift -t @commercetools-frontend/transforms/v10/icon-theme-to-color.js <path>
```
