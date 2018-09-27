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
    const horizontalConstraint = select(
      'horizontalConstraint',
      ['xs', 's', 'm', 'l', 'xl', 'scale'],
      'm'
    );
    return (
      <Section>
        <IntlProvider locale="en">
          <Formik
            initialValues={{
              price: { ...MoneyField.parseMoneyValue() },
              pricePerTon: { ...MoneyField.parseMoneyValue() },
            }}
            validate={values => {
              const errors = { price: {}, pricePerTon: {} };
              if (MoneyField.isEmpty(values.price)) errors.price.missing = true;
              else if (MoneyField.isHighPrecision(values.price))
                errors.price.unsupportedHighPrecision = true;

              if (MoneyField.isEmpty(values.pricePerTon))
                errors.pricePerTon.missing = true;

              console.log(values, omitEmpty(errors));
              return omitEmpty(errors);
            }}
            onSubmit={(values, formik) => {
              action('onSubmit')(values, formik);
              formik.resetForm(values);
            }}
            render={formik => (
              <Spacings.Stack scale="l">
                <MoneyField
                  title="Regular Price"
                  description={'How much is the fish?'}
                  hint="It is better to pay in EUR"
                  name="price"
                  isRequired={true}
                  value={formik.values.price}
                  currencies={currencies}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.price}
                  horizontalConstraint={horizontalConstraint}
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
                <MoneyField
                  title="Price per ton (High Precision)"
                  description={'How much is a ton of fish?'}
                  name="pricePerTon"
                  isRequired={true}
                  value={formik.values.pricePerTon}
                  currencies={currencies}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.pricePerTon}
                  horizontalConstraint={horizontalConstraint}
                  hasHighPrecisionBadge={true}
                  errors={formik.errors.pricePerTon}
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
