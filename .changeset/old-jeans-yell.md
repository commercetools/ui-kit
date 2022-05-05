---
'@commercetools-uikit/rich-text-utils': patch
---

Refactor html `serialize` method to make rich text inputs work properly with Formik. After changes if no text is entered the input should return empty string instead of string containing empty paragraph ('<p></p>') that was returned previously.
