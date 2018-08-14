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
            onSubmit={(values, formik, ...rest) => {
              action('onSubmit')(values, formik, ...rest);
              formik.resetForm(values);
            }}
            render={formik => (
              <Spacings.Stack scale="l">
                <SelectInput
                  name="state"
                  isMulti={isMulti}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={stateOptions}
                  isSearchable={false}
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
