import { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Formik } from 'formik';
import { injectIntl } from 'react-intl';
import { action } from '@storybook/addon-actions';
import omitEmpty from 'omit-empty-es';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import {
  Text,
  ErrorMessage,
  TextInput,
  NumberInput,
  MoneyInput,
  MultilineTextInput,
  LocalizedTextInput,
  PrimaryButton,
  SecondaryButton,
  Spacings,
} from '../../presets/ui-kit';
import { FormikBox, Section } from '../.storybook/decorators';
import Forms from './form-inputs.md';

// utilities for story
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
class FakeConnector extends Component {
  static displayName = 'FakeConnector';
  static propTypes = { children: PropTypes.func.isRequired };
  product = {
    id: 'product-id-1',
    version: 1,
    key: 'shoe',
    name: { en: 'Shoe', de: 'Schuh' },
    slug: { en: 'shoe', de: 'schuh' },
    inventory: 30,
    price: { currencyCode: 'EUR', centAmount: 300 },
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
const docToForm = (doc, locale) => ({
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
  // The name is initialized with all supported languages set to their value
  // or an empty string. This circumvents a lot of edge cases where we'd
  // otherwise have to deal with either undefined or an empty string, or a
  // filled string.
  name: LocalizedTextInput.createLocalizedString(resourceLanguages, doc.name),
  slug: LocalizedTextInput.createLocalizedString(resourceLanguages, doc.slug),
  // The product does not contain a "description" field by default. However,
  // the form expects description to be a string. Hence, we have to fall back
  // to a string here!
  description: doc.description || '',
  // The inventory should either be an empty string or a number. The inventory
  // could be undefined, in which case toFormValue will set it to an empty
  // string. This eases validation later on, as we don't have to deal with
  // undefined anymore.
  inventory: NumberInput.toFormValue(doc.inventory),
  // parseMoneyValue will ensure that the price field will have currencyCode and
  // amount filled out or set to empty strings. This reduces the cases we
  // need to deal with (amount, currencyCode or the whole object being
  // undefined).
  price: MoneyInput.parseMoneyValue(doc.price, locale),
});

// When the form gets submitted, we transform the form values back to a document
// which can then be used by the rest of the application.
// The docToForm and formToDoc functions decouple the form implemenation
// from the rest of the application.
// When the forms implemenation changes, we only need to adapt docToForm and
// formToDoc instead of the whole application.
const formToDoc = (formValues, locale) => ({
  id: formValues.id,
  version: formValues.version,
  key: formValues.key,
  name: formValues.name,
  slug: formValues.slug,
  description: formValues.description,
  inventory: formValues.inventory,
  price: MoneyInput.convertToMoneyValue(formValues.price, locale),
});

// The validate function is responsible for determining the form's validation
// erros. We have decided to use boolean properties to keep track of errors.
// This has the advantage that it's easy to write PropType validations,
// multiple errors can be present on a field at the same time, and
// API-errors can easily be mapped onto any field
// As we're very strict when initializing the form, we can count on any value
// either being a string or a number, or an object containing such. We never
// have to check for undefined values.
const validate = (formValues, locale) => {
  // To make it easier to attach errors during validation, we initialize
  // all form fields to empty objects.
  const errors = {
    key: {},
    name: {},
    slug: {},
    description: {},
    inventory: {},
    price: {},
  };

  // validate key
  // Input elements usually provide a way to check whether it's value is empty
  // This is useful to determine whether a required value was not filled out.
  if (TextInput.isEmpty(formValues.key)) errors.key.missing = true;

  // validate name
  // A localized string is considered empty when no translation is given at all
  if (LocalizedTextInput.isEmpty(formValues.name)) errors.name.missing = true;

  // validate slug
  // A slug must match [a-zA-Z0-9_-]{2,256}
  // The error object of the slug is
  //  {
  //    missing: Boolean,
  //    translations: { de: { hasForbiddenChars: Boolean }, ... },
  //  }
  // The "missing" part is used to highlight all fields, while the
  // "translations" part gets mapped to errors per translation.
  if (LocalizedTextInput.isEmpty(formValues.slug)) {
    errors.slug.missing = true;
  } else {
    const isValidSlug = (value) => /^[a-zA-Z0-9_-]{2,256}$/.test(value);
    const translationErrors = Object.keys(
      LocalizedTextInput.omitEmptyTranslations(formValues.slug)
    ).reduce((acc, language) => {
      const value = isValidSlug(formValues.slug[language])
        ? {}
        : { hasForbiddenChars: true };
      return {
        ...acc,
        [language]: value,
      };
    }, {});

    errors.slug.translations = translationErrors;
  }

  // validate description
  if (MultilineTextInput.isEmpty(formValues.description))
    errors.description.missing = true;

  // validate inventory
  if (NumberInput.isEmpty(formValues.inventory)) {
    errors.inventory.missing = true;
  } else {
    // When the value is not empty, we can assume that it is a number
    if (formValues.inventory < 0) errors.inventory.negative = true;
    if (NumberInput.hasFractionDigits(formValues.inventory))
      errors.inventory.fractions = true;
  }

  // validate price
  if (MoneyInput.isEmpty(formValues.price)) {
    errors.price.missing = true;
  } else if (MoneyInput.isHighPrecision(formValues.price, locale)) {
    errors.price.unsupportedHighPrecision = true;
  }

  // Formik will think there are errors when the object returned as a
  // validation result has at least one key. We therefore have to omit
  // all empty fields inside the error object.
  // When an empty object is returned, formik will assume there were no errors
  return omitEmpty(errors);
};

class ProductForm extends Component {
  static displayName = 'ProductForm';
  static propTypes = {
    formik: PropTypes.shape({
      values: PropTypes.shape({
        version: PropTypes.number.isRequired,
        key: PropTypes.string.isRequired,
        name: PropTypes.objectOf(PropTypes.string).isRequired,
        slug: PropTypes.objectOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
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
        slug: PropTypes.objectOf(PropTypes.bool),
        description: PropTypes.bool,
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
        name: PropTypes.shape({ missing: PropTypes.bool }),
        slug: PropTypes.shape({
          missing: PropTypes.bool,
          // For example: { en: { hasForbiddenChars: true } }
          translations: PropTypes.objectOf(PropTypes.objectOf(PropTypes.bool)),
        }),
        description: PropTypes.shape({ missing: PropTypes.bool }),
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
    selectedLanguage: PropTypes.string.isRequired,
  };
  render() {
    return (
      <Spacings.Stack scale="m">
        <div>
          {/*
            The Text.Body labels used in this example are temprary as we don't
            have FieldLabel or any InputField-compoennts in the UI-Kit yet.
            You would probably use the LabelField component form core instead.

            When adding a label, make sure the label can be clicked to focus
            the component. This is usually done by associating a "for" property
            on the label with the id of an input element.
          */}
          <Text.Body>Product name*</Text.Body>
          <LocalizedTextInput
            name="name"
            value={this.props.formik.values.name}
            onChange={this.props.formik.handleChange}
            onBlur={this.props.formik.handleBlur}
            isDisabled={this.props.formik.isSubmitting}
            selectedLanguage={this.props.selectedLanguage}
            hasError={
              LocalizedTextInput.isTouched(this.props.formik.touched.name) &&
              this.props.formik.errors.name &&
              this.props.formik.errors.name.missing
            }
          />
          {LocalizedTextInput.isTouched(this.props.formik.touched.name) &&
            this.props.formik.errors.name &&
            this.props.formik.errors.name.missing && (
              // The LocalizedTextInput provides a generic default message
              // when it is a required field and values are missing
              // It is also possible to use a custom, more detailed error
              // message as shown on the example below (the slug)
              <LocalizedTextInput.RequiredValueErrorMessage />
            )}
        </div>
        <div>
          <Text.Body>Slug*</Text.Body>
          <Text.Detail>
            The slug can contain alphanumeric characters (0-9 or A-Z),
            underscores or hyphens with no spaces, and can be anywhere between 2
            to 256 characters long.
          </Text.Detail>
          <LocalizedTextInput
            name="slug"
            value={this.props.formik.values.slug}
            onChange={this.props.formik.handleChange}
            onBlur={this.props.formik.handleBlur}
            isDisabled={this.props.formik.isSubmitting}
            selectedLanguage={this.props.selectedLanguage}
            hasError={
              // When the field is requried but no value is given, then we
              // highlight every input to indicate the missing value
              this.props.formik.touched.slug &&
              this.props.formik.errors.slug &&
              this.props.formik.errors.slug.missing
            }
            errors={
              // This example shows how to map a specific error back onto
              // the field. We need to provide an errors prop which
              // looks like this: { en: Node, de: Node }.
              // We can provide React elements to display underneath the input
              // indicated by the key.
              //
              // Keeping the errors as simple booleans, whileattaching the
              // specific messages in code means we can make use of our existing
              // translation mechanism. We could easily render
              // <FormattedMessage /> instead of rendering the warning string.
              (() => {
                const allLocales =
                  LocalizedTextInput.isTouched(
                    this.props.formik.touched.slug
                  ) && this.props.formik.errors.slug
                    ? // We map on the per-field errors which are present on
                      // the "translations" field
                      this.props.formik.errors.slug.translations
                    : {};
                return Object.entries(allLocales).reduce(
                  (acc, [key, error]) => {
                    const value = error.hasForbiddenChars ? (
                      <ErrorMessage>This slug is not valid.</ErrorMessage>
                    ) : undefined;

                    return {
                      [key]: value,
                      ...acc,
                    };
                  },
                  {}
                );
              })()
            }
          />
          {LocalizedTextInput.isTouched(this.props.formik.touched.slug) &&
            this.props.formik.errors.slug &&
            this.props.formik.errors.slug.missing && (
              // This shows how a detailed custom error message can be used
              // for LocalizedTextInput
              <ErrorMessage>
                Missing slug. At least one field must be filled.
              </ErrorMessage>
            )}
        </div>
        <div>
          <Text.Body>Product Description*</Text.Body>
          <MultilineTextInput
            name="description"
            value={this.props.formik.values.description}
            onChange={this.props.formik.handleChange}
            onBlur={this.props.formik.handleBlur}
            isDisabled={this.props.formik.isSubmitting}
            hasError={
              this.props.formik.touched.description &&
              Boolean(this.props.formik.errors.description)
            }
          />
          {this.props.formik.touched.description &&
            this.props.formik.errors.description &&
            this.props.formik.errors.description.missing && (
              <ErrorMessage>Missing description</ErrorMessage>
            )}
        </div>
        <div>
          <Text.Body>Product key*</Text.Body>
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
          <Text.Body>Inventory Quantity*</Text.Body>
          <NumberInput
            name="inventory"
            value={this.props.formik.values.inventory}
            onChange={this.props.formik.handleChange}
            onBlur={this.props.formik.handleBlur}
            isDisabled={this.props.formik.isSubmitting}
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
          <Text.Body>Price*</Text.Body>
          <MoneyInput
            name="price"
            value={this.props.formik.values.price}
            onChange={this.props.formik.handleChange}
            onBlur={this.props.formik.handleBlur}
            currencies={currencies}
            isDisabled={this.props.formik.isSubmitting}
            hasError={
              MoneyInput.isTouched(this.props.formik.touched.price) &&
              Boolean(this.props.formik.errors.price)
            }
          />
          {MoneyInput.isTouched(this.props.formik.touched.price) &&
            this.props.formik.errors.price &&
            this.props.formik.errors.price.missing && (
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

const Story = injectIntl((props) => {
  const selectedLanguage = select(
    'selectedLanguage',
    resourceLanguages,
    resourceLanguages[0]
  );
  return (
    <Section>
      <FakeConnector>
        {({ product, updateProduct }) => (
          <Formik
            initialValues={docToForm(product, props.intl.locale)}
            validate={(formValues) => validate(formValues, props.intl.locale)}
            onSubmit={(formValues, formik) => {
              action('values of form submission')(formValues);
              const nextProduct = formToDoc(formValues, props.intl.locale);
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
                (updatedProduct) => {
                  // Calling resetForm with the updated product will
                  // update the form values and reset the submission state,
                  // touched keys and so on.
                  formik.resetForm({
                    values: docToForm(updatedProduct, props.intl.locale),
                  });
                },
                (error) => {
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
            render={(formik) => (
              <Spacings.Stack scale="l">
                <Text.Headline as="h2">The form</Text.Headline>
                <div>
                  <ProductForm
                    formik={formik}
                    selectedLanguage={selectedLanguage}
                  />
                </div>
                <hr />
                <FormikBox formik={formik} />
              </Spacings.Stack>
            )}
          />
        )}
      </FakeConnector>
    </Section>
  );
});

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Forms,
    },
  })
  .add('Basic Formik Example', () => <Story />);
