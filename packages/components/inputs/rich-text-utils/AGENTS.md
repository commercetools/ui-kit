# @commercetools-uikit/rich-text-utils

## Purpose

Shared Slate.js utilities, HTML serialization/deserialization, and toolbar UI
components used by `rich-text-input` and `localized-rich-text-input`.

## Key Context

- **HTML module**: Serializes Slate descendants → HTML and deserializes HTML →
  Slate descendants. Uses `dompurify` for XSS sanitization during serialization
  and `escape-html` for output safety.
- **Slate helpers** (`slate-helpers.tsx`): Mark/block toggle functions,
  `withLinks()` plugin for link detection, `Element`/`Leaf` render components.
- **RichTextBody**: The toolbar UI component with a text styles dropdown
  (paragraph, headings h1–h5, quote, preformatted), bold/italic/underline
  buttons, a "more styles" dropdown (strikethrough, superscript, subscript),
  and ordered/unordered list buttons. Uses `downshift` for dropdown menus.
- **HiddenInput**: Accessibility component for focus management.
- Has its own generated icons (via SVGR) for toolbar buttons — the
  `generate-icons` root command processes this package too.
- Tag → Slate type mapping defined in `tags.ts`.

## How To Work Here

Same as root instructions. Scoped test:
`yarn test --testPathPattern=packages/components/inputs/rich-text-utils`.

If you modify HTML serialization, test the round-trip: HTML → Slate → HTML in
both `rich-text-input` and `localized-rich-text-input`.

## Gotchas

- Changes to `tags.ts` or `html/` serialization affect all rich text consumers.
  Test thoroughly — data corruption is possible if serialization is wrong.
- This package has its own SVG icons in `src/rich-text-body/icons/svg/` that are code-genned
  separately from the main icons package. Run `yarn generate-icons` to
  regenerate after SVG changes.
- Extends Slate's TypeScript types via module augmentation (custom `CustomTypes`).
