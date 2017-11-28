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

* [`Radio`](radio/README.md)
