# RichTextInput

#### Description

A controlled rich text input component for rich text with validation
states.

This component uses `slatejs` under the hood. This means that the `value` needs to be kept in slate format.
The `RichTextInput` exposes two static helper functions to helper with transforming HTML values to and from slate format.

`RichTextInput.deserialize(html)` can be used to turn HTML into slate format.
`RichTextInput.serialize(value)` can be used to turn slate format into HTML.

## Usage

```js
import { RichTextInput } from '@commercetools-frontend/ui-kit';

const html = '<p>hello world</p>';
const slateValue = RichTextInput.deserialize(html);

const Input = props => {
  const [value, setValue] = React.useState(slateValue);
    return (
      <RichTextInput
      value={value}
      onChange={event => { setValue(event.target.value)}
    />;
  )
}
```
