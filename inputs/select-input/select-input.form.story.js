import React from 'react';
import { Formik } from 'formik';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import FormikBox from '../../.storybook/decorators/formik-box';
import PrimaryButton from '../../buttons/primary-button';
import ErrorMessage from '../../messages/error-message';
import SecondaryButton from '../../buttons/secondary-button';
import Spacings from '../../materials/spacings';
import Readme from './README.md';
import SelectInput from './select-input';

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('SelectInput', () => {
    const isMulti = boolean('Use multi-value select input', false);
    const isPrefilled = boolean('Prefill selected value', false);
    const initialState = (() => {
      if (isMulti && isPrefilled) return ['ready'];
      if (isMulti && !isPrefilled) return [];
      if (!isMulti && isPrefilled) return 'ready';
      return undefined;
    })();
    const failValidation = boolean('Fail validation', false);
    const stateOptions = [
      { value: 'ready', label: 'Ready' },
      { value: 'shipped', label: 'Shipped' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'returned', label: 'Returned' },
    ];
    return (
      <Section>
        <IntlProvider locale="en">
          <Formik
            key={`${isMulti}-${isPrefilled}`}
            initialValues={{ state: initialState }}
            validate={
              // we use failing validation so that we can see the touched shape
              // on form submission
              () => (failValidation ? { state: true } : {})
            }
            onSubmit={(values, formik, ...rest) => {
              action('onSubmit')(values, formik, ...rest);
              formik.resetForm(values);
            }}
            render={formik => {
              const hasError = isMulti
                ? formik.values.state.length === 0
                : !formik.values.state;
              const isTouched = SelectInput.isTouched(formik.touched.state);
              return (
                <Spacings.Stack scale="l">
                  <Spacings.Stack scale="xs">
                    <SelectInput
                      name="state"
                      isMulti={isMulti}
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      options={stateOptions}
                      hasError={hasError && isTouched}
                      isSearchable={false}
                      isClearable={true}
                    />
                    {hasError &&
                      isTouched && (
                        <ErrorMessage>State is required</ErrorMessage>
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
              );
            }}
          />
        </IntlProvider>
      </Section>
    );
  });
