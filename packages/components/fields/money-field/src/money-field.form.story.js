import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import omitEmpty from 'omit-empty-es';
import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import Constraints from '../../../constraints';
import { injectIntl } from 'react-intl';
import Stack from '../../../spacings/spacings-stack';
import Inline from '../../../spacings/spacings-inline';
import PrimaryButton from '../../../buttons/primary-button';
import SecondaryButton from '../../../buttons/secondary-button';
import Section from '../../../../../docs/.storybook/decorators/section';
import FormikBox from '../../../../../docs/.storybook/decorators/formik-box';
import Readme from '../README.md';
import MoneyField from './money-field';
import MoneyInput from '../../../inputs/money-input';

const formToDoc = (values, locale) => ({
  price: MoneyInput.convertToMoneyValue(values.price, locale),
  pricePerTon: MoneyInput.convertToMoneyValue(values.pricePerTon, locale),
  discountedPrice: MoneyInput.convertToMoneyValue(
    values.discountedPrice,
    locale
  ),
});

const Story = injectIntl((props) => {
  const currencies = ['EUR', 'USD', 'AED', 'KWD'];
  const horizontalConstraint = select(
    'horizontalConstraint',
    Constraints.getAcceptedMaxPropValues(7),
    7
  );
  const initialValues = {
    price: MoneyInput.parseMoneyValue(),
    pricePerTon: MoneyInput.parseMoneyValue(),
    discountedPrice: MoneyInput.parseMoneyValue(),
  };
  return (
    <Section>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = { price: {}, pricePerTon: {}, discountedPrice: {} };
          if (MoneyInput.isEmpty(values.price)) errors.price.missing = true;
          else if (MoneyInput.isHighPrecision(values.price, props.intl.locale))
            errors.price.unsupportedHighPrecision = true;

          if (MoneyInput.isEmpty(values.pricePerTon))
            errors.pricePerTon.missing = true;

          // Shows how to validate optional `MoneyField`s. Notice that
          // we do not error when this field is filled out partially, as it
          // is not required.
          // Supplying either only currency or only an amount will be treated
          // as leaving the field blank.
          // UX could want to show an error in this case, but then we'd also
          // need a way to unset the currency, which is not possible now.
          if (
            !MoneyInput.isEmpty(values.discountedPrice) &&
            MoneyInput.isHighPrecision(
              values.discountedPrice,
              props.intl.locale
            )
          )
            errors.discountedPrice.unsupportedHighPrecision = true;

          return omitEmpty(errors);
        }}
        onSubmit={(values, formik) => {
          action('onSubmit')(values, formik);
          // eslint-disable-next-line no-console
          console.log('doc', formToDoc(values, props.intl.locale));
          formik.resetForm({ values: initialValues });
        }}
        render={(formik) => (
          <Stack scale="l">
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
              renderError={(key) => {
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
            <MoneyField
              title="Discounted Price per ton (High Precision)"
              description={'How much is a ton of fish?'}
              name="discountedPrice"
              value={formik.values.discountedPrice}
              currencies={currencies}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.discountedPrice}
              horizontalConstraint={horizontalConstraint}
              hasHighPrecisionBadge={true}
              errors={formik.errors.discountedPrice}
            />
            <Inline>
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
            </Inline>
            <hr />
            <FormikBox formik={formik} />
          </Stack>
        )}
      />
    </Section>
  );
});

storiesOf('Examples|Forms/Fields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('MoneyField', () => <Story />);
