---
'@commercetools-uikit/rich-text-utils': minor
---

Updated the Slate HTML serializer to stop escaping text nodes so `</>` stay as-is when the editor value is serialized, which allows tags to pass through.
