## Codemods

Make sure to have `jscodeshift` installed globally.

```bash
$ yarn global add jscodeshift
$ npm -g install jscodeshift
```

#### Example usage

```bash
$ jscodeshift -t transforms/react-component-rename-props.js src/
```

Useful options:

- `-d`: dry-run
- `-p`: print the output for comparison (use it together with `-d`)

## Included scripts

#### `react-rename-component-props`

Renames the props of a list of components acording to a mapping.
Edit the `propertyRenameMap` and the `componentNamesToRefactor` constants to specify which properties to remap for which component(s).

```bash
$ jscodeshift -t transforms/react-component-rename-props.js <path>
```
