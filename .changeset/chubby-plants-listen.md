---
'@commercetools-uikit/rich-text-input': minor
'@commercetools-uikit/rich-text-utils': minor
---

fix(rich-text-input): Ensure proper link preservation and enhance security

- Addresses an issue where links in the rich text editor were not correctly preserved during editing, sometimes leading to their removal or malformation.
- Updated HTML serialization and deserialization logic within `rich-text-utils/src/html/html.tsx` to correctly process anchor (`<a>`) tags, corresponding to Slate's `link` element type.
- All HTML attributes on anchor tags are now preserved during processing.
- For security and best practice, `rel="noopener noreferrer"` is now automatically added to all rendered `<a>` tags.
- Implemented XSS mitigation for links:
    - Event handler attributes (e.g., `onclick`, `onmouseover`) are stripped from anchor tags.
    - `href` attributes containing `javascript:` URLs are sanitized by replacing them with `#`.
- Updated the `CustomElement` type and Slate module declarations in `rich-text-utils/src/html/html.tsx` to support these changes.
