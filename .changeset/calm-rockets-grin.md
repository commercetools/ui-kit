---
'@commercetools-uikit/localized-rich-text-input': major
'@commercetools-uikit/rich-text-input': major
'@commercetools-uikit/rich-text-utils': major
---

Update `slate` and `slate-react` packages to most recent versions.
Replace `slate-html-serializer` with `slate-hyperscript`.

# Changes in the `<RichTextInput>` and `<LocalizedRichTextInput>` behavior
Before, slate editor without any prior focus assumed that point [0,0] was selected. Formatting buttons toggling was possible but the results (formatting buttons' state change and content formatting) were not visible until the editor got focus.

Currently editor has to explicitly receive focus to apply the initial selection and enable any formatting.

# Migration guide
The `<RichTextInput>` and `<LocalizedRichTextInput>` components now require to explicitly call a `reset` function when the form values need to be reset to their initial state.
This `reset` function is attached to a `ref` object passed to the component.

```jsx
const ref = useRef(null);

const handleReset = useCallback(() => {
  ref.current?.reset("<p><strong>Value after reset</strong></p>");
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
```





