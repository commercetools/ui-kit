import React from 'react';
import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';
import Section from '../../../../.storybook/decorators/section';
import FormikBox from '../../../../.storybook/decorators/formik-box';
import PrimaryButton from '../../buttons/primary-button';
import SecondaryButton from '../../buttons/secondary-button';
import Spacings from '../../spacings';
import Readme from './README.md';
import DateInput from './date-input';

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('DateInput', () => (
    <Section>
      <Formik
        initialValues={{
          startDate: '2018-09-20',
          endDate: '',
        }}
        onSubmit={(values, formik, ...rest) => {
          action('onSubmit')(values, formik, ...rest);
          formik.resetForm({ values });
        }}
        render={formik => (
          <Spacings.Stack scale="l">
            <DateInput
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              horizontalConstraint="m"
            />
            <DateInput
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              horizontalConstraint="m"
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
    </Section>
  ));
