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

#### Exports for backwards compatibility

Previously the library was consumed by reaching into the folders structure like

```js
import PrimaryButton from '@commercetools-frontend/ui-kit/buttons/primary-button';
```

In order to keep those imports backwards compatible, we provide the same old file structure in the `proxy-exports` folder, which then gets copied into `dist` at build time. Each folder only contains an `index.js` that points to the main export of the generated bundle.

> The `proxy-exports` folder will be removed in the future.

## Motivation

- Declarative components serving as a design guide
- Shared independently from the application's code base
- Used across different apps consumed by different teams
- Shared language between developers and designers

## Documentation

_coming soon_
