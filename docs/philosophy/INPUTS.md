# Inputs

This document describes the thinking behind UI Kit input components.

To find out more about how inputs are used in forms, read the _Forms Philosophy_ document.

This is a summary of decisions we made for our inputs. The sections below go into details and reasoning behind those decisions.

- [Summary](#summary)
- [Controlled vs uncontrolled components](#controlled-vs-uncontrolled-components)
- [Schools of inputs](#schools-of-inputs)
  - [Inputs which call the parent with all values](#inputs-which-call-the-parent-with-all-values)
  - [Inputs which call the parent with valid values only](#inputs-which-call-the-parent-with-valid-values-only)
- [Error states](#error-states)
- [Validation messages](#validation-messages)
- [Handling changes](#handling-changes)
- [Faking events](#faking-events)
- [Static methods](#static-methods)

## Summary

Our input components need to adhere to certain rules:

- inputs are always controlled components (see [Controlled vs uncontrolled components](#controlled-vs-uncontrolled-components))
- inputs leave validation to the form they are used in (see [Schools of inputs](#schools-of-inputs))
- inputs receive and display an error state (`hasError: Boolean`) (see [Error states](#error-states))
- inputs do not show validation messages themselves (however they may remove invalid values on blur) (see [Validation messages](#validation-messages))
- inputs accept a change handler (like `onChange`) which they call with an event containing the changed value (see [Handling changes](#handling-changes))
- inputs support `id` and `name` properites (and fake them in change/blur events if necessary) (see [Faking events](#faking-events))
- inputs expose static methods to aid usage in forms (see [Static methods](#static-methods))

## Controlled vs uncontrolled components

All our inputs are [controlled components](https://reactjs.org/docs/forms.html#controlled-components). This means the parent component owns the state and passes the value and a change handler to the input component. The input component is controlled by the parent component.

We never expose uncontrolled components as they don't work with our validation approach or with auto-formatting values on blur.

_The "controlled component" aspect only applies to the value. Other things like an open/closed state may be implemented either way as it's not related to the form logic itself._

## Schools of inputs

When designing inputs, we can either tell the parent about every value entered by the user,
or we can take an approach where the component tells the parent about valid values only.
These approaches come with different tradeoffs, which we'll look into below.

In UI Kit, we usually use different approaches depending on the component - but we generally favour the first one.

### Inputs which call the parent with all values

Whenever the user changes the component's value, the component notifies the parent of the changed value by calling a change handler (like `onChange`) with the updated value.
The parent always knows the exact value the component is seeing. These components can not have any validation built in. The form always needs to validate them.

👍 This is great for validation, as the parent can validate the actual user input.

👍 Validation can change based on the use-case (required value, minimum length, forbidden characters, ..)

👎 All consumers of the component need to repeat the validation logic

### Inputs which call the parent with valid values only

These components have some validation built in, but they typically don't show warnings for invalid values.
Instead they discard invalid values on blur by calling the change handler with an empty value (usually an empty string).

👍 This prevents consumers from having to repeat validation

👎 Consumers don't always know the current value of an input

👎 It might not be clear to users why the value disappears when the input is blurred

👎 In case of longer values, users lose that value and need to retype everything which can be cumbersome

👎 Not flexible when different validation requirements arise as they are hard-coded in the component

In case this approach is taken, it usually ends up being combined with the first approach.
Some basic validation which would be the same for all consumers is done by the input itself, while consumers may add additional validation.
For example, we could have a date input which only calls the parent with parseable dates, while the parent could have its own validation ensuring the date is within a specific range.

This allows the parent not to worry about determining valid/invalid dates while still being able to customize validation. Users won't get validation warnings when they enter invalid dates (the date will just disappear on blur), but they will get validation warnings when the date is outside of a certain range. This allows some flexibility in validation without burdening all consumers with date validation.

## Error states

As our inputs leave validation to the form they are used in, they can't determine themselves whether they are currently valid or not.
This means the parent needs to tell an input about its validation state. The input can use this information to render itself in an appropriate style (e.g. with a red border in case of an error). Do not try to determine the validation state form within the input.

Usually our inputs are told about the validation state by accepting a `hasError` property which contains a boolean.
They also accept an additional boolean `hasWarning` property for intermediate cases (usually results in an orange border).
Ask the design team about the difference between `hasError` and `hasWarning`. In most cases, consumers will use `hasError`.

## Validation messages

The inputs should not show any validation messages at all. The validation messages are usually rendered underneath an input. A Field combines a label, an input and a validation message. That's where things come together. We want to keep inputs usable in any context and the placement of the error message may differ. So we don't include any validation messages in inputs themselves.

Inputs also should never render their own validation messages (e.g. a tooltip). This should always be done by the parents.

## Handling changes

When a user makes a change to an input's value, the input must call the change handler (e.g. `onChange`) to tell the parent about the updated value.

All inputs should call `onChange` with an event containing that value, instead of calling with the value directly.

We do this as the event will contain `event.target.name` or `event.target.id`, which allows Formik to determine the value to change.
This in turn allows consumers to use our inputs like this:

```jsx
<TextInput
  name="firstName"
  value={formik.values.firstName}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>
```

instead of the more elaborate

```jsx
<TextInput
  name="firstName"
  value={formik.values.firstName}
  onChange={(value) => formik.setFieldValue('firstName', value)}
  onBlur={() => formik.setFieldTouched('firstName')}
/>
```

As you can see, passing up events from `onChange` simplifies the caller side.

In most cases we are able to simply forward the generated event:

```jsx
const TextInput = (props) => (
  <input
    type="text"
    name={props.name}
    value={props.value}
    // change event generated by "input" is forwarded to TextInput's onChange
    onChange={props.onChange}
  />
);
```

## Faking events

There are case where we can't simply forward the event from the change handler.
We then need to fake the generated event, for example because building the input on an underlying library which only passes the value:

```jsx
const MultilineTextInput = (props) => (
  <AutosizeInput
    id={props.id}
    name={props.name}
    value={props.value}
    // AutosizeInput only tells us about the value, but we want to emit
    // an event which formik can read the id and name from.
    onChange={(value) => {
      const fakeEvent = { target: { id: props.id, name: props.name, value } };
      props.onChange(fakeEvent);
    }}
    // Pass a fake event up the blur handler
    onBlur={
      props.onBlur
        ? () => {
            const fakeEvent = { target: { id: props.id, name: props.name } };
            props.onBlur(fakeEvent);
          }
        : undefined
    }
  />
);
```

## Static methods

Inputs are typically used in forms. It's often necessary to convert a document to
a form value (more on this in _Philosophy > Forms_) before being able to use it - and sometimes the form value needs to be converted back into an actual value when a form is submitted.
Another common case is that a form needs to validate input.

Our input elements expose static methods which can be used for these things.

Even a simple `TextInput` might have methods like

- `TextInput.toFormValue(text)` to convert a text to a form value by ensuring that `undefined` and `null` are converted to an empty string
- `TextInput.isEmpty(text)` to check whether an imput is empty (by checking `text.trim().length === 0`)

Other examples for use-cases of static methods on inputs are to offer a way to:

- convert a value back into a document (e.g. for `MoneyInput`)
- check whether a price is high precision or not as `MoneyInput` does
- enrich values for the form (e.g. `LocalizedTextInput` mixes project locales and locales of the value itself)
- convert dates to a textual representation ( e.g. `DateInput`) and the other way around
