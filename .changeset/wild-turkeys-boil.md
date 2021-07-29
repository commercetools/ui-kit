---
'@commercetools-uikit/avatar': patch
'@commercetools-uikit/secondary-button': patch
'@commercetools-uikit/field-errors': patch
'@commercetools-uikit/field-label': patch
'@commercetools-uikit/icons': patch
'@commercetools-uikit/multiline-text-input': patch
'@commercetools-uikit/number-input': patch
'@commercetools-uikit/password-input': patch
'@commercetools-uikit/text-input': patch
'@commercetools-uikit/tag': patch
'@commercetools-uikit/tooltip': patch
'@commercetools-uikit/hooks': patch
---

Some files were not migrated to TypeScript. Also, each package entry point should not contain any TypeScript syntax (as it does not play well with preconstruct).
Instead, explicit export types are defined in a `export-types.ts` file, which is then re-exported from the entry point.
