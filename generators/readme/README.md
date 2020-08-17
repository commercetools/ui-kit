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
yarn generate-readme packages/components/avatar
```
