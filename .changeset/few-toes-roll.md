---
'@commercetools-uikit/design-system': patch
---

New helper functions to transform from design tokens to CSS vars.

Let's say we have an object with design tokens data like this:
```
{
  colorPrimary: '#00b39e',
}
```

We can transform the object to use CSS var names keys:
```
transformTokensToCssVarsValues(tokens);

// Output
{
  '--color-primary': '#00b39e',
}
```

We can also tranform the object to use CSS var references values:
```
transformTokensToCssVarsReferences(tokens);

// Output
{
  'colorPrimary': 'var(--color-primary, #00b39e)',
}
```
