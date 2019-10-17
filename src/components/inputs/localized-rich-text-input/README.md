# LocalizedRichTextInput

### THIS COMPONENT IS IN BETA!

Please be aware that this component may be subject to upcoming breaking changes as it's still in active development.

---

#### Description

A controlled text input component for localized rich text input with validation
states.

## Usage

```js
import { LocalizedRichTextInput } from '@commercetools-frontend/ui-kit';

const Input = props => {
    return (
      <LocalizedRichTextInput
        value={{
          en: '',
          de: ''
        }}
        onChange={event => console.log('event.target.value', event.target.value)}
      />;
  )
}
```
