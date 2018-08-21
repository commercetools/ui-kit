import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
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

  static propTypes = {
    children: PropTypes.func.isRequired,
    isMulti: PropTypes.bool,
  };

  product = {
    category: this.props.isMulti
      ? [{ id: 'cats', name: 'Cats' }]
      : { id: 'cats', name: 'Cats' },
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

const docToForm = (product, isMulti) => ({
  category: isMulti
    ? product.category.map(category => category.key)
    : product.category.key,
});

class AsyncCreatableSelectInputStory extends React.Component {
  static displayName = 'AsyncCreatableSelectInputStory';
  dataStore = {};
  render() {
    const isMulti = boolean('Use multi-value select input', false);
    const failValidation = boolean('Fail validation', false);
    const delayTime = number('Load delay in ms', 250, {
      range: true,
      min: 0,
      max: 5000,
      step: 50,
    });
    return (
      <Section>
        <IntlProvider locale="en">
          <FakeConnector key={isMulti} isMulti={isMulti}>
            {({ product }) => (
              <Formik
                initialValues={docToForm(product, isMulti)}
                validate={
                  // we use this failing validation so that we can see the touched
                  // shape
                  () => (failValidation ? { category: true } : {})
                }
                onSubmit={(values, formik, ...rest) => {
                  action('onSubmit')(values, formik, ...rest);
                  // Since the AsyncCreatableSelectInput only stores the values
                  // we need to read the related items from the store
                  // eslint-disable-next-line no-console
                  console.log(
                    isMulti
                      ? values.category.map(
                          category => this.dataStore[category]
                        )
                      : this.dataStore[values.category]
                  );
                  formik.resetForm(values);
                }}
                render={formik => {
                  const hasError = failValidation;
                  const isTouched = AsyncCreatableSelectInput.isTouched(
                    formik.touched.category
                  );
                  return (
                    <Spacings.Stack scale="l">
                      <div>
                        <AsyncCreatableSelectInput
                          name="category"
                          isMulti={isMulti}
                          isClearable={true}
                          cacheOptions={number('cacheOptions', 2)}
                          value={formik.values.category}
                          onChange={formik.handleChange}
                          data={this.dataStore}
                          onData={data => {
                            this.dataStore = data;
                          }}
                          onBlur={formik.handleBlur}
                          hasError={hasError && isTouched}
                          defaultOptions={[
                            { value: 'dogs', label: 'Dogs' },
                            { value: 'whales', label: 'Whales' },
                          ]}
                          loadOptions={searchText => {
                            const items = [
                              { value: 'dogs', label: 'Dogs' },
                              { value: 'whales', label: 'Whales' },
                              { value: 'antilopes', label: 'Antilopes' },
                              { value: 'snakes', label: 'Snakes' },
                            ];

                            return delay(delayTime).then(() =>
                              items.filter(item =>
                                item.label
                                  .toLowerCase()
                                  .startsWith(searchText.toLowerCase())
                              )
                            );
                          }}
                        />
                        {hasError &&
                          isTouched && (
                            <ErrorMessage>Category is required</ErrorMessage>
                          )}
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            this.dataStore = {
                              ...this.dataStore,
                              cats: {
                                label: 'Cats',
                                value: 'cats',
                                // additional data could be here
                              },
                            };
                            formik.setFieldValue(
                              'category',
                              isMulti ? ['cats'] : 'cats'
                            );
                            formik.setFieldTouched('category');
                          }}
                        >
                          Select Cats
                        </button>
                      </div>
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
                  );
                }}
              />
            )}
          </FakeConnector>
        </IntlProvider>
      </Section>
    );
  }
}

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('AsyncCreatableSelectInput', () => <AsyncCreatableSelectInputStory />);
