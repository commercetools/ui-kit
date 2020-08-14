## Using the component for a11y testing

This is an example for when you would want to render an input without visually displaying a label. You still would want a label to be present so it can be used when testing with RTL as well as supporting a11y.

```js
const rendered = render(
  <>
    <AccessibleHidden>
      <label htmlFor="maiden-name-input">Enter your Maiden Name</label>
    </AccessibleHidden>
    <input id="maiden-name-input" type="text"></input>
  </>
);

expect(rendered.getByLabelText('Enter your Maiden Name')).toBeInTheDocument();
// ✓ True
```

It is a common requirement to show inputs inside tables. In such a case a sighted user should be able to understand the context of the input through the column header. A label element taking space inside the cell is undesirable.

## References:

- [The A11Y Project - How-to: Hide Content](https://a11yproject.com/posts/how-to-hide-content/)
