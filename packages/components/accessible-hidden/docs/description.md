This component is used to hide content offscreen, removing it from sighted users, while keeping it still accessible to screen readers and other assistive technology.
It can also be useful for testing with tools like react-testing-library and cypress, which requires querying elements through content which might not be intended to be visible on screen, such as querying for a input by its label while the label is visually hidden.

It's the logical opposite of [the `aria-hidden` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-hidden_attribute).
