# Visual Testing Playground

This playground is used for visual regression testing. You should not need to directly modify this package. The `src/App.js` file will generate react-router routes for every file in `src/components` that ends in `.visualroute.js`. These routes are then used by `jest-puppeteer` to run our visual regression tests using percy snapshots.

## Creating your first visual route.

Create a file ending in `.visualroute` that exports two named exports: `routePath` and `component`. After doing this, you can run `yarn visual-testing-playground:build` and then `yarn visual-testing-playground:serve` to navigate to your new route. Once you have verified that your route is working correctly, you can now write a visual regression test using puppeteer.

## Starting the playground

As the playground uses the produced bundle of UI Kit, you need to continuously build the bundle using `yarn build:watch`.

Then you can start the playground in another terminal with `yarn visual-testing-playground:build` and `yarn visual-testing-playground:serve`.

## Building the playground

You can build the visual testing playground with the command `yarn visual-testing-playground:build`.

## Using `@commercetools-frontend/ui-kit` inside the playground.

This package (`@commercetools-frontend/ui-kit`) is aliased to `ui-kit` inside the playground and files ending in `.visualroute`. So you can do the following to import from UI Kit:

```js
import { PrimaryButton, MoneyInput, i18n } from 'ui-kit';
```

## Does the visual testing playground use the CJS or the ESM build?

The playground uses the ESM build (`dist/ui-kit.esm.js`).
