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

### Using Storybook as a component playground for local development

When building a new component, storybook can be used to provide a "component playground" that builds a story that is only displayed while running storybook locally. This can be very useful for quick iteration and debugging.

In order to specify that a story should only be available locally, add a `'local-dev'` tag to the `tags` option in the story's `meta` configuration.

For example

```tsx
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ExampleComponent> = {
  ...
  tags: ['local-dev'],
  ...
};

...

export default meta;
```

When the component is ready to be released, remove the `local-dev` tag for the story in order for it to show up in the production storybook documentation.

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
