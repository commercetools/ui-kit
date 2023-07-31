import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { injectIntl } from 'react-intl';
import { withKnobs, number } from '@storybook/addon-knobs/react';
import omitEmpty from 'omit-empty-es';
import Spacings from '@commercetools-uikit/spacings';
import PrimaryButton from '../../../buttons/primary-button';
import SecondaryButton from '../../../buttons/secondary-button';
import { ErrorMessage } from '../../../messages';
import Section from '../../../../../docs/.storybook/decorators/section';
import FormikBox from '../../../../../docs/.storybook/decorators/formik-box';
import Readme from '../README.md';
import MoneyInput from './money-input';

const validate = (formValues, locale) => {
  const errors = { price: {} };
  // validate price
  if (MoneyInput.isEmpty(formValues.price)) {
    errors.price.missing = true;
  } else if (MoneyInput.isHighPrecision(formValues.price, locale)) {
    errors.price.unsupportedHighPrecision = true;
  }
  return omitEmpty(errors);
};
const Story = injectIntl((props) => {
  const initialCentAmount = number('initial cent amount', 10099);
  const initialFractionDigits = number('initial fraction digits', 2);
  const initialValues = {
    price: MoneyInput.parseMoneyValue(
      {
        centAmount: initialCentAmount,
        currencyCode: 'EUR',
        fractionDigits: initialFractionDigits,
        type: 'centPrecision',
      },
      props.intl.locale
    ),
  };
  return (
    <Section>
      <Formik
        initialValues={initialValues}
        validate={(formValues) => validate(formValues, props.intl.locale)}
        onSubmit={(values, formik) => {
          // eslint-disable-next-line no-console
          console.log(
            'money value',
            MoneyInput.convertToMoneyValue(values.price, props.intl.locale)
          );
          action('onSubmit')(values, formik);
          formik.resetForm({ values: initialValues });
        }}
        render={(formik) => (
          <Spacings.Stack scale="l">
            <Spacings.Stack scale="s">
              <MoneyInput
                name="price"
                currencies={['EUR', 'USD', 'AED', 'KWD', 'JPY']}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                hasError={
                  MoneyInput.isTouched(formik.touched.price) &&
                  Boolean(formik.errors.price)
                }
                horizontalConstraint={7}
              />
              {MoneyInput.isTouched(formik.touched.price) &&
                formik.errors.price &&
                formik.errors.price.missing && (
                  <ErrorMessage>Missing price</ErrorMessage>
                )}
              {MoneyInput.isTouched(formik.touched.price) &&
                formik.errors.price &&
                formik.errors.price.unsupportedHighPrecision && (
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
  );
});
storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('MoneyInput', () => <Story />);
