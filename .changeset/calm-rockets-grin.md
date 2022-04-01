---
'@commercetools-uikit/localized-rich-text-input': major
'@commercetools-uikit/rich-text-input': major
'@commercetools-uikit/rich-text-utils': major
---

Update `slate` and `slate-react` packages to most recent versions.
Replace `slate-html-serializer` with `slate-hyperscript`.

#### Changes in `Slate`
Rather than an event object [`0.50+ Slate`'s](https://github.com/ianstormtaylor/slate/issues/3215) `onChange` handler receives the current value of the editor. Moreover, external changes of the [0.67+ `Slate`'s](https://github.com/ianstormtaylor/slate/releases/tag/slate-react%400.67.0) `value` are not possible, therefore editor resetting must take place internally. 
#### Changes in rich text input props:
```diff
-  onChange?: (event: TCustomEvent) => void;
+  onChange?: (state: ReturnType<typeof html.serialize>) => void;
+  reset?: boolean;
+  resetValue?: string; 
```

#### Changes in localized rich text input props:
```diff
-  onChange?: (event: TCustomEvent) => void;
+  onChange?: (
+    language: string
+  ) => (state: ReturnType<typeof html.serialize>) => void;
+  reset?: boolean;
+  resetValue?: string; 
```





