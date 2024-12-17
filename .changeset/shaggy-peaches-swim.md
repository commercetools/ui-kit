---
'@commercetools-uikit/i18n': patch
---

Fix regression of removing the `zh-CN.json` file. Even though we don't support chinese locale anymore, we still need to keep the file (as empty) for backwards compatibility with Application Kit packages version `<22.36.0` as they still expect the file to be defined.
