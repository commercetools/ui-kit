# UI Kit

This module contains the official UI Kit for developing the MC UI.

https://uikit.commercetools.com/

## Install

```bash
$ npm install --save @commercetools-frontend/ui-kit
```

## Why UIKit

- Declarative components serving as a design guide
- Shared independently from the application's code base
- Used across different apps consumed by different teams
- Shared language between developers and designers

## Ownership

The UIKit is owned **by all developers and designers** working on the MC,
meaning that there it not a single person or a single team responsible for it.

There might be some assigned person(s) driving and coordinating its development
but eventually decisions are made together (see Contributing section below).

This implies that everyone should and is welcomed to contribute to it, just like
an OSS library.

## Export structure

The package main exports contains all the UI components.

```js
import {
  Text,
  TextInput,
  PrimaryButton,
  // etc.
} from '@commercetools-frontend/ui-kit';
```

There are some other exports that are grouped under different subfolders:

- `@commercetools-frontend/ui-kit/hocs`: contains useful Higher Order Components
- `@commercetools-frontend/ui-kit/materials`: contains low-level styles and components
