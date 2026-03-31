# @commercetools-uikit/rich-text-input

## Purpose

Rich text editor component backed by Slate.js, providing WYSIWYG editing with
HTML serialization for form integration in Merchant Center applications.

## Key Context

- Built on **Slate.js 0.75** (`slate`, `slate-react`, `slate-history`) — a
  significantly different API from Slate 0.4x. Do not reference older Slate docs.
- Uses `@commercetools-uikit/rich-text-utils` for HTML serialization, toolbar UI,
  and Slate helper functions.
- Two-layer architecture: `rich-text-input.tsx` is a class-based PureComponent
  managing external HTML ↔ internal Slate state sync; `editor.tsx` is a
  functional component handling the Slate editor instance and UI.
- Keyboard shortcuts via `is-hotkey`: Mod+B (bold), Mod+I (italic),
  Mod+U (underline), Mod+\` (code). Shift+Enter for soft breaks.
- Uses `downshift` for accessible dropdown patterns in the toolbar.
- Uses `CollapsibleMotion` for expand/collapse behavior.

## How To Work Here

Same as root instructions for testing and typechecking. Scoped test:
`yarn test --testPathPattern=packages/components/inputs/rich-text-input`.

## Gotchas

- The component maintains parallel state (HTML string externally, Slate
  descendants internally). Changes to serialization logic in `rich-text-utils`
  can cause subtle state sync bugs — always test round-trip HTML → Slate → HTML.
- Static methods `isEmpty()` and `isTouched()` are part of the public API and
  used by field-level components for validation.
