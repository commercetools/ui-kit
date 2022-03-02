---
'@commercetools-uikit/radio-input': patch
---

In case you need to render additional information to a radio option label, we recommend now to use a new prop `additionalContext` instead of rendering everything in the `<RadioOption>`'s `children`. This ensures that the radio input and the label are correctly aligned.
// Before
```js
<RadioInput.Option>
  <Spacings.Stack>
    <Text.Body>The label<Text.Body>
    <Text.Detail>Additional information</Text.Detail>
  </Spacings.Stack>
</RadioInput.Option>
```
// After
```js
<RadioInput.Option additionalContent={<Text.Detail>Additional information</Text.Detail>}>
  <Text.Body>The label<Text.Body>
</RadioInput.Option>
```

