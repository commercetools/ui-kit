# Form Inputs

This story shows how to build a form using Formik and UI-Kit input components. The form shows how to initialize the values based on existing data, how to validate the form and how to submit changed data back to an API. It also shows how to handle API errors.

Make sure to also check the source-code of the story. It contains code comments explaining the usage of the APIs and how it all comes together.

## Things to try

- Clear values of fields and submit
- Use a key called `taken-key` to see API errors mapped back to form
- Enter a high-precision price (add more than 2 fraction digits to the price)
- Enter a negative inventory quantity
- Enter a inventory quantity with fraction digits
- Make a slug invalid by adding a space to it

## Things to notice

- Form is disabled during submission
- Errors are only shown after the first blur, not while typing
- Errors clear as the user changes values
- High precision pricing is disabled on a form-level. The input is not aware of this.
- After updating the product, the form is reinitialized with the updated product (version increases)
- Version is kept in form values to avoid accidental concurrent modifications
- Multiple errors can be present on a field at the same time (enter a negative inventory quantity with fraction digits)

## If you're lazy

..you can watch [this screen recording](https://user-images.githubusercontent.com/1765075/42410286-9b1b3322-81e7-11e8-8332-38fa3142f7b8.gif) instead. It will walk you through the form. It probably won't get updated as this story improves though.
