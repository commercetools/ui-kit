---
'@commercetools-uikit/localized-rich-text-input': major
'@commercetools-uikit/rich-text-input': major
'@commercetools-uikit/rich-text-utils': major
---

This release contains some breaking changes to the following components, due to upgrading the internal `slate` libraries for rich-text editor functionality:
* `<RichTextInput>`
* `<LocalizedRichTextInput>`

> All other components do not have any breaking changes.

# Breaking changes

The change affects the way the editor is able to reset the `value`. This is usually relevant when using the components within a form and the user wants to reset the form to its initial state.

Previously the richt-text editor was working in a controlled way. This allowed the `value` passed to the input components to be used by the editor as-is. So if the user resets the form, the new value will be displayed.

Now the richt-text editor works in an uncontrolled way, meaning that it keeps its own state of the value and the `value` passed to the input components is used as the initial value. Therefore, if the user resets the form, the new value passed to the input won't do anything.

Instead, the reset functionality needs to be explicitly triggered using a dedicated function. To enable this, you need to use a `ref` object and pass it to the input component. The `ref` object will then contain the `resetValue` function that can be used to trigger the editor reset.

```jsx
const ref = useRef(null);
const handleReset = useCallback(() => {
  ref.current?.resetValue("<p><strong>Value after reset</strong></p>");
}, []);
return (
  <>
    <button onMouseDown={handleReset}>Reset</button>
    <RichTextInput
      // ...
      ref={ref}
    />
  </>
);