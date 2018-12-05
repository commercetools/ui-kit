import React from 'react';
import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import FormikBox from '../../../../.storybook/decorators/formik-box';
import PrimaryButton from '../../buttons/primary-button';
import SecondaryButton from '../../buttons/secondary-button';
import Spacings from '../../spacings';
import Readme from './README.md';
import TimeInput from './time-input';

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('TimeInput', () => (
    <Section>
      <Formik
        initialValues={{ startTime: TimeInput.to24h('10:00'), endTime: '' }}
        onSubmit={(values, formik, ...rest) => {
          action('onSubmit')(values, formik, ...rest);
          formik.resetForm(values);
        }}
        render={formik => (
          <Spacings.Stack scale="l">
            <TimeInput
              name="startTime"
              value={formik.values.startTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              horizontalConstraint="m"
            />
            <TimeInput
              name="endTime"
              value={formik.values.endTime}
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
