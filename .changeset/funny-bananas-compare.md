---
'@commercetools-uikit/localized-rich-text-input': patch
---

Fix regression of `onChange` to pass `target.name` and `target.id` with the locale suffix.

Furthermore, the reset functionality works correctly for all localized inputs.
The reset functionality needs to be explicitly triggered using a dedicated function as described in [@commercetools-uikit/localized-rich-text-input@15.0.0 release notes](https://github.com/commercetools/ui-kit/releases/tag/%40commercetools-uikit%2Flocalized-rich-text-input%4015.0.0)

```js
const ref = useRef(null);
const handleReset = useCallback(() => {
  ref.current?.resetValue({ en: '<p><strong>Value after reset</strong></p>' });
}, []);
return (
  <>
    <button onMouseDown={handleReset}>Reset</button>
    <LocalizedRichTextInput
      // ...
      ref={ref}
    />
  </>
);
```


