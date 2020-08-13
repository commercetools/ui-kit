# Readme generator

A package to generate README files for the React component packages.

## Prerequisites

Each package should have the following fragment files in a `docs` folder:

- `docs/usage-example.js`: a JS example for using the component.
- `docs/additional-info.md`: any additional information to be rendered AFTER the generated sections.

## Usage

> The package contains TypeScript file which are not transpiled. To execute the script, the package uses internally `ts-node` CLI, which is already installed in this repository.

```
yarn generate-readme packages/components/avatar
```
