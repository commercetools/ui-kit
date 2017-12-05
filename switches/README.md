# Switches

This module contains switches such as radios and checkboxes. Please refer to the
sub modules.

## Usage

```js
import { Radio } from '@commercetools-local/ui-kit/switches';

<Radio.Group onChange={...} value="foo-radio-value">
   <Radio.Option value="foo-radio-value">
      What ever option
   </Radio.Option>
   <Radio.Option value="bar-radio-value" isDisabled={true}>
      Another option
   </Radio.Option>
</Radio.Group>
```

```js
import { Checkbox } from '@commercetools-local/ui-kit/switches';

<Checkbox value="foo-radio-value" onChange={..}>
  What ever option
</Checkbox>
<Checkbox value="bar-radio-value" isDisabled={true} onChange={..}>
  Another option
</Checkbox>
```

* [`Radio`](radio/README.md)
* [`Checkbox`](checkbox/README.md)
