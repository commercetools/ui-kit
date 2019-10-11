# LocalizedRichTextInput

### THIS COMPONENT IS IN BETA!

Please be aware that this component may be subject to upcoming breaking changes as it's still in active development.

---

#### Description

A controlled text input component for localized rich text input with validation
states.

This component uses `slatejs` under the hood. This means that the `value` needs to be kept in slate format.
The `LocalizedRichTextInput` exposes two static helper functions to helper with transforming HTML values to and from slate format.

`LocalizedRichTextInput.deserialize(html)` can be used to turn HTML into slate format.
`LocalizedRichTextInput.serialize(value)` can be used to turn slate format into HTML.

## Usage

```js
import { LocalizedRichTextInput } from '@commercetools-frontend/ui-kit';

const Input = props => {
    return (
      <LocalizedRichTextInput
        value={{
          en: LocalizedRichTextInput.deserialize(''),
          de: LocalizedRichTextInput.deserialize('')
        }}
        onChange={event => console.log('event.target.value', event.target.value)}
      />;
  )
}
```
