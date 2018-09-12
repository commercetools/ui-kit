<h2 align="center">commercetools UIKit 💅</h2>
<p align="center">
  <i>Design System component library</i>
</p>

<h2 align="center">🚧 Under construction 🚧</h2>

## Install

```bash
$ npm install --save @commercetools-frontend/ui-kit

$ yarn add @commercetools-frontend/ui-kit
```

The package main exports contains all the UI components.

```js
import {
  Text,
  TextInput,
  PrimaryButton,
  // etc.
} from '@commercetools-frontend/ui-kit';
```

#### Importing CSS modules

In order to make use of our CSS variables defined in our CSS module files, you can require those files (from `/materials`) within your `.mod.css` files:

```css
@import '@commercetools-frontend/ui-kit/materials/spacings.mod.css';

.container {
  padding: var(--spacing-8);
}
```

> Please look into the package itself to inspect what variables are available (_documentation will be provided in the future_)

#### Importing SVG images

Similar to CSS modules, if you need to use one of our available SVG images, you can require them from `/images`.

```js
import UnexpectedErrorSVG from '@commercetools-frontend/ui-kit/images/maintenance/unexpected-error.svg';

<img src={UnexpectedErrorSVG} />;
```

> Please look into the package itself to inspect what images are available

## Motivation

- Declarative components serving as a design guide
- Shared independently from the application's code base
- Used across different apps consumed by different teams
- Shared language between developers and designers

## Documentation

_coming soon_
