---
'@commercetools-uikit/card': minor
---

Add `insetScale` prop to Card component, to control the spacing (padding). Available values are `s`, `m` (default) or `none` (for no padding).

**Possible visual regressions**

Be aware that if you are passing **custom styles** (through the `className` prop, or `css` prop if you use Emotion), the `<Card>` component renders the `children` within a wrapper `<div>` container.

```
<card-container>
  <card-wrapper>
    <children>
```

Therefore, if you encounter visual regressions, make sure to check that the custom styles target the correct elements.
