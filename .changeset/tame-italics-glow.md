---
'@commercetools-uikit/rich-text-utils': patch
---

Fix italic text not rendering correctly in the rich text editor when it is used inside applications that apply a global CSS reset (for example, apps built on Nimbus). The editor now explicitly applies font-style: italic to <em> and <i> elements instead of relying on browser default styling, ensuring italic formatting previews correctly in all embedding environments.
