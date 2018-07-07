import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { Formik } from 'formik';
import { action } from '@storybook/addon-actions';
import omitEmpty from 'omit-empty';
import withReadme from 'storybook-readme/with-readme';
import Section from '../.storybook/decorators/section';
import Spacings from '../materials/spacings';
import Text from '../typography/text';
import ErrorMessage from '../messages/error-message';
import TextInput from '../inputs/text-input';
import NumberInput from '../inputs/number-input';
import MoneyInput from '../inputs/money-input';
import LocalizedTextInput from '../inputs/localized-text-input';
import PrimaryButton from '../buttons/primary-button';
import SecondaryButton from '../buttons/secondary-button';
import Forms from './forms.md';

// utilities for story
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// This data would usually be loaded from the project itself.
// It is defined statically here to keep the example focused on the forms.
const currencies = ['EUR', 'USD'];
const resourceLanguages = ['en', 'de', 'pt'];

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
    name: { en: 'Shoe', de: 'Schuh' },
    inventory: 30,
    price: { currencyCode: 'EUR', centAmount: 300 },
  };
  updateProduct = product => {
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

const hasFractionDigits = number => number % 1 !== 0;

// This function is used to transform the document returned by the API to
// the values the form will deal with.
// When the form needs to display additional information which is not
// editable in the form, it has so far proven better to keep this information
// out of the form values.
//
const docToForm = doc => ({
  // Keeping the id in the form values ensures data is not mixed accidentally
  id: doc.id,
  // Why the version should be part of the form values:
  // The id and version should be part of the form values. Otherwise it could
  // could happen that another component caueses a refetch of some data and the
  // version. This would lead to the version being incremented in the Apollo
  // cache. The form will not reinitialize with the new data. The form uses the
  // data provided when first opened. When the user would submit the form,
  // we would read the version from the cache (where it has increased).
  // We would thus skip the APIs ConcurrentModificationError, but the user has
  // never seen the updated version of the data. This is quite bad and can lead
  // to accidental loss of data. By keeping the version in the form values instead
  // an update of the version in the Apollo Cache does not affect the form. On
  // submission the version from the form values will be used, and the user will
  // see the APIs ConcurrentModificationError as expected!
  // TL;DR: Keeping the version as part of the form values prevents accidental
  // concurrent modifications. Keep the id and version in the form values.
  version: doc.version,
  key: doc.key,
  // The name is initialized with all supported languages set to their value
  // or an empty string. This circumvents a lot of edge cases where we'd otherwise
  // have to deal with either undefined or an empty string, or a filled string.
  name: LocalizedTextInput.createLocalizedString(resourceLanguages, doc.name),
  // The inventory should either an empty string or a number. The inventory could
  // be undefined, in which case toFormValue will set it to an empty string.
  // This eases validation later on, as we don't have to deal with undefined
  // anymore.
  inventory: NumberInput.toFormValue(doc.inventory),
  price: MoneyInput.parseMoneyValue(doc.price),
});

const formToDoc = formValues => ({
  id: formValues.id,
  version: formValues.version,
  key: formValues.key,
  name: formValues.name,
  inventory: formValues.inventory,
  price: MoneyInput.convertToMoneyValue(formValues.price),
});

const validate = formValues => {
  const errors = { price: {}, inventory: {} };

  // validate key
  if (formValues.key.trim().length === 0) errors.key = { missing: true };

  // validate name
  if (LocalizedTextInput.isEmpty(formValues.name))
    errors.name = { missing: true };

  // validate price
  const price = MoneyInput.convertToMoneyValue(formValues.price);
  if (!price) {
    errors.price.invalid = true;
  } else if (price.type === 'highPrecision') {
    errors.price.unsupportedHighPrecision = true;
  }

  // validate inventory
  // We don't have to trim. Formik will do this for us.
  if (formValues.inventory === '') {
    errors.inventory.missing = true;
  } else {
    if (formValues.inventory < 0) errors.inventory.negative = true;
    if (hasFractionDigits(formValues.inventory))
      errors.inventory.fractions = true;
  }

  return omitEmpty(errors);
};

class ProductForm extends React.Component {
  static displayName = 'ProductForm';
  static propTypes = {
    formik: PropTypes.shape({
      values: PropTypes.shape({
        version: PropTypes.number.isRequired,
        key: PropTypes.string.isRequired,
        name: PropTypes.objectOf(PropTypes.string).isRequired,
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
        name: PropTypes.objectOf(PropTypes.bool),
        inventory: PropTypes.bool,
        price: PropTypes.shape({
          amount: PropTypes.bool,
          currencyCode: PropTypes.bool,
        }),
      }),
      errors: PropTypes.shape({
        name: PropTypes.shape({ missing: PropTypes.bool }),
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
          invalid: PropTypes.bool,
          unsupportedHighPrecision: PropTypes.bool,
        }),
      }).isRequired,
      handleChange: PropTypes.func.isRequired,
      handleBlur: PropTypes.func.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      handleReset: PropTypes.func.isRequired,
      isSubmitting: PropTypes.bool.isRequired,
    }).isRequired,
  };
  render() {
    return (
      <Spacings.Stack scale="l">
        <div>
          <LocalizedTextInput
            name="name"
            value={this.props.formik.values.name}
            onChange={this.props.formik.handleChange}
            onBlur={this.props.formik.handleBlur}
            isDisabled={this.props.formik.isSubmitting}
            selectedLanguage="en"
            error={this.props.formik.errors.name}
          />
        </div>
        <div>
          <TextInput
            name="key"
            value={this.props.formik.values.key}
            onChange={this.props.formik.handleChange}
            onBlur={this.props.formik.handleBlur}
            isDisabled={this.props.formik.isSubmitting}
            hasError={Boolean(
              this.props.formik.touched.key && this.props.formik.errors.key
            )}
          />
          {/*
            You could also use the ValidationError components from
            core/components/validation-error to avoid having to write the
            access manually.
            They are not used in this example to clearly illustrate how
            the underlying formik properties should be used.
          */}
          {this.props.formik.touched.key &&
            this.props.formik.errors.key &&
            this.props.formik.errors.key.missing && (
              <ErrorMessage>Missing key</ErrorMessage>
            )}
          {this.props.formik.touched.key &&
            this.props.formik.errors.key &&
            this.props.formik.errors.key.duplicate && (
              <ErrorMessage>
                This key is already in use. Keys must be unique.
              </ErrorMessage>
            )}
        </div>
        <div>
          <NumberInput
            name="inventory"
            value={this.props.formik.values.inventory}
            onChange={this.props.formik.handleChange}
            onBlur={this.props.formik.handleBlur}
            hasError={
              this.props.formik.touched.inventory &&
              Boolean(this.props.formik.errors.inventory)
            }
          />
          {this.props.formik.touched.inventory &&
            this.props.formik.errors.inventory &&
            this.props.formik.errors.inventory.negative && (
              <ErrorMessage>Negative quantity is not supported</ErrorMessage>
            )}
          {this.props.formik.touched.inventory &&
            this.props.formik.errors.inventory &&
            this.props.formik.errors.inventory.fractions && (
              <ErrorMessage>Inventory must be a whole number</ErrorMessage>
            )}
          {this.props.formik.touched.inventory &&
            this.props.formik.errors.inventory &&
            this.props.formik.errors.inventory.missing && (
              <ErrorMessage>The inventory information is required</ErrorMessage>
            )}
        </div>
        <div>
          <MoneyInput
            name="price"
            value={this.props.formik.values.price}
            onChange={this.props.formik.handleChange}
            onBlur={this.props.formik.handleBlur}
            currencies={currencies}
            isDisabled={this.props.formik.isSubmitting}
            hasAmountError={Boolean(
              this.props.formik.touched.price &&
                this.props.formik.touched.price.amount &&
                this.props.formik.errors.price
            )}
          />
          {MoneyInput.isTouched(this.props.formik.touched.price) &&
            this.props.formik.errors.price &&
            this.props.formik.errors.price.invalid && (
              <ErrorMessage>Missing price</ErrorMessage>
            )}
          {MoneyInput.isTouched(this.props.formik.touched.price) &&
            this.props.formik.errors.price &&
            this.props.formik.errors.price.unsupportedHighPrecision && (
              <ErrorMessage>
                This value is a high precision value. High precision pricing is
                not supported for products.
              </ErrorMessage>
            )}
        </div>
        <Spacings.Inline>
          <SecondaryButton
            onClick={this.props.formik.handleReset}
            isDisabled={this.props.formik.isSubmitting}
            label="Reset"
          />
          <PrimaryButton
            onClick={this.props.formik.handleSubmit}
            isDisabled={this.props.formik.isSubmitting}
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

storiesOf('Examples', module)
  .addDecorator(withReadme(Forms))
  .add('Forms', () => (
    <IntlProvider locale="en">
      <Section>
        <FakeConnector>
          {({ product, updateProduct }) => (
            <Formik
              initialValues={docToForm(product)}
              validate={validate}
              onSubmit={(formValues, formik) => {
                action('values of form submission')(formValues);
                const nextProduct = formToDoc(formValues);
                return updateProduct(nextProduct).then(
                  updatedProduct => {
                    formik.resetForm(docToForm(updatedProduct));
                  },
                  error => {
                    if (error.code === 'DuplicateKeyError') {
                      formik.setErrors({ key: { duplicate: true } });
                    }
                    formik.setSubmitting(false);
                  }
                );
              }}
              render={formik => (
                <Spacings.Stack scale="xl">
                  <div>
                    <h3>The form</h3>
                    <ProductForm formik={formik} />
                  </div>
                  <hr />
                  <div>
                    <h3>formik.values</h3>
                    <pre>{JSON.stringify(formik.values, null, 2)}</pre>
                  </div>
                  <div>
                    <h3>formik.touched</h3>
                    <pre>{JSON.stringify(formik.touched, null, 2)}</pre>
                  </div>
                  <div>
                    <h3>formik.errors</h3>
                    <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
                  </div>
                </Spacings.Stack>
              )}
            />
          )}
        </FakeConnector>
      </Section>
    </IntlProvider>
  ));
