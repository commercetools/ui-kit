---
'@commercetools-uikit/secondary-icon-button': patch
'@commercetools-uikit/icons': patch
'@commercetools-uikit/checkbox-input': patch
'@commercetools-uikit/radio-input': patch
'@commercetools-uikit/rich-text-utils': patch
'@commercetools-uikit/select-utils': patch
---

Remove unnecessary `fill="none"` attribute from SVG files. We noticed that when refining the style selector for nested `fill` colors to avoid overriding `fill="none"` style, icons rendered without an explicit color (therefore using `inherit`) were not applying the color correctly due to cascading conflicts. After a deeper look, it appears that the `fill="none"` attributes are actually irrelevant for our set of icons.
