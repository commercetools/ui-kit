# Forms

This story shows how to build a form using Formik and UI-Kit components. The form shows how to initialize the values based on existing data, how to validate the form and how to submit changed data back to an API. It also shows how to handle API errors.

Make sure to also check the source-code of the story. It contains code comments explaining the usage of the APIs and how it all comes together.

## Things to try

- Clear values of fields and submit
- Use a key called `taken-key` to see API errors mapped back to form
- Enter a high-precision price (add more than 2 fraction digits to the price)

## Things to notice

- Form is disabled during submission
- Errors are only shown after the first blur, not while typing
- Errors clear as the user changes values
- High precision pricing is disabled on a form-level. The input is not aware of this.
- After updating the product, the form is reinitialized with the updated product
