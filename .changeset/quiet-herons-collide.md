---
'@commercetools-uikit/rich-text-utils': patch
---

Fix rich text editor typography styles not applying correctly in applications with global CSS resets. The editor now explicitly defines font size, font weight, and line height for paragraph and heading elements (p, h1-h6) instead of relying on browser defaults. This ensures consistent typography rendering and preserves the intended visual hierarchy when embedded in applications such as Nimbus.
