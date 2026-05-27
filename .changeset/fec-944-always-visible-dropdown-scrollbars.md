---
'@commercetools-frontend/ui-kit': patch
---

Always render a visible scrollbar in overflowing `SelectInput` menus and `FilterMenu` bodies.

Browsers — particularly macOS — hide scrollbars by default, which can mask the fact that more options exist below the fold in MC list-page action dropdowns and pre-filter dropdowns. The dropdowns now expose a persistent thin scrollbar whenever the menu content overflows its max-height, via `scrollbar-width` / `scrollbar-color` (Firefox) and `::-webkit-scrollbar` rules (Chrome, Safari, Edge). No API changes.
