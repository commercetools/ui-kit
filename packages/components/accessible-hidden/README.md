# Accessible Hidden

#### Description

Visually hides a component, while keeping it accessible for screen readers and other assistive technology, as well as for testing purposes with tools such as react-testing-library and cypress.

#### Usage

```js
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';

<AccessibleHidden>
  <label htmlFor="sample-input">Sample Input</label>
</AccessibleHidden>;
```

#### Properties

This component only accepts the prop `children`, which is the component you want to hide.
