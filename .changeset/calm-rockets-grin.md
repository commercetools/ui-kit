---
'@commercetools-uikit/localized-rich-text-input': major
'@commercetools-uikit/rich-text-input': major
'@commercetools-uikit/rich-text-utils': major
---

Update `slate` and `slate-react` packages to most recent versions.
Replace `slate-html-serializer` with `slate-hyperscript`.

#### Changes in `Slate` resulting in breaking changes of rich text input and localized rich text input
External changes of the [0.67+ `Slate`'s](https://github.com/ianstormtaylor/slate/releases/tag/slate-react%400.67.0) `value` are not possible and editor resetting must take place internally, therefore `reset` and `resetValue` props were introduced. 
#### Changes in rich text input props:
```diff
export type TRichTextInputProps = {
    // ...
+  reset?: boolean;
+  resetValue?: string; 
```

#### Changes in localized rich text input props:
```diff
export type TLocalizedRichTextInputProps = {
    // ...
+  reset?: boolean;
+  resetValue?: string; 
```





