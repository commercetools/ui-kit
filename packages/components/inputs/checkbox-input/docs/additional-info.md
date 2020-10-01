## `data-*` and `aria-*` props

The component further forwards all `data-` and `aria-` attributes to the underlying component.
In order to keep the component more accessible to screen-readers, please make sure that if no `children` prop is present (for displaying a checkbox without any text), a corresponding `aria-label` property is provided instead.
