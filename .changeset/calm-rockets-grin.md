---
'@commercetools-uikit/localized-rich-text-input': major
'@commercetools-uikit/rich-text-input': major
'@commercetools-uikit/rich-text-utils': major
---

Update `slate` and `slate-react` packages to most recent versions.
Replace `slate-html-serializer` with `slate-hyperscript`.

#### Changes in rich text input props:
```diff
export type TRichTextInputProps = {
    // ...
-  isAutofocussed?: boolean; // please mind the typo in the old prop name
+  isAutofocused?: boolean;
```

#### Resetting rich text input and localized rich text input
External changes of the [0.67+ `Slate`'s](https://github.com/ianstormtaylor/slate/releases/tag/slate-react%400.67.0) `value` are not possible and editor resetting must take place internally. For that `ref` object have to be passed to `<RichTextEditor>` or `<LocalizedRichTextEditor>`. 
Then in client code we may imperatively reset the editor:

```jsx
const ref = useRef(null);

const handleReset = useCallback(() => {
    ref.current?.reset('<p><strong>Value after reset</strong></p>');
}, []);

return (
    <>
        <button onMouseDown={handleReset}>
            Reset
        </button>
        <RichTextInput
            // ...
            ref={ref}
        />
    </>
)
```





