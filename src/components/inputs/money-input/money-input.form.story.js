import React from 'react';
import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import omitEmpty from 'omit-empty';
import ErrorMessage from '../../messages/error-message';
import Section from '../../../../.storybook/decorators/section';
import FormikBox from '../../../../.storybook/decorators/formik-box';
import PrimaryButton from '../../buttons/primary-button';
import SecondaryButton from '../../buttons/secondary-button';
import Spacings from '../../spacings';
import Readme from './README.md';
import MoneyInput from './money-input';

const validate = formValues => {
  const errors = { price: {} };
  // validate price
  if (MoneyInput.isEmpty(formValues.price)) {
    errors.price.missing = true;
  } else if (MoneyInput.isHighPrecision(formValues.price)) {
    errors.price.unsupportedHighPrecision = true;
  }
  return omitEmpty(errors);
};

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('MoneyInput', () => (
    <Section>
      <Formik
        initialValues={{ price: { currencyCode: '', amount: '' } }}
        validate={validate}
        onSubmit={(values, formik) => {
          // eslint-disable-next-line no-console
          console.log(
            'money value',
            MoneyInput.convertToMoneyValue(values.price)
          );
          action('onSubmit')(values, formik);
          formik.resetForm(values);
        }}
        render={formik => (
          <Spacings.Stack scale="l">
            <Spacings.Stack scale="s">
              <MoneyInput
                name="price"
                currencies={['EUR', 'USD', 'AED', 'KWD']}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                hasError={
                  MoneyInput.isTouched(formik.touched.price) &&
                  Boolean(formik.errors.price)
                }
                horizontalConstraint="m"
              />
              {MoneyInput.isTouched(formik.touched.price) &&
                formik.errors.price?.missing && (
                  <ErrorMessage>Missing price</ErrorMessage>
                )}
              {MoneyInput.isTouched(formik.touched.price) &&
                formik.errors.price?.unsupportedHighPrecision && (
                  <ErrorMessage>
                    This value is a high precision value. High precision pricing
                    is not supported for products.
                  </ErrorMessage>
                )}
            </Spacings.Stack>
            <Spacings.Inline>
              <SecondaryButton
                onClick={formik.handleReset}
                isDisabled={formik.isSubmitting}
                label="Reset"
              />
              <PrimaryButton
                onClick={formik.handleSubmit}
                isDisabled={formik.isSubmitting || !formik.dirty}
                label="Submit"
              />
            </Spacings.Inline>
            <hr />
            <FormikBox formik={formik} />
          </Spacings.Stack>
        )}
      />
    </Section>
  ));
