# Forms

Most views in web applications are either lists or forms. So it's important to get forms right. It's important to offer good UX, but it's also important to make building and modifying forms straightforward for developers. Offering a consistent solution helps both.

With our approach to forms, we strive to

- **eliminate architectural discrepancy between different forms** by using the same approach for all forms
- **offer good UX** by embedding the same principles for all forms in our solution

This document tries to outline the reasoning behind our form component philosophy by showing the challenges we faced which led to the current design.
This document aims to help contributors understand which considerations are relevant when building input components for ui-kit.

It is not intended as a usage-guide of our input components. In fact it doesn't touch our input components for the most part.

## Table of Contents

- [Typical steps of forms](#typical-steps-of-forms)
- [The flow](#the-flow)
  - [Fetching initial form data](#fetching-initial-form-data)
  - [Transforming the fetched data into form values](#transforming-the-fetched-data-into-form-values)
  - [Modifying the form values draft based on the user input](#modifying-the-form-values-draft-based-on-the-user-input)
  - [Keeping track of modified fields to know which error messages to display](#keeping-track-of-modified-fields-to-know-which-error-messages-to-display)
  - [Validating the form as the user interacts with the form](#validating-the-form-as-the-user-interacts-with-the-form)
  - [Rendering validation errors](#rendering-validation-errors)
  - [Validating the form on submission](#validating-the-form-on-submission)
  - [Handling form submission](#handling-form-submission)
  - [Transforming the form values back into a document which e.g. can be sent to the server](#transforming-the-form-values-back-into-a-document-which-eg-can-be-sent-to-the-server)
  - [Conclusion](#conclusion)
- [What this approach means for our input components](#what-this-approach-means-for-our-input-components)
- [Most important lessons](#most-important-lessons)
- [Formik disclaimer](#formik-disclaimer)
- [Solutions recipes:](#solutions-recipes)
  - [Data conversion](#data-conversion)
    - [The response shape of the server is inconvenient to build a form on](#the-response-shape-of-the-server-is-inconvenient-to-build-a-form-on)
    - [Providing defaults (Unifying inconsisent data: empty strings, `undefined` & `null`)](#providing-defaults-unifying-inconsisent-data-empty-strings-undefined--null)
    - [Handling numbers](#handling-numbers)
    - [Enriching received data (e.g. adding additional languages to localized strings)](#enriching-received-data-eg-adding-additional-languages-to-localized-strings)
  - [Validation](#validation)
    - [Translating error messages](#translating-error-messages)
    - [Multiple errors on a single field](#multiple-errors-on-a-single-field)
    - [Mapping async errors after submission back onto the form](#mapping-async-errors-after-submission-back-onto-the-form)
  - [Single inputs to determine multiple values (e.g. `MoneyInput`)](#single-inputs-to-determine-multiple-values-eg-moneyinput)
  - [Form values need to be shown in a user-friendly format](#form-values-need-to-be-shown-in-a-user-friendly-format)
  - [Preventing concurrent modifications](#preventing-concurrent-modifications)

## Typical steps of forms

We want to offer a generic solution to forms. The following problems usually need to be solved (roughly in this order) when building a form:

- fetching initial form data
- transforming the fetched data into form values
- modifying the form values draft based on the user input
- keeping track of modified fields to know which error messages to display
- validating the form as the user interacts with the form
- rendering validation errors
- validating the form on submission
- handling form submission
- transforming the form values back into a document which e.g. can be sent to the server

Other problems might arise while building the form. We collected hints on how
to approach the most common problems at the end of this document. The solution
always builds on top of the forms approach outlined here.

## The flow

Let's say a user visits a product detail page and wants to change the product name. What does the flow look like?

We'll walk through the architecture we arrived at without going into detail and reasoning at first. Instead we'll walk through specific problems after introducing our form approach to see how to solve them with the architecture we arrived at.

### Fetching initial form data

As our form solution must be able to work with data from any source, we'll not make loading the data part of the form solution. So we may only render our form once the data is fetched as shown by the exemplatory code below:

```js
// product-details.js

<GetProduct id="party-parrot">
  {(product) => <ProductDetailsForm initialValues={product} />}
</GetProduct>
```

Here we introduced a `GetProduct` component which handles fetching the product. This nicely separates the data source from the form itself. We could pass any `initialValues` to our `ProductDetailsForm`. The `ProductDetailsForm` is oblivious to where the data is coming from. We can change the data source easily. So fetching the data isn't actually part of the form itself.

### Transforming the fetched data into form values

This leads to another concern though: Our backend might currently serve a product as

```js
{
  id: 'party-parrot',
  version: 1,
  name: 'Party Parrot',
}
```

But what if the backend ever changes the response and we then receive the following instead?

```diff
{
  id: 'party-parrot',
  version: 1,
- name: 'Party Parrot',
+ productName: 'Party Parrot',
}
```

Our form would break as `name` no longer exists!

So it makes sense to introduce a different data format for our forms. We'll add a `docToFormValues` function which converts our product document to form values.

```diff
// product-details.js

<GetProduct id="party-parrot">
  {product => (
-   <ProductDetailsForm initialValues={product} />
+   <ProductDetailsForm initialValues={docToFormValues(product)} />
  )}
</GetProduct>
```

Being able to adapt to a changing data format is one upside of using such functions. They are even more useful when we need to convert the document into form values which are easier to work with, e.g. by providing devaults, flattening the values or by converting numbers into strings. We'll look into that later. For now, here's a simple conversion function which does "nothing" yet:

```js
// conversions.js

// Converts document into form values
// This is used to transform the original data into form values.
export const docToFormValues = (doc) => ({
  id: doc.id,
  version: doc.version,
  name: doc.name,
});
```

Great, now we know that we're guaranteed a document which looks like this:

```
{
  id: String,
  version: Number,
  name: String,
}
```

### Modifying the form values draft based on the user input

We use [Formik](https://github.com/jaredpalmer/formik) to handle our form state. A very simple form could look like this:

```js
<GetProduct id="party-parrot">
  {(product) => (
    <Formik
      initialValues={docToFormValues(product)}
      render={(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    />
  )}
</GetProduct>
```

As we've set the `name` attribute on the `input`, we can directly use `formik.handleChange` and `formik.handleBlur`. The `input` component will call these functions with an event, from `onChange` and `onBlur` respectively. That event will contain the input's name as `event.target.name`. Formik uses that information to change `formik.values.name` to the new value. It is therefore convenient when our input components call the change handlers with an event, and when that event contains the target.

Formik keeps track of the form values. It initializes the form values based on its `initialValues` property.

So at first Formik state looks something like this:

```js
{
  values: {
    id: 'party-parrot',
    version: 2,
    name: 'Party Parrot',
  },
  touched: {}
}
```

### Keeping track of modified fields to know which error messages to display

In the example above we also added `onBlur`. Just like with `onChange` Formik can read the information from the event passed to `onBlur` to know which form field to mark as touched.

As the user now makes changes to fields and blurs them, Formik's `touched` state gets updated:

```diff
{
  values: {
    id: 'party-parrot',
    version: 2,
    name: 'Party Parrot',
  },
  touched: {
+    name: true
  }
}
```

This indicates that the "name" field was touched.

You'll notice that Formik handles the `touched` state automatically based on `event.target`'s name. We never told it to set that value specifically. While a user is interacting with the a form, Formik produces a `touched` state solely based on the events `formik.handleBlur` receives.

Knowing which fields have been touched by the user is important information for when we try to figure out which validation error messages to show to the user. More on that later.

### Validating the form as the user interacts with the form

Formik accepts a `validate` function out of the box. We can add it to our example:

```js
import omitEmpty from 'omit-empty-es';

const validate = (values) => {
  const errors = { name: {} };

  // We use boolean flags to indicate errors
  if (values.name.length === 0) errors.name.missing = true;

  // The validation function must return an empty object when no
  // validation errors were found.
  return omitEmpty(errors);
};

<GetProduct id="party-parrot">
  {(product) => (
    <Formik
      initialValues={docToFormValues(product)}
      validate={validate}
      render={(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    />
  )}
</GetProduct>;
```

Whenever validation runs, our `formik` object will now also contain the errors we determined. In the example below the value "Party Parrot" was removed from the _name_ field. That's why `errors.name.missing` is now set to `true`.

```js
{
  values: {
    id: 'party-parrot',
    version: 2,
    name: '',
  },
  touched: {
    name: true
  },
  errors: {
    name: { missing: true }
  }
}
```

Multiple conventions are set now:

- We always use objects to contain the errors of a single field. This makes writing validation functions easy, but it also simplifies detecting errors when rendering error messages as we'll see in a bit. It also allows us to have multiple error messages present for a single field at the same time.
- We always use booleans for errors. We don't provide an error message from the validation function, as that should be part of the display logic. We do this so that we don't need to change our validation function when our rendering logic changes. This decouples them and only the error shape stays as the intersection between them.

### Rendering validation errors

We can now render a form, let users interact with it and determine error messages. But we still need to show the error messages to our users. This can be done using

```js
import omitEmpty from 'omit-empty-es';
// Extracted "validate" to keep snippet short.
// It's the same function as in the last snippet
import validate from './validate';

<GetProduct id="party-parrot">
  {(product) => (
    <Formik
      initialValues={docToFormValues(product)}
      validate={validate}
      render={(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name &&
            formik.errors.name &&
            formik.errors.name.missing && <div>A name is required</div>}
          <button type="submit">Submit</button>
        </form>
      )}
    />
  )}
</GetProduct>;
```

As `formik.touched.name` is only `true` after the user has left the name field, the errror message will not show up while the user is still interacting with the field (for the first time). This prevents scaring users by showing error messages too early.

The second time users change the input value of a field, the error message will go away as users interact with the field. This live validation helps users complete the form.

The ui-kit's `*Field` components have this behaviour baked into them, which you can see in _"Examples > Forms > Fields > Basic Form Example"_.

### Validating the form on submission

In addition to the validation which runs while users fill out values, validation is also triggered when a user submits the form.

In this case, there is another thing we need to be aware of: When a form is submitted, Formik automatically sets the `touched` state of all elements to `true`. This is done so that all error messages become visible. But Formik doesn't actually know about our input elements, it only knows about the stored values. So it tries to derive a `touched` state based on `formik.values`. This can lead to different `touched` states while a user interacts with a form and when the form is submitted. As we don't have any control over the `touched` state generated by Formik on submission, we need to ensure that the `touched` state we produce fits the one Formik will generate. Differences must be avoided to keep the code simple! Differing `touched` states lead to buggy code, unnecessary complexity and prop-type warnings.

### Handling form submission

We can pass an `onSubmit` property to Formik. That function will be called with `values` and `formik`.

```js
import omitEmpty from 'omit-empty-es';
import validate from './validate';

<GetProduct id="party-parrot">
  {(product) => (
    <Formik
      initialValues={docToFormValues(product)}
      validate={validate}
      onSubmit={(values, formik) => {
        console.log(values);
      }}
      render={/* same as before */}
    />
  )}
</GetProduct>;
```

We can then do anything from `onSubmit`. Most likely we'll want to make an async call and then reset the form state. We can do that like this:

```js
<Formik
  onSubmit={(values, formik) => {
    return updateProduct(values.id, values.version, { name: values.name }).then(
      // passing values to resetForm reinitializes the form with the
      // updated product
      (updatedProduct) =>
        formik.resetForm({ values: docToFormValues(updatedProduct) }),
      (error) => {
        alert('Could not save product');
        formik.setSubmitting(false);
      }
    );
  }}
  /* ... */
/>
```

`updateProduct` is an examplatory async function we use to update the product.
It receives an `id`, `version` and the updated product. When the update is
successful, it returns a promise which resolves with the updated product.
Otherwise it rejects the promise with an error.

In this example our users stay on the same page after saving a form. So we need
to reinitialize our form with the updated form values after a user saves. This
allows them to make further edits and save again. To do
so, we can call `formik.resetForm` with the updated form values.

Notice that we're using `docToFormValues` again to convert the updated product returned
by our `updateProduct` call back to form values.

### Transforming the form values back into a document which e.g. can be sent to the server

As you can see above, we're currently manually piecing together a document
which we can send to the server. A slight optimization is to move this logic
into its own function which we'll call `formValuesToDoc`.

The `formValuesToDoc` function is the opposite of `docToFormValues`. We use it to convert
the form values back into a document.

Right now we have

```js
updateProduct(values.id, values.version, { name: values.name });
```

Let's change that call to

```js
updateProduct(values.id, values.version, formValuesToDoc(values));
```

by adding a `formValuesToDoc` function to `conversions.js`:

```diff
// conversions.js

// Converts document into form values
// This is used to transform the original data into form values.
export const docToFormValues = doc => ({
  id: doc.id,
  version: doc.version,
  name: doc.name,
})

+// Converts form values back into a document
+// This is used when the form gets submitted.
+export const formValuesToDoc = formValues => ({
+  name: formValues.name,
+})
```

This `formValuesToDoc` function doesn't seem like a lot now, but it will come
in handy when we face more difficult problems later on as you'll see in the
more solution recipes below.

So now we end up with

```diff
<Formik
  onSubmit={(values, formik) => {
    return updateProduct(
      values.id,
      values.version,
-     { name: values.name }
+     formValuesToDoc(values)
    ).then(
      // passing values to resetForm reinitializes the form with the
      // updated product
      updatedProduct => formik.resetForm({values: docToFormValues(updatedProduct)}),
      error => {
        // More on error handling in "Solution Recipies" below
        alert('Could not save product');
        formik.setSubmitting(false);
      }
    );
  }}
  /* ... */
/>
```

The `validate` function should guarantee that `formValuesToDoc` always receives
valid form values and is able to construct a document. `formValuesToDoc` should
therefore never have to throw an error or fail in any other way.

### Conclusion

This concludes the overview of our forms approach. To sum it up: After getting the initial document, we use `docToFormValues` to convert the document to form values. We then rely on Formik to handle changes to that data and to keep track of the touched values. We let Formik validate user input by providing a custom `validate` function. That `validate` function will return an errors object containing an object for each field, in which boolean flags indicate the specific errors of that field. On form submission, we convert the form values back to a document using `formValuesToDoc`.

## What this approach means for our input components

As the state is managed outside of our input components, our input components need to be [controlled](https://reactjs.org/docs/forms.html#controlled-components). They may not be [uncontrolled](https://reactjs.org/docs/uncontrolled-components.html).

Our input components should let the form handle validation. They should accept an indicator of validation state from the form (e.g. a `hasError` property which they use to display an appropriate border color) instead of trying to determine that state themselves.

The inputs should keep the user-input around and store that in the state. They should not attempt to format user-input while users type (e.g. formatting numbers). More on this in "Solution recipes".

When an input gathers more than one information (e.g. a `MoneyInput` where users can select a currency from a dropdown and enter an amount), the input should not attempt to hide the fact that two separate inputs are used. Use two separate values and touched states. More on this in "Solution recipes". This is a limitation of Formik automatically determining the `touched` state on form submission. See "Solution recipes" for more information.

## Most important lessons

- **Convert data on the way into and out of the form** to keep the form oblivious to the data source
- **Don't convert user input too early**. Keep user input around while they are editing, otherwise you'll lose some information, e.g. when a user is editing a number.
- **Validate before converting**. Validation should guarantee that the conversions of form values back into the document succeeds.
- **Validate form values**: Never attempt to convert the data back into a document and attempt to validate the document. This will couple the vlaidation to the document. Instead, validate the user input (the form values)!
- **Validate on a form level**: Don't attempt to validate individual inputs. Validation must be the concern of the form itself, as it has the whole overview. It knows all values and knows how they come together.
- **Only mark error types during validation**: Don't attempt to generate error messages while validating. Use booleans to mark validation errors, e.g. `{ name: { missing: true } }`. This lets you change how the errors are shown, and enables you to localize the error messages with your regular translation tools.
- **Always detect all validation errors**: Don't stop validation after you found the first validation error. Try to mark all invalid fields as invalid. Decide which errors should be shown during rendering.
- **Let rendering take care of displaying errors**: During rendering you know which fields have been touched, whether the user attempted a form submission and which fields have validation errors. Decide which validation errors to show during rendering based on all those indicators.

## Formik disclaimer

While we use [Formik](https://github.com/jaredpalmer/formik) to handle our form state, there are some parts of Formik's philosophy we don't agree with.
Formik is a great library and embraces many good principles when building forms. However, we deviate from a few of their recommendations on purpose:

- It’s impossible to keep track of when an array was touched in some cases (e.g. when an element was removed and the array is now empty), because Formik is trying to auto-generate the touched state on submission. The touched state of an empty array is `{ someArray: [] }`. This means `[]` has to be interpreted as the array having been touched.
- Formik values can't be objects. Because Formik traverses the `value` and creates one big `touched` state, we can't have a `touched` state for a value which is an object (as money-input would be). Sometimes we would like to make it seem like there is only one input (e.g. for a money-input where users can select a currency and enter an amount, we'd like to have a single `touched` state for the whole thing). Formik forces us to use individual touched states and to handle values individually.
- Too big of an API with `Form`, `withFormik`, `Field`, `ErrorMessage` and `Formik`. There are many ways to achieve the same thing. We generally try to use `<Formik />` only.
- The recommendation to generate error messages from the validation function mixes validation and rendering logic. Returning strings from the validation function gets in the way of using an application's localization approach and makes it hard to determine failed validations in case an error needs to be shown in multiple places. It also makes it hard to attach multiple validation errors to a single field. That's why instead of returning a string for a field, we use objects holding booleans per field, e.g. `{ name: { missing: true } }`.

## Solutions recipes:

When building a form, you might run into other challenges along the way. We already
have solutions for the most common cases which work with our approach to forms.
They are shown below:

Here are some solution recipes for these cases:

- Data conversion
  - The response shape of the server is inconvenient to build a form on
  - Providing defaults (Unifying inconsisent data: empty strings, `undefined` & `null`)
  - Handling numbers
  - Enriching received data (e.g. adding additional languages to localized strings)
- Validation
  - Translating error messages
  - Multiple errors on a single field
  - Mapping async errors after submission back onto the form
- Single inputs to determine multiple values (e.g. `MoneyInput`)
- Form values need to be shown in a user-friendly format
- Preventing concurrent modifications

> More to be written here...

### Data conversion

#### The response shape of the server is inconvenient to build a form on

In case the data source has an inconvienient shape, you can use `docToFormValues` to convert it to something that's easier to work with.

If your document looks like this:

```js
{
  id: 'party-parrot',
  masterVariant: {
    name: 'Blue Party Parrot'
  },
  variants: [
    { name: 'Red Party Parrot' },
    { name: 'Green Party Parrot' },
  ]
}
```

and you just want a list of all variants, then you could use `docToFormValues` to
create a single variant list instead:

```js
export const docToFormValues = (doc) => ({
  id: doc.id,
  variants: [...doc.masterVariant, ...doc.variants],
});
```

When your user submits the form, you can use `formValuesToDoc` to split the variants again:

```js
export const formValuesToDoc = (formValues) => ({
  id: formValues.id,
  masterVariant: formValues.variants[0],
  variants: formValues.variants.slice(1),
});
```

This is a bit of a contrived example, but the principle of manipulating data on the way in and out will prove useful in many cases.

#### Providing defaults (Unifying inconsisent data: empty strings, `undefined` & `null`)

Let's say products had an optional field called `description`.
The server may omit this field if it was not sent, so it could be `undefined`.
But it could also be an empty string. This leads to different cases representing the same state.
We can avoid those different cases by converting falsey values to an empty string.
Then our form only needs to handle strings and doesn't need to worry about `undefined` or `null`:

```diff
export const docToFormValues = doc => ({
  id: doc.id,
  version: doc.version,
  name: doc.name,
-  description: doc.description,
+  description: doc.description || '',
})
```

Great! We can now build our form without worrying about those falsey edge-cases. We are guaranteed to always receive a string.
For example, this lets us read `formValues.description.length` without checking whether `formValues.description` is defined first.

This also prevents prop-type warnings. If we were to accept `undefined` as a valid value, then we would ultimately render `<input value={undefined} onChange={Function} />`. This leads to a warning in React as soon as the user enters a value, as the `input` component would then swtich from uncontrolled mode to controlled mode, which should not happen.

#### Handling numbers

Let's now assume that each product has an optional `inventory` field associated with it which contains a number.

```js
{
  id: 'party-parrot',
  version: 1,
  name: 'Party Parrot',
  inventory: 10,
}
```

When we attempt to use an `<input type="number" />` for this, Formik will see that `event.target.type` is `number` and automatically convert the passed value to a number.

The Formik state would then be

```js
{
  values: {
    id: 'party-parrot',
    version: 2,
    name: 'Party Parrot',
    inventory: 10,
  },
}
```

All browser inputs of type `number` will always only call `onChange` with either a valid number, or an empty string. `onChange` will never be called with an invalid number, `undefined` or a non-empty string.

This works for most cases, but we never get to see the original value entered by the user as the value gets parsed first. We either see a valid number or an empty string. This means we can't differntiate between `-0` and `0`. We also don't know wheter a user entered `9,8` (with a comma) or `9.8` (with a dot) as we will see the number `9.8` either way. We also can't differentiate between the user entering `00001` and `1.000`. We will see `1` in both cases. We also can't distinguish between `2e3` and `2000` as both are converted to `2000`. We also can't distinguish between the invalid `4e`, just `e` and an empty input - as we'll be called with `""` for all invalid values.

The examples above were just for Google Chrome which prevents typing non-numbers. In Firefox it's possible to enter any string into `<input type="number" />` input elements. So it could happen that a user enters "hello" into a numeric input - and our Form thinks the user entered nothing, as Firefox will call `onChange` with an event holding an empty string.

Something to be aware of is that our forms can't distinguish between an empty value and an invalid value in those cases. It might happen that our form state holds an empty string while the input is actually currently displaying an invalid value. You can play around with it in [this CodeSandbox](https://codesandbox.io/s/69rxm1413).

With this disclaimer out of the way, if you're only after a number it's fine to use `<input type="number" />` and let formik convert the value automatically.

If you try to build something with formatted numbers like `12.003,90` or `12,003.90` then you'll have to use `<input type="text" />`. You should only attempt to parse the number and format the value when the field is being blurred - not while the user is typing. Otherwise you could end up destroying the input - e.g. when the user types `00` you'd convert it to just `0` in case you try to format the input too early.

#### Enriching received data (e.g. adding additional languages to localized strings)

Let's now assume our product name should be localized. A name can be set for multiple locales. The data looks like this:

```js
{
  id: 'party-parrot',
  version: 1,
  name: {
    en: 'Party Parrot',
    de: 'Party Papagei',
    es: 'Loro fiesta',
  },
}
```

Imagine the data of our product is a bit older, and the russian locale has been added to the project in the meantime, while the spanish locale was removed.
Our goal is to show translations for all locales stored on the product itself (even the outdated spanish one), while also showing input fields all locales currently stored on the product. So ultimately we should be showing `en`, `de`, `es`, `ru` in this case.

We can't simply iterate over the languages defined on the project (`en`, `de`, `ru`) as we'd be missing `es`. And we can't simply iterate over the languages stored on the product (`en`, `de`, `es`) as we'd be missing `ru`.

Assume the project's locales are defined as `projectLocales = ['en', 'de', 'ru']`. We have to merge the locales in `docToFormValues`.

```js
const docToFormValues = (doc, projectLocales) => ({
  id: doc.id,
  version: doc.version,
  name: createLocalizedString(projectLocales, doc.name),
});
```

The `createLocalizedString` function ensures that a `{ [locale]: '' }` entry is set for each locale passed as the first argument, and then merges the already defined translations into that object.

This would produce

```js
{
  id: 'party-parrot',
  version: 1,
  name: {
    en: 'Party Parrot',
    de: 'Party Papagei',
    es: 'Loro fiesta',
    ru: '',
  },
}
```

Notice that we're now passing additional information (`projectLocales`) to `docToFormValues`. This is a new pattern which allows us to enrich the recieved document. This approach of passing additional information to `docToFormValues` can be used to enrich form values in many ways.

### Validation

#### Translating error messages

During validation, we create error objects like this:

```js
{
  values: { name: '' },
  touched: { name: true },
  errors: { name: { missing: true } }
}
```

As you can see, we use boolean indicators to mark errors for form fields.
This allows us to determine how to render an error message from the render function,
instead of having to determine it within the validation function.

For example, we can do

```js
<Formik
  render={(formik) => (
    <div>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formik.values.name}
      />
      {formik.touched &&
        formik.touched.name &&
        formik.errors &&
        formik.errors.name &&
        formik.errors.name.missing && <div>Required field</div>}
    </div>
  )}
/>
```

> Sidenote: Using the [optional chaining proposal (`?.`)](https://github.com/tc39/proposal-optional-chaining), we can shorten this code to
>
> ```js
> <Formik
>   render={(formik) => (
>     <div>
>       <input
>         type="text"
>         name="name"
>         onChange={handleChange}
>         value={formik.values.name}
>       />
>       {formik.touched?.name && formik.errors?.name?.missing && (
>         <div>Required field</div>
>       )}
>     </div>
>   )}
> />
> ```

We can now use any translation approach without having to intertwine it with validation:

```js
<Formik
  render={(formik) => (
    <div>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formik.values.name}
      />
      {formik.touched?.name && formik.errors?.name?.missing && (
        <FormattedMessage {...messages.requiredNameError} />
      )}
    </div>
  )}
/>
```

Having this control also allows us to render arbitrarily complex error messages right from our code.

#### Multiple errors on a single field

Using objects to keep track of errors for each field also has the benefit of allowing us to keep track of multiple errors for a single field.
An example error might look like this

```js
{
  values: { name: '', password: 'h i' },
  touched: { name: true, password: true },
  errors: {
    name: { missing: true },
    password: { tooShort: true, containsSpaces: true },
  }
}
```

This allows us to warn a user of multiple errors at once.

#### Mapping async errors after submission back onto the form

Let's assume our product also has a field where users may enter a unique `slug` for the product. As we have millions of products, we can't load all existing slugs upfront so we need to validate when the product is saved.

Our product data looks like this:

```js
{
  id: 'party-parrot',
  version: 1,
  name: 'Party Parrot',
  slug: 'party-parrot'
}
```

Let's assume the `updateProduct` function will reject the update with an `{code: 'DuplicateSlugError' }` in case we attempt to save the product.

We can now pass an `onSubmit` function to Formik which handles this error:

```js
<Formik
  onSubmit={(formValues, formik) => {
    const nextProduct = formValuesToDoc(formValues);

    return updateProduct({
      id: formValues.id,
      version: formValues.version,
      product: nextProduct,
    }).then(
      // When things go smoothly and the slug was not used yet
      (updatedProduct) => {
        // Calling resetForm with the updated product will
        // update the form values and reset the submission state,
        // touched keys and so on.
        formik.resetForm({
          values: docToForm(updatedProduct, props.intl.locale),
        });
      },
      // When the slug was already used, or when any other error happens
      (error) => {
        // This is an example where we have to rely on the API
        // on submission time to ensure correct form values.
        // The example shows how to map API errors back onto
        // specific fields within the form.
        if (error.code === 'DuplicateSlugError') {
          formik.setErrors({ slug: { duplicate: true } });
        }
        // Since we might do things like retrying a request in case
        // there was an error with it, we are responsible for
        // resetting the submission state.
        formik.setSubmitting(false);
      }
    );
  }}
/>
```

After a user attempts to submit with a duplicate slug, this will set a Formik
error like so:

```js
{
  values: { name: 'Party Parrot', slug: 'party-parrot' },
  touched: { name: true, slug: true },
  errors: { slug: { duplicate: true } }
}
```

We can then use this information to render the error. This solves the problem of
mapping async errors back to the form.

Of course it's possible to also build async validation while the user fills out
the form, but this check is the basis of that. It needs to be there in any case,
as the slug could get duplicated between the time we validate the users input and
the time the user actually submits the form.

Something else which could be improved is to validate the slug is using valid
characters only. We can use our old `validate` function for that. The errors
can be attached to `errors.slug`.

### Single inputs to determine multiple values (e.g. `MoneyInput`)

Sometimes we want to build input elements which deal with multiple values at once.
One such element is our [`MoneyInput`](https://uikit.commercetools.com/?selectedKind=Inputs&selectedStory=MoneyInput). It allows to set a currency and an amount by using a dropdown for the currency and an input for the amount.

The value produced by `MoneyInput` is represented as `{ currencyCode: 'EUR', amount: '2.00' }`

> Sidenote: As the `MoneyInput` uses monetary formatting, we are using a text-input. This allows us to format values properly (e.g. by adding the trailing ".00") without browsers messing with the input. It also allows us to use decimal separators, e.g. for "1,000.00".

We can construct our Formik value like this:

```js
{
  id: 'party-parrot',
  version: 1,
  name: 'Party Parrot',
  price: { currencyCode: 'EUR', amount: '2.00' }
}
```

How do we now build a single input which receives `{ currencyCode: 'EUR', amount: '2.00' }` as its value and is able to change both using Formik's `handleChange`? We want to be able to render `<MoneyInput onChange={handleChange} onBlur={handleBlur} />` to make it as straightforward as using `<input type="text" />`.

There are two approaches:

- We can ensure `MoneyInput` always calls `onChange` with a full value like `{ currencyCode: 'EUR', amount: '2.00' }`
- We can adapt the input names to be `price.currencyCode` or `price.amount` respectively. Formik will read that name and set the nested value only.

If we were to go with the first approach, we'd need to fake `event.target.name` in `onBlur` as well, otherwise formik would set `{ touched: { price: true } }` instead of `{ touched: { price: { amount: true, currencyCode: true } } }`.
That is bad, as Formik will set `{ touched: { price: { amount: true, currencyCode: true } } }` once the form is submitted - so we end up with a `touched` state which changes shape!
There is a CodeSandbox which illustrates this problem. Try changing the price and keep an eye on the `touched` state. Then submit the form, and you'll see a different `touched` state.

If we were to accept changes to the shape of our `touched` state, we'd need to tak the different shapes into consideration every time we work with the `touched` shape and it just generally makes things harder to follow.

So it's better to go with the second approach right away. We amend the names of the inputs by adding the `.amount` and `.currencyCode` suffix to their names and ids. When a parent doesn't pass in a name/id, we omit the property from the underlying input. This has solved that problem nicely for us.

### Form values need to be shown in a user-friendly format

As mentioned above, our `MoneyInput` consists of two parts: an currency selector and an amount input.

We want the amount to be formatted like a monetary value, e.g. "200.00" or "2,000.00". However, the data we receive from our fictitious API looks like this: `{ currencyCode: 'EUR', centAmount: 200 }` for 2€.

How do we go about formatting the value properly? As our form values always hold the actual value entered by the user, we need to format the initial value in `docToFormValues` already.

Our ideal format should:

- use separators based on the users locale (`2.000,00` vs `2,000.00`)
- apply a number of fraction digits based on the currency as some currencies use more/less than 2 fraction digits (`2,000.00` vs `2,000.000`)

A `locale` defines which separators to use. The money value itself already contains a `currencyCode`, which we can use to determine the number of fraction digits.

To format the value, we thus only need to pass a `locale` to `docToFormValues`:

```js
const docToFormValues = (doc, { locale }) => ({
  id: doc.id,
  name: doc.name,
  price: formatMoneyValue(doc.price, locale),
});
```

We could now create a `formatMoneyValue` function which takes `{ currencyCode: 'EUR', centAmount: 200 }`, the `locale`, derives the separators and number of fraction digits from these and returns a formatted money. The `MoneyInput` we use would likely want to format the value whenever a users blurs the input field as well, so it could reuse that `formatMoneyValue` function.

In UI-Kit we provide these conversion functions as static methods on the input elements. For example, you could use `MoneyInput.parseMoneyValue(moneyValue, locale)` to convert the money-value to a human-readable representation.

### Preventing concurrent modifications

This section is about ensuring the document was not modified by someone else after we started editing it, to avoid overwriting their changes.

Let's say that a user is using our form to edit a product. As you've seen, our products typically have a `version` property associated with them. The version is incremented by the server every time changes are made to that product.

```js
{
  id: 'party-parrot',
  version: 1,
  name: 'Party Parrot',
}
```

When we call `updateProduct`, we provide the `id` and the `version` we modified. When the `version` for that product on the server is newer than the `version` we've sent, we know that somebody else has made changes in the meantime - and our update is rejected as we might be overwriting their changes. In case the our version was outdated, our server responds with a `{ code: 'ConcurrentModificationError' }` error.

As the data of the product might change at any time (as something could fetch a newer version), we don't want our Form to reinitialize when that data changes. So we generally avoid setting `enableReinitialize` on Formik. This is also useful to ensure that we send the `version` back to the server which we started editing, by making the `id` and `version` part of our form values:

```js
const docToFormValues = (doc) => ({
  id: doc.id,
  version: doc.version,
  // ...other fields
});
```

This lets us read the `id` and `version` from `onSubmit={(values) => { values.id; values.version; }}` when the form is submitted. It also prevents updates to the source data from overwriting the `id` or `version` of the draft we are editing. We can further inspect the error returned from `updateProduct`, check for the `ConcurrentModificationError` and handle it accordingly, e.g. by showing a notification.
