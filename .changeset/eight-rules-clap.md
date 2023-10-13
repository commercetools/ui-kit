---
'@commercetools-uikit/checkbox-input': minor
'@commercetools-uikit/select-utils': minor
'@commercetools-uikit/icons': minor
'@commercetools-uikit/label': minor
'@commercetools-uikit/card': minor
'@commercetools-uikit/text': minor
'@commercetools-uikit/calendar-utils': minor
'@commercetools-uikit/design-system': minor
---

feat(Typography): update Text.Body/Detail components and create Caption component

Introducing a new Text component named Caption which will render the smallest text available.
Example:

<Text.Caption>your small text</Text.Caption>
Also, we've deprecated the isBold property in these components in favour of a new property called fontWeight.
The former property only supported two values whereas the new one supports three: regular, medium and bold.
