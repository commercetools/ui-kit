# Visual Testing App

This app is used for visual regression testing. You should not need to directly modify this package. The `src/App.jsx` file will generate react-router routes for every file in `src/components` that ends in `.visualroute.jsx`. These routes are then used by `jest-puppeteer` to run our visual regression tests using Percy snapshots.

## Adding a new test

Create a file ending in `.visualroute.jsx` that has two named exports: `routePath` and `component`. We recommend to add the file next to the component you are testing.

Example:

```jsx
import { Avatar } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/avatar';

export const component = () => (
  <Suite>
    <Spec label="when gravatar hash is known">
      <Avatar
        gravatarHash="205e460b479e2e5b48aec07710c08d50"
        firstName="John"
        lastName="Doe"
        size="s"
      />
    </Spec>
  </Suite>
);
```

Note that we import the components using the main preset `@commercetools-frontend/ui-kit`. This is to ensure that the bundled packages work correctly.
At the same time it also means that you need to build the packages before starting the visual testing application. From the workspace root, run `pnpm build` or `pnpm build:watch`.

## Starting the visual testing application

You can start the application in development mode with the command `pnpm start`.

The application main page shows a list of all available routes, so you can easily navigate to them.

## Building the visual testing application

You can also start the application in production mode. This is the preferred way to run the visual tests on CI.

Build the application with `pnpm build` and serve the production bundles with `pnpm preview`.
