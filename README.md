<h2 align="center">🎹 commercetools UI Kit 💅</h2>

<p align="center">
  <a href="https://github.com/commercetools/ui-kit"><img alt="Logo" src="https://raw.githubusercontent.com/commercetools/ui-kit/main/logo.png" /></a><br /><br />
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@commercetools-frontend/ui-kit"><img src="https://badgen.net/npm/v/@commercetools-frontend/ui-kit" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/ui-kit"><img src="https://badgen.net/npm/v/@commercetools-frontend/ui-kit/next" alt="Latest release (next dist-tag)" /></a> <a href="https://circleci.com/gh/commercetools/ui-kit"><img src="https://circleci.com/gh/commercetools/ui-kit.svg?style=shield&circle-token=477a5b4b825bc5a09b933d15054b99e57e3cbe73" alt="CI status" /></a> <a href="https://percy.io/commercetools-GmbH/merchant-center-application-kit"><img src="https://percy.io/static/images/percy-badge.svg" alt="This project is using Percy.io for visual regression testing" /></a>
<a href="https://bundlephobia.com/result?p=@commercetools-frontend/ui-kit"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/ui-kit" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/ui-kit/blob/main/LICENSE"><img src="https://badgen.net/github/license/commercetools/ui-kit" alt="GitHub license" /></a>
</p>
<p align="center">
  <i>✨ Component library based on our design system 🛠</i>
</p>

> If you are building **Custom Applications** for the Merchant Center, be sure to check out our [documentation](https://docs.commercetools.com/custom-applications)

> Interactive documentation of UI Kit components can be found in our [Storybook](https://uikit.commercetools.com/?path=/story/introduction--getting-started)

# Getting started

The UI Kit is a set of React components that follows commercetools [Design System](#design-system).

# Using individual packages

Each UI Kit component is published as a single NPM package under the scope `@commercetools-uikit`. This is useful if you only need a bunch of React components and do not want to have bigger bundle.

For example:

```js
import PrimaryButton from '@commercetools-uikit/primary-button';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { AngleDownIcon } from '@commercetools-uikit/icons';
```

# Using presets

If you plan to use more components, you can also use some of the [preset packages](https://github.com/commercetools/ui-kit/tree/main/presets) that group multiple packages together. This is useful to reduce the number of dependencies and imports.

For example:

```js
import { PrimaryButton } from '@commercetools-uikit/buttons';
import Spacings from '@commercetools-uikit/spacings';
```

## All-in-one

There is also a preset package that re-exports ALL UI Kit components: `@commercetools-frontend/ui-kit`.

> This package is also used for backwards compatibility after we started splitting up the components into single packages.

```js
import {
  PrimaryButton,
  Spacings,
  AngleDownIcon,
} from '@commercetools-frontend/ui-kit';
```

# Required peer dependencies

Each UI Kit package comes with some required [peer dependencies](https://docs.npmjs.com/files/package.json#peerdependencies) to be installed by the consumer.

Depending on which UI Kit packages you use, make sure to have the related peer dependencies installed.

Most of the time the required peer dependencies include `react`, `react-dom`, `react-intl`.

# Design System

> A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.

Design Systems are becoming more and more useful nowadays, as design and technology strive to find a perfect balance between them.

The UI Kit project is the home of commercetools Design System and its implementation in the form of React components.

The package `@commercetools-uikit/design-system` exposes the design variables and tokens used to define design rules and constraints for commercetools products.

## Importing css variables in css files

You will need a [postcss-import](https://github.com/postcss/postcss-import) plugin, and a postcss variable plugin: either [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) or [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables) would work.

```css
@import '@commercetools-uikit/design-system/materials/custom-properties.css';

.container {
  padding: var(--spacing-l);
}
```

```js
// wherever you process your CSS
postcss([postcssImportPlugin(), postcssCustomProperties()]);
```

### Using `postcss-custom-properties` and `importFrom`

The css variables can also be injected using [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties), removing the need to import them directly inside your css files.

```css
/* no import required! */
.container {
  padding: var(--spacing-l);
}
```

```js
// wherever you process your CSS
postcss([
  postcssCustomProperties({
    preserve: false,
    importFrom: require.resolve(
      '@commercetools-uikit/design-system/materials/custom-properties.css'
    ),
  }),
]);
```

## Accessing JavaScript variables and design tokens

You can also access the JavaScript variables like this

```js
import { customProperties } from '@commercetools-uikit/design-system';

const primary = customProperties.colorPrimary;
```

> Please look at the [`custom-properties.ts`](https://github.com/commercetools/ui-kit/blob/main/design-system/src/custom-properties.ts) itself to inspect which variables are available.
