<!-- THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY. -->
<!-- This file is created by the `yarn generate-readme` script. -->

# QuickFilters

## Description

The `QuickFilters` component displays a selection of `Tag` components that represent the available filter actions.

## Installation

```
yarn add @commercetools-uikit/quick-filters
```

```
npm --save install @commercetools-uikit/quick-filters
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
import { useState } from 'react';
import QuickFilters from '@commercetools-uikit/quick-filters';

const App = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      label: 'Accepted',
      isActive: true,
    },
    {
      id: '2',
      label: 'Rejected',
      isActive: false,
    },
  ]);

  const onItemClick = (clickedItem) => {
    const updatedItems = items.map((item) => {
      return {
        ...item,
        isActive: item.id === clickedItem.id ? !item.isActive : false,
      };
    });
    setItems(updatedItems);
  };

  return <QuickFilters items={items} onItemClick={onItemClick} />;
};

export default App;
```

## Properties

| Props         | Type                                                                | Required | Default | Description                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------- | :------: | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`       | `Array: TQuickFiltersItem[]`<br/>[See signature.](#signature-items) |    ✅    |         | collection of quick filter items@param item.id unique identifier for the item.&#xA;@param item.label label to display&#xA;@param item.isActive the current active state of the item |
| `onItemClick` | `Function`<br/>[See signature.](#signature-onitemclick)             |    ✅    |         | callback fn, executed when an item is clicked                                                                                                                                       |

## Signatures

### Signature `items`

```ts
{
  /** unique identifier for the item. */
  id: string;
  /* label to display */
  label: string;
  /* the current active state of the item */
  isActive: boolean;
}
```

### Signature `onItemClick`

```ts
(item: TQuickFiltersItem) => void
```
