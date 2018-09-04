import React from 'react';
import { Formik } from 'formik';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import FormikBox from '../../../../.storybook/decorators/formik-box';
import PrimaryButton from '../../buttons/primary-button';
import ErrorMessage from '../../messages/error-message';
import SecondaryButton from '../../buttons/secondary-button';
import Spacings from '../../../materials/spacings';
import Readme from './README.md';
import SelectInput from './select-input';

export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

export const flavourOptions = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
  { value: 'chocolate', label: 'Chocolate', rating: 'good' },
  { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
];

export const groupedOptions = [
  { label: 'Colours', options: colourOptions },
  { label: 'Flavours', options: flavourOptions },
];

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
    const initialColour = (() => {
      if (isMulti && isPrefilled) return ['blue'];
      if (isMulti && !isPrefilled) return [];
      if (!isMulti && isPrefilled) return 'blue';
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
            initialValues={{ state: initialState, colour: initialColour }}
            validate={
              // we use failing validation so that we can see the touched shape
              // on form submission
              () => (failValidation ? { state: true, colour: true } : {})
            }
            onSubmit={(values, formik, ...rest) => {
              action('onSubmit')(values, formik, ...rest);
              formik.resetForm(values);
            }}
            render={formik => {
              const stateInput = {
                hasError: failValidation,
                isTouched: SelectInput.isTouched(formik.touched.state),
              };
              const colourInput = {
                hasError: failValidation,
                isTouched: SelectInput.isTouched(formik.touched.colour),
              };
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
                      hasError={stateInput.hasError && stateInput.isTouched}
                      isSearchable={false}
                      isClearable={true}
                    />
                    {stateInput.hasError &&
                      stateInput.isTouched && (
                        <ErrorMessage>State is not valid</ErrorMessage>
                      )}
                  </Spacings.Stack>
                  <Spacings.Stack scale="xs">
                    <SelectInput
                      name="colour"
                      isMulti={isMulti}
                      value={formik.values.colour}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      options={groupedOptions}
                      hasError={colourInput.hasError && colourInput.isTouched}
                      isSearchable={false}
                      isClearable={true}
                    />
                    {colourInput.hasError &&
                      colourInput.isTouched && (
                        <ErrorMessage>Colour is not valid</ErrorMessage>
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
