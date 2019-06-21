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
import DateTimeInput from './date-time-input';

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('DateTimeInput', () => (
    <Section>
      <Formik
        initialValues={{
          startDate: '2018-12-10T12:07:11.112Z',
          endDate: '',
        }}
        onSubmit={(values, formik, ...rest) => {
          action('onSubmit')(values, formik, ...rest);
          formik.resetForm(values);
        }}
        render={formik => (
          <Spacings.Stack scale="l">
            <DateTimeInput
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              timeZone="Europe/Berlin"
              horizontalConstraint="m"
            />
            <DateTimeInput
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              timeZone="Europe/Berlin"
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
