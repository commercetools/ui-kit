import React from 'react';
import { Formik } from 'formik';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import omitEmpty from 'omit-empty';
import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import FormikBox from '../../../../.storybook/decorators/formik-box';
import PrimaryButton from '../../buttons/primary-button';
import SecondaryButton from '../../buttons/secondary-button';
import Spacings from '../../spacings';
import Readme from './README.md';
import MoneyField from './money-field';

storiesOf('Examples|Forms/Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('MoneyField', () => {
    const currencies = ['EUR', 'USD', 'AED', 'KWD'];
    return (
      <Section>
        <IntlProvider locale="en">
          <Formik
            initialValues={{
              price: { currencyCode: currencies[0], amount: '' },
            }}
            validate={values => {
              const errors = { price: {} };
              if (MoneyField.isEmpty(values.price)) errors.price.missing = true;
              else if (MoneyField.isHighPrecision(values.price))
                errors.price.unsupportedHighPrecision = true;
              return omitEmpty(errors);
            }}
            onSubmit={(values, formik, ...rest) => {
              action('onSubmit')(values, formik, ...rest);
              formik.resetForm(values);
            }}
            render={formik => (
              <Spacings.Stack scale="l">
                <MoneyField
                  title="Price"
                  description={'How much is the fish?'}
                  hint="It is better to pay in EUR"
                  name="price"
                  isRequired={true}
                  value={formik.values.price}
                  currencies={currencies}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.price}
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    ['xs', 's', 'm', 'l', 'xl', 'scale'],
                    'm'
                  )}
                  errors={formik.errors.price}
                  renderError={key => {
                    switch (key) {
                      // these could also use <FormattedMessage />
                      case 'unsupportedHighPrecision':
                        return 'No high precision prices are allowed here.';
                      default:
                        return null;
                    }
                  }}
                />
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
        </IntlProvider>
      </Section>
    );
  });
