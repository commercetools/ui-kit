import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import FormikBox from '../../.storybook/decorators/formik-box';
import PrimaryButton from '../../buttons/primary-button';
import SecondaryButton from '../../buttons/secondary-button';
import Spacings from '../../materials/spacings';
import ErrorMessage from '../../messages/error-message';
import Readme from './README.md';
import AsyncCreatableSelectInput from './async-creatable-select-input';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class FakeConnector extends React.Component {
  static displayName = 'FakeConnector';
  static propTypes = { children: PropTypes.func.isRequired };
  product = {
    state: [{ value: 'shipped', name: 'Shipped' }],
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

const docToForm = product => ({
  state: product.state.map(state => ({
    label: state.name,
    value: state.value,
  })),
});

const stateOptions = [
  { value: 'ready', label: 'Ready' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'returned', label: 'Returned' },
];
const loadOptions = searchText =>
  Promise.resolve(
    stateOptions.filter(option =>
      option.label.toLowerCase().startsWith(searchText.toLowerCase())
    )
  );

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withReadme(Readme))
  .add('AsyncCreatableSelectInput', () => (
    <Section>
      {/* <SignIn /> */}
      <FakeConnector>
        {({ product }) => (
          <Formik
            initialValues={docToForm(product)}
            validate={
              // we use this failing validation so that we can see the touched
              // shape
              values => (values.state.length > 2 ? { state: true } : {})
            }
            onSubmit={(values, formik, ...rest) => {
              action('onSubmit')(values, formik, ...rest);
              formik.resetForm(values);
            }}
            render={formik => (
              <Spacings.Stack scale="l">
                <AsyncCreatableSelectInput
                  name="state"
                  isMulti={true}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  loadOptions={loadOptions}
                />
                {AsyncCreatableSelectInput.isTouched(formik.touched.state) &&
                  formik.errors.state && (
                    <ErrorMessage>No more than two values allowed</ErrorMessage>
                  )}
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
        )}
      </FakeConnector>
    </Section>
  ));
