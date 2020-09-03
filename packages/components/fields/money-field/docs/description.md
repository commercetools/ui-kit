A controlled input component for money values with validation states and a label.

## High Precision Money Values

The `MoneyField` component always operates on a value consisting of

```js
{ amount: String, currencyCode: String }
```

The amount can have an arbitrary precision. When the precision of the amount exceeds the precision of that currency, then that Money Value is referred to as being "high precision".

> ⚠️ The `MoneyField` will allow high precision money values by default. If you want to discourage them, you need to add validation as shown in the example below, or the Examples/Forms story.
