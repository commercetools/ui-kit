# Storybook

This repository contains all storybook related configuration.

## Development

Install all dependencies by running the following command in your terminal after entering the directory:

```
yarn
```

> You need to have `Node 18` and `yarn` installed on your system.

After all dependencies are installed you can start the development environment by running the following command:

```
yarn start
```

This will open storybook in your browser. You can now start adding new components or modifying existing ones.

## Creating a build

To create a storybook production-build, run the following command:

```
yarn run build
```

The build-files will end up in `./storybook-static` and can be served _as-is_.

## Testing the build locally

To serve a local production build you can run the following command, it will create the production build and serve it:

```
yarn run storybook-static
```
