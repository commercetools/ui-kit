# StylesProvider

_This is an **experimental** component and might change in the future. Use with caution!_

## Description

Applies some global styles according to our design system conventions. This component should be rendered as one of the first components in our application tree.

## Usage

```js
import { StylesProvider } from '@commercetools-frontend/ui-kit';
```

## Properties

| Props          | Type               | Required | Values | Default | Description                                                                                      |
| -------------- | ------------------ | :------: | ------ | ------- | ------------------------------------------------------------------------------------------------ |
| `baseFontSize` | `PropTypes.string` |    -     | -      | `1rem`  | Defines the font size baseline from which the `rem` font sizes of the application are based from |
| `children`     | `PropTypes.node`   |    ✅    | -      | -       |                                                                                                  |
