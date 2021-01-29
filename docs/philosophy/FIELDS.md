# Fields

Fields combine a label, an input element and validation messages.

Think of Fields as a form of syntactic sugar expressed as additional components.
They forward most properties to the underlying components while combining some
APIs of the components for easier usage.

They are an abstraction which should be used to build forms with.
In case it's necessary to use slightly different behaviour, it's always possible
to drop down to the building blocks (label, input element, validation message) to
achieve customizaion. In most cases this won't be necessary though.

## Forwarding of props

Generally all fields forward most properties to the underlying `FieldLabel`, input component and `FieldErrors` component.

All field components should at least accept these properties

..for the label and error rendering:

| Name                   |  Type                 |
| ---------------------- | --------------------- |
| `id`                   | `string`              |
| `title`                | `string`              |
| `description`          | `string`              |
| `hint`                 | `string`              |
| `hintIcon`             | `node`                |
| `badge`                | `node`                |
| `horizontalConstraint` | `string`              |
| `errors`               | `object`              |
| `renderError`          | `function`            |
| `onInfoButtonClick`    | `function`            |
| `isRequired`           | `boolean`             |
| `touched`              | `boolean` or `object` |

..for the input:

| Name         |  Type      |
| ------------ | ---------- |
| `name`       | `string`   |
| `value`      | `any`      |
| `onChange`   | `function` |
| `isDisabled` | `boolean`  |
| `data-*`     | `any`      |

## Auto-generated ids

Fields accept an `id` property which is forwarded to the input.
That `id` is also used as the `htmlFor` attribute of the label.
This allows focusing the input by clicking the label.
It's also very useful for screenreaders.

It looks something like this:

```html
<label htmlFor="age">Age</label> <input type="number" id="age" />
```

However as `id` is not a required property it might not always be passed to the
input. We still want to be able to foucs the input by clicking the label in those
cases though.

So our fields automatically generate an `id` in case no `id` was provided by the parent.

## Usage with Formik

As explained in _"Philosophy > Forms"_, we use Formik to keep track of form state. The formik state may looks like this:

```js
{
  values: { firstName: '' },
  touched: { firstName: true },
  errors: { firstName: { missing: true } }
}
```

Parents then usually pass the value, touched state and errors of a field into the related field component, e.g:

```jsx
<TextField
  value={formik.values.firstName}
  errors={formik.errors.firstName}
  touched={formik.touched.firstName}
/>
```

> Note that some fields don't follow this convention as they were not
> upgraded to this approach yet. However this is the design goal of fields.

The field can then determine whether to render the underlying input in an error state or not, based on `errors` and `touched`.
It can also decide whether to show error messages or not, based on the `touched` state. This ensures consistency across forms.
It also ensures that we never show a validation message without rendering the related input field in an error state (e.g. with a red border) as well.

Using fields ensures form fields behave the same and reduces the amount of code necessary in the form itself.

## Allowing custom errors

We want parents to be able to render custom errors into our field components.

All fields accept a function called `renderError`.
This function will get called with every entry in from `props.errors` and can then decide which error to render.

In case `null` is returned for a specific error, the field falls back to handling some default errors itself.
Every field can have a different set of default errors it knows how to render.
