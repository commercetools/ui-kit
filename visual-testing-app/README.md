# Visual Testing App

This app is used for visual regression testing. You should not need to directly modify this package. The `src/App.js` file will generate react-router routes for every file in `src/components` that ends in `.visualroute.js`. These routes are then used by `jest-puppeteer` to run our visual regression tests using percy snapshots.

## Creating your first visual route.

Create a file ending in `.visualroute` that exports two named exports: `routePath` and `component`. After doing this, you can run `yarn visual-testing-app:build` and then `yarn visual-testing-app:serve` to navigate to your new route. Once you have verified that your route is working correctly, you can now write a visual regression test using puppeteer.

## Starting the app

As the app uses the produced bundle of UI Kit, you need to continuously build the bundle using `yarn build:watch`.

Then you can start the app in another terminal with `yarn visual-testing-app:build` and `yarn visual-testing-app:serve`.

## Building the app

You can build the visual testing app with the command `yarn visual-testing-app:build`.

## Using `@commercetools-frontend/ui-kit` inside the app.

This package (`@commercetools-frontend/ui-kit`) is aliased to `ui-kit` inside the app and files ending in `.visualroute`. So you can do the following to import from UI Kit:

```js
import {
  PrimaryButton,
  MoneyInput,
  i18n,
} from '@commercetools-frontend/ui-kit';
```

## Does the visual testing app use the CJS or the ESM build?

The app uses the ESM build (`dist/ui-kit.esm.js`).
