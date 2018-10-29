# Playground

The playground offers a way to try out the final bundle in a web application, just like consumers of `@commercetools-frontend/ui-kit` would.

## Staring the playground

As the playground uses the produced bundle of UI Kit, you need to continuously build the bundle using `yarn build:watch`.

Then you can start the playground in another terminal with `yarn playground`.

## Building the playground

Building the playground should not be necessary, so there is no script/config for it.

## Using `@commercetools-frontend/ui-kit` inside the playground.

This package (`@commercetools-frontend/ui-kit`) is aliased to `ui-kit` inside the playground. So you can do the following to import from UI Kit:

```js
import { PrimaryButton, MoneyInput, i18n } from 'ui-kit';
```

## Does the playground use the CJS or the ESM build?

The playground uses the ESM build (`dist/ui-kit.esm.js`).
