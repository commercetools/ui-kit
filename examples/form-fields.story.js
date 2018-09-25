import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Formik } from 'formik';
import { action } from '@storybook/addon-actions';
import omitEmpty from 'omit-empty';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs } from '@storybook/addon-knobs';
import { FormikBox, Section } from '../.storybook/decorators';
import {
  Text,
  TextField,
  NumberField,
  MoneyField,
  PrimaryButton,
  SecondaryButton,
  Spacings,
} from '../src';
import Forms from './form-fields.md';

// utilities for story
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// This data would usually be loaded from the project itself.
// It is defined statically here to keep the example focused on the forms.
const currencies = ['EUR', 'USD'];

// This compnents fakes the data source.
// The form does not care where data is coming from.
// Transforming the data before initialzing the form means that the form
// continues working even when the data shape changes.
// We only need to update docToForm and formToDoc in that case.
// This makes the form flexible, we can easily move the data source from
// the CTP API to GraphQL.
class FakeConnector extends React.Component {
  static displayName = 'FakeConnector';
  static propTypes = { children: PropTypes.func.isRequired };
  product = {
    id: 'product-id-1',
    version: 1,
    key: 'shoe',
    price: { currencyCode: 'EUR', centAmount: 300 },
    inventory: 30,
  };
  updateProduct = ({ id, version, product }) => {
    action('updating product', { id, version, product });
    if (product.key === 'taken-key') {
      return delay(200).then(() => {
        const error = new Error('duplicate-key');
        error.code = 'DuplicateKeyError';
        throw error;
      });
    }
    return delay(1000).then(() => ({
      ...product,
      version: product.version + 1,
    }));
  };
  render() {
    return this.props.children({
      product: this.product,
      updateProduct: this.updateProduct,
    });
  }
}

// Beginning of the actual implementation of the form and its helpers

// This function is used to transform the document returned by the API to
// the values the form will deal with.
// When the form needs to display additional information which is not
// editable in the form, it has so far proven better to keep this information
// out of the form values.
const docToForm = doc => ({
  // Keeping the id in the form values ensures data is not mixed accidentally
  id: doc.id,
  // Why the version should be part of the form values:
  //
  // TL;DR: Keeping the version as part of the form values prevents accidental
  // concurrent modifications. Keep the id and version in the form values.
  //
  // The id and version should be part of the form values, otherwise it could
  // happen that another component causes a refetch of some data and the
  // version. This would lead to the version being incremented in the Apollo
  // cache. The form will not reinitialize with the new data. The form uses the
  // data provided when first opened. When the user would submit the form,
  // we would read the version from the cache (where it has increased).
  // We would thus skip the APIs ConcurrentModificationError, but the user has
  // never seen the updated version of the data. This is quite bad and can lead
  // to accidental loss of data. By keeping the version in the form values
  // instead an update of the version in the Apollo Cache does not affect the.
  // form. On submission the version from the form values will be used, and the
  // user will see the APIs ConcurrentModificationError as expected!
  version: doc.version,
  key: doc.key,
  // The inventory should either be an empty string or a number. The inventory
  // could be undefined, in which case toFormValue will set it to an empty
  // string. This eases validation later on, as we don't have to deal with
  // undefined anymore.
  inventory: NumberField.toFormValue(doc.inventory),
  // parseMoneyValue will ensure that the price field will have currencyCode and
  // amount filled out or set to empty strings. This reduces the cases we
  // need to deal with (amount, currencyCode or the whole object being
  // undefined).
  price: MoneyField.parseMoneyValue(doc.price),
});

// When the form gets submitted, we transform the form values back to a document
// which can then be used by the rest of the application.
// The docToForm and formToDoc functions decouple the form implemenation
// from the rest of the application.
// When the forms implemenation changes, we only need to adapt docToForm and
// formToDoc instead of the whole application.
const formToDoc = formValues => ({
  id: formValues.id,
  version: formValues.version,
  key: formValues.key,
  inventory: formValues.inventory,
  price: MoneyField.convertToMoneyValue(formValues.price),
});

// The validate function is responsible for determining the form's validation
// erros. We have decided to use boolean properties to keep track of errors.
// This has the advantage that it's easy to write PropType validations,
// multiple errors can be present on a field at the same time, and
// API-errors can easily be mapped onto any field
// As we're very strict when initializing the form, we can count on any value
// either being a string or a number, or an object containing such. We never
// have to check for undefined values.
const validate = formValues => {
  // To make it easier to attach errors during validation, we initialize
  // all form fields to empty objects.
  const errors = {
    key: {},
    inventory: {},
    price: {},
  };

  // validate key
  // Input elements usually provide a way to check whether it's value is empty
  // This is useful to determine whether a required value was not filled out.
  if (TextField.isEmpty(formValues.key)) errors.key.missing = true;

  // validate inventory
  if (NumberField.isEmpty(formValues.inventory)) {
    errors.inventory.missing = true;
  } else {
    // When the value is not empty, we can assume that it is a number
    if (formValues.inventory < 0) errors.inventory.negative = true;
    if (NumberField.hasFractionDigits(formValues.inventory))
      errors.inventory.fractions = true;
  }

  // validate price
  if (MoneyField.isEmpty(formValues.price)) {
    errors.price.missing = true;
  } else if (MoneyField.isHighPrecision(formValues.price)) {
    errors.price.unsupportedHighPrecision = true;
  }

  // Formik will think there are errors when the object returned as a
  // validation result has at least one key. We therefore have to omit
  // all empty fields inside the error object.
  // When an empty object is returned, formik will assume there were no errors
  return omitEmpty(errors);
};

class ProductForm extends React.Component {
  static displayName = 'ProductForm';
  static propTypes = {
    formik: PropTypes.shape({
      values: PropTypes.shape({
        version: PropTypes.number.isRequired,
        key: PropTypes.string.isRequired,
        // Formik provides us with either a number or an empty string in case
        // the value can not be parsed
        inventory: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        price: PropTypes.shape({
          amount: PropTypes.string.isRequired,
          currencyCode: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      touched: PropTypes.shape({
        key: PropTypes.bool,
        inventory: PropTypes.bool,
        price: PropTypes.shape({
          amount: PropTypes.bool,
          currencyCode: PropTypes.bool,
        }),
      }),
      errors: PropTypes.shape({
        key: PropTypes.shape({
          missing: PropTypes.bool,
          duplicate: PropTypes.bool,
        }),
        inventory: PropTypes.shape({
          negative: PropTypes.bool,
          fractions: PropTypes.bool,
          missing: PropTypes.bool,
        }),
        price: PropTypes.shape({
          missing: PropTypes.bool,
          unsupportedHighPrecision: PropTypes.bool,
        }),
      }).isRequired,
      dirty: PropTypes.bool.isRequired,
      handleChange: PropTypes.func.isRequired,
      handleBlur: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      handleReset: PropTypes.func.isRequired,
      isSubmitting: PropTypes.bool.isRequired,
    }).isRequired,
  };
  render() {
    return (
      <Spacings.Stack scale="m">
        <TextField
          title="Key"
          name="key"
          value={this.props.formik.values.key}
          onChange={this.props.formik.handleChange}
          onBlur={this.props.formik.handleBlur}
          isDisabled={this.props.formik.isSubmitting}
          touched={this.props.formik.touched.key}
          errors={this.props.formik.errors.key}
          renderError={key => {
            // This example shows how to handle custom errors on top of the
            // predefined errors of FieldErrors which this component and other
            // Field components use under the hood.
            switch (key) {
              case 'duplicate':
                return 'This key is already in use. Keys must be unique.';
              default:
                return null;
            }
          }}
        />
        <NumberField
          title="Inventory Quantity"
          name="inventory"
          isRequired={true}
          value={this.props.formik.values.inventory}
          onChange={this.props.formik.handleChange}
          onBlur={this.props.formik.handleBlur}
          touched={this.props.formik.touched.inventory}
          errors={this.props.formik.errors.inventory}
          renderError={key => {
            switch (key) {
              // Shows how to overwrite a default message of FieldErrors
              case 'fractions':
                return 'Inventory must be a whole number.';
              default:
                return null;
            }
          }}
        />
        <MoneyField
          title="Price"
          name="price"
          isRequired={true}
          value={this.props.formik.values.price}
          onChange={this.props.formik.handleChange}
          onBlur={this.props.formik.handleBlur}
          currencies={currencies}
          touched={this.props.formik.touched.price}
          errors={this.props.formik.errors.price}
          renderError={key => {
            switch (key) {
              // Shows how to overwrite a default message of FieldErrors
              case 'unsupportedHighPrecision':
                return 'This value is a high precision value. High precision pricing is not supported for products.';
              default:
                return null;
            }
          }}
        />
        <Spacings.Inline>
          <SecondaryButton
            onClick={this.props.formik.handleReset}
            isDisabled={this.props.formik.isSubmitting}
            label="Reset"
          />
          <PrimaryButton
            onClick={this.props.formik.handleSubmit}
            isDisabled={
              this.props.formik.isSubmitting || !this.props.formik.dirty
            }
            label="Submit"
          />
        </Spacings.Inline>
        <Text.Detail>
          Product is at version {this.props.formik.values.version}.
        </Text.Detail>
      </Spacings.Stack>
    );
  }
}

storiesOf('Examples|Forms/Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Forms))
  .add('Basic Formik Example', () => (
    <Section>
      <FakeConnector>
        {({ product, updateProduct }) => (
          <Formik
            initialValues={docToForm(product)}
            validate={validate}
            onSubmit={(formValues, formik) => {
              action('values of form submission')(formValues);
              const nextProduct = formToDoc(formValues);
              // Usually, we would compute update actions here by comparing
              // nextProduct to the product from FakeConnector.
              // We would then use formValues.id and formValues.version
              // to send the update action to the server through the connector
              return updateProduct({
                // As explained in the beginning of this document, sending
                // the id and version from formValues along prevents
                // accidental concurrent modifications and ensures the user
                // will run into the ConcurrentModificationError int those
                // cases
                id: formValues.id,
                version: formValues.version,
                product: nextProduct,
              }).then(
                updatedProduct => {
                  // Calling resetForm with the updated product will
                  // update the form values and reset the submission state,
                  // touched keys and so on.
                  formik.resetForm(docToForm(updatedProduct));
                },
                error => {
                  // This is an example where we have to rely on the API
                  // on submission time to ensure correct form values.
                  // The example shows how to map API errors back onto
                  // specific fields within the form.
                  if (error.code === 'DuplicateKeyError') {
                    formik.setErrors({ key: { duplicate: true } });
                  }
                  // Since we might do things like retrying a request in case
                  // there was an error with it, we are responsible for
                  // resetting the submission state.
                  formik.setSubmitting(false);
                }
              );
            }}
            render={formik => (
              <Spacings.Stack scale="l">
                <Text.Headline elementType="h2">The form</Text.Headline>
                <div>
                  <ProductForm formik={formik} />
                </div>
                <hr />
                <FormikBox formik={formik} />
              </Spacings.Stack>
            )}
          />
        )}
      </FakeConnector>
    </Section>
  ));
