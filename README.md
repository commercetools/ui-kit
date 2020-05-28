<h2 align="center">🎹 commercetools UI Kit 💅</h2>

<p align="center">
  <a href="https://github.com/commercetools/ui-kit"><img alt="Logo" src="https://raw.githubusercontent.com/commercetools/ui-kit/master/logo.png" /></a><br /><br />
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@commercetools-frontend/ui-kit"><img src="https://badgen.net/npm/v/@commercetools-frontend/ui-kit" alt="Latest release (latest dist-tag)" /></a> <a href="https://www.npmjs.com/package/@commercetools-frontend/ui-kit"><img src="https://badgen.net/npm/v/@commercetools-frontend/ui-kit/next" alt="Latest release (next dist-tag)" /></a> <a href="https://circleci.com/gh/commercetools/ui-kit"><img src="https://circleci.com/gh/commercetools/ui-kit.svg?style=shield&circle-token=477a5b4b825bc5a09b933d15054b99e57e3cbe73" alt="CI status" /></a> <a href="https://percy.io/commercetools-GmbH/merchant-center-application-kit"><img src="https://percy.io/static/images/percy-badge.svg" alt="This project is using Percy.io for visual regression testing" /></a>
<a href="https://bundlephobia.com/result?p=@commercetools-frontend/ui-kit"><img src="https://badgen.net/bundlephobia/minzip/@commercetools-frontend/ui-kit" alt="Minified + GZipped size" /></a> <a href="https://github.com/commercetools/ui-kit/blob/master/LICENSE"><img src="https://badgen.net/github/license/commercetools/ui-kit" alt="GitHub license" /></a>
</p>
<p align="center">
  <i>✨ Component library based on our design system 🛠</i>
</p>

> If you are building **Merchant Center Applications**, be sure to check out our [application-kit](https://github.com/commercetools/merchant-center-application-kit)

## Installation

```bash
$ yarn add @commercetools-frontend/ui-kit

# or

$ npm install --save @commercetools-frontend/ui-kit
```

### Required peer dependencies

UI Kit comes with some [peer dependencies](https://docs.npmjs.com/files/package.json#peerdependencies) which are required to be available in any project consuming it. These include but may not be limited to: `moment`, `moment-timezone`, `react`, `react-dom`, `react-intl` and `react-router-dom`. An up-to-date list with their respective version ranges can be found in the [package.json](https://github.com/commercetools/ui-kit/blob/master/package.json). Please make sure all packages are installed within your application for UI Kit to be able to work as expected.

### Importing

The package's main export contains all UI components.

```js
import {
  Text,
  TextInput,
  PrimaryButton,
  // etc.
} from '@commercetools-frontend/ui-kit';
```

#### Importing CSS variables

When you are developing your application using UI Kit components, chances you want to use the same design tokens as our design system. We provide them through both **CSS variables** and **JavaScript variables**.

<details>
<summary>Show details</summary>

We expose the **CSS variables** from the `@commercetools-uikit/design-system/materials/custom-properties.css` file.

**Importing css variables in css files**

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

**Using postcss-custom-properties and importFrom**

The ui-kit css variables can also be injected using [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties), removing the need to import them directly inside your css files.

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

**Accessing JavaScript variables and design tokens**

You can also access the JavaScript variables like this

```js
import { customProperties } from '@commercetools-frontend/ui-kit';

const primary = customProperties.colorPrimary;
```

> Please look at the [file](design-system/materials/custom-properties.js) itself to inspect which variables are available (_documentation will be provided in the future_).

</details>

## Motivation

- Declarative components serving as a design guide
- Shared independently from the application's code base
- Used across different apps consumed by different teams
- Shared language between developers and designers

## Documentation and Storybook

Available at https://uikit.commercetools.com.
