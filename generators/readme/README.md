# Readme generator

A package to generate README files for the React component packages.

## Prerequisites

Each package should have the following fragment files in a `docs` folder:

- `docs/usage-example.js`: a JS example for using the component.
- `docs/additional-info.md`: (_optional_) any additional information to be rendered AFTER the generated sections.
- `docs/description.md`: (_optional_) the description of the package, useful if you need to use Markdown syntax. If not provided, it falls back to the `package.json` description field.

## Usage

> The package contains TypeScript file which are not transpiled. To execute the script, the package uses internally `ts-node` CLI, which is already installed in this repository.

```
pnpm generate-readme packages/components/avatar
```

## Prop Types documentation

The prop types declarations of the main component exported by the package are automatically parsed and transformed into a Markdown table. To do that we rely on the `react-docgen` library.

By default, the main component is picked assuming that the file name is the same name as the package folder, located in the `./src` folder. If the file is in a different location or does not match the package folder name, you can provide the path to the component file by adding a `{ "readme": { "componentPaths": ["./src/..."] } }` to the `package.json`.

To show more information about each prop type, it is recommended to define JS Doc comments on each prop type.

Nested prop types, for example arrays, or array of objects, etc. are transformed into multiple table rows, using a special syntax notation. This is useful to list each property of nested objects and provide more detailed information about each one of them.

The syntax notation includes:

- `.` object
- `[]` array
- `<>` union
- `[].` array of objects
- `[]<>` array of unions
- `[]<>.` array of union object

and so on.

### Defining default values for nested objects

A React component accepts a `defaultProps` static property, which can be used to assign default values to certain props. However, this is only valid for shallow values.
For nested values there is no way to provide default values.

To make this possible for documentation purposes, we introduced a special syntax embedded in the JS Doc comment, which can be used to declare a default value of nested objects.

The embedded syntax is: `@@defaultValue@@: <value>`.

```js
/**
 * List the abilities of this Avenger.
 */
abilities: PropTypes.arrayOf(
  PropTypes.shape({
    /**
     * The name of the ability.
     */
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    /**
     * Set this to `true` to mark this ability as new.
     *
     * @@defaultValue@@: false
     */
    isNew: PropTypes.bool
  })
).isRequired,
```

We recommend to define that in a new line from the normal description.
