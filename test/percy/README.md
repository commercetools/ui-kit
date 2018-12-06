# Visual testing (with percy)

## Writing visual tests

### Description

We use visual regression testing to test the visuals of our components, and to ensure that we don't inadvertently introduce regressions.

### Usage

We import the components from bundle built with rollup, to ensure that we are testing the **production** version.

```js
import { PrimaryButton } from '../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../test/percy';

screenshot('PrimaryButton', () => (
  <Suite>
    <Case label="when disabled">
      <PrimaryButton disabled={true} label="Primary button" />
    </Case>
  </Suite>
));
```
