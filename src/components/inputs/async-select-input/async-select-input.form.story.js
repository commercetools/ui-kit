import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import FormikBox from '../../../../.storybook/decorators/formik-box';
import PrimaryButton from '../../buttons/primary-button';
import SecondaryButton from '../../buttons/secondary-button';
import Spacings from '../../spacings';
import ErrorMessage from '../../messages/error-message';
import Readme from './README.md';
import AsyncSelectInput from './async-select-input';

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

class AsyncSelectInputStory extends React.Component {
  static displayName = 'AsyncSelectInputStory';
  render() {
    const isMulti = boolean('Use multi-value select input', false);
    const failValidation = boolean('Fail validation', false);
    const delayTimeMs = number('Load delay in ms', 250, {
      range: true,
      min: 0,
      max: 5000,
      step: 50,
    });
    return (
      <Section>
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
                formik.resetForm(values);
              }}
              render={formik => {
                const hasError = failValidation;
                const isTouched = AsyncSelectInput.isTouched(
                  formik.touched.category
                );
                return (
                  <Spacings.Stack scale="l">
                    <div>
                      <AsyncSelectInput
                        name="category"
                        isMulti={isMulti}
                        isClearable={true}
                        cacheOptions={number('cacheOptions', 2)}
                        value={formik.values.category}
                        onChange={formik.handleChange}
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

                          return delay(delayTimeMs).then(() =>
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
                          // additional data could be on cats
                          const cats = { label: 'Cats', value: 'cats' };
                          formik.setFieldValue(
                            'category',
                            isMulti ? [cats] : cats
                          );
                          formik.setFieldTouched(
                            'category',
                            isMulti ? [true] : true
                          );
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
      </Section>
    );
  }
}

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('AsyncSelectInput', () => <AsyncSelectInputStory />);
