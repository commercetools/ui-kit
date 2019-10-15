# RichTextInput

### THIS COMPONENT IS IN BETA!

Please be aware that this component may be subject to upcoming breaking changes as it's still in active development.

---

#### Description

A controlled rich text input component for rich text with validation
states.

## Usage

```js
import { RichTextInput } from '@commercetools-frontend/ui-kit';

const html = '<p>hello world</p>';

const Input = props => {
  const [value, setValue] = React.useState(html);
    return (
      <RichTextInput
      value={value}
      onChange={event => { setValue(event.target.value)}
    />;
  )
}
```
