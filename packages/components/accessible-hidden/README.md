# Accessible Hidden

#### Description

This component is used to hide content offscreen, removing it from sighted users, while keeping the still accessible to screenreaders and other assistive technology.
It can also be useful for testing with tools like react-testing-library and cypress, which query elements through content which you might not want to be showing explicitly, such as querying for a input by its label while the label is visually hidden.

It's the logical opposite of [the `aria-hidden` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-hidden_attribute).

#### Usage

##### Example: A11y

In this example, we're showing additional text specifically to be read only by screen readers, to make it more contextualized and easier to understand for non-sighted users (as well "translating" the numeronym which might confuse automatic screen-readers).

```js
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';

<h3>An Article on A11y</h3>
<p>A summary of the article</p>
<button>Read More<AccessibleHidden> from An Article on Accessibility</AccessibleHidden></button>
```

##### Example: Tests

This is an example for when you would want to render an Input without visually displaying a label visually, but still having a label to query by, when testing with RTL, as well as being a11y friendly.

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

It is a common use case for inputs inside Tables, where a sighted user understands the context of the input through the column header and a label element taking space inside the cell is undesirable.

#### Properties

This component only accepts the prop `children`, which is the element you want to visually hide.

#### References:

- [The A11Y Project - How-to: Hide Content](https://a11yproject.com/posts/how-to-hide-content/)
