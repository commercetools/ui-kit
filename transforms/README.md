## Codemods

Make sure to have `jscodeshift` installed globally.

```bash
$ yarn global add jscodeshift
$ npm -g install jscodeshift
```

#### Example usage

```bash
$ jscodeshift -t  @commercetools-frontend/transforms/icon-theme-to-color.js src/
```

Useful options:

- `-d`: dry-run
- `-p`: print the output for comparison (use it together with `-d`)

## Included scripts

#### `icon-theme-to-color`

Renames the prop `theme` to `color` for all UI-Kit icons.

```bash
$ jscodeshift -t @commercetools-frontend/transforms/icon-theme-to-color.js <path>
```
