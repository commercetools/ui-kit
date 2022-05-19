# ViewSwitcher

## Description

ViewSwitchers allow users to toggle between two or more different views of the same, similar or related content items within the same space on screen.

## When to use

ViewSwitchers are frequently used to let users toggle between different formatting's, like with a grid view and a table view.

They are also often used to narrow content groups.

For example, use a content switcher if you have a list, such as “Import-results” and you want to divide it into views such as “All”, “Failed”, and “Success”.

## When not to use

Do not use the ViewSwitcher as Tabs
Tabs should be used when the content on the page is divided into related sections but without any overlap.
See tabs as separate of content.

Do not use the ViewSwitcher as Toggle
Toggles are used for “yes/no” or “on/off” binary decisions.

## Do's and Don'ts“

- If you use an icon within the ViewSwitcher, each switch needs to have an icon.
- No colored icons are allowed. Only color-solid (black)
- Do not use two lines of text in one switch field.

## Installation

```
yarn add @commercetools-uikit/view-switcher
```

```
npm --save install @commercetools-uikit/view-switcher
```

Additionally install the peer dependencies (if not present)

```
yarn add react
```

```
npm --save install react
```

## Usage

```jsx
import ViewSwitcher from '@commercetools-uikit/view-switcher';

const Example = () => (
  <ViewSwitcher.Group
    defaultSelected="Button 2"
    onChange={(value) => console.log(value)}
  >
    <ViewSwitcher.Button isDisabled value="button 1">
      View 1
    </ViewSwitcher.Button>
    <ViewSwitcher.Button value="button 2">View 2</ViewSwitcher.Button>
    <ViewSwitcher.Button value="button 3">View 3</ViewSwitcher.Button>
  </ViewSwitcher.Group>
);

export default Example;
```

## Properties

### ViewSwitcher.Group

| Props             | Type                                                 | Required | Default | Description                                                                                             |
| ----------------- | ---------------------------------------------------- | :------: | ------- | ------------------------------------------------------------------------------------------------------- |
| `isCondensed`     | `boolean`                                            |          |         | Indicates that the view switcher can be reduced to save space                                           |
| `children`        | `ReactNode`                                          |    ✅    |         | Pass one or more `ViewSwitcher.Button` components                                                       |
| `onChange`        | `Function`<br/>[See signature.](#signature-onChange) |          |         | Will be triggered whenever a `ViewSwitcher.Button` is clicked. Called with the ViewSwitcherButton value |
| `defaultSelected` | `string`                                             |    ✅    |         | Indicates the default selected button                                                                   |

## Signatures

### Signature `onChange`

```ts
(value: string) => void
```

### ViewSwitcher.Button

| Props        | Type                                                | Required | Default | Description                                                  |
| ------------ | --------------------------------------------------- | :------: | ------- | ------------------------------------------------------------ |
| `isDisabled` | `boolean`                                           |          |         | If `true`, indicates that the button is in a disabled state. |
| `children`   | `ReactNode`                                         |    ✅    |         | Indicates the label of the `ViewSwitcher.Button`.            |
| `onClick`    | `Function`<br/>[See signature.](#signature-onClick) |          |         | Will be triggered whenever a button is clicked.              |
| `value`      | `string`                                            |    ✅    |         | The value identifying this `ViewSwitcher.Button`.            |

## Signatures

### Signature `onClick`

```ts
(value: string) => void
```

## Invariants

1.  The `ViewSwitcher.Group` must have at least one `ViewSwitcher.Button` element as `children`
