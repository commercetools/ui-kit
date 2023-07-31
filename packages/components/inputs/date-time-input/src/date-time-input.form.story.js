import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';
import Stack from '../../../spacings/spacings-stack';
import Inline from '../../../spacings/spacings-inline';
import PrimaryButton from '../../../buttons/primary-button';
import SecondaryButton from '../../../buttons/secondary-button';
import Section from '../../../../../docs/.storybook/decorators/section';
import FormikBox from '../../../../../docs/.storybook/decorators/formik-box';
import Readme from '../README.md';
import DateTimeInput from './date-time-input';

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('DateTimeInput', () => {
    const initialValues = {
      startDate: '2018-12-10T12:07:11.112Z',
      endDate: '',
    };
    return (
      <Section>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, formik, ...rest) => {
            action('onSubmit')(values, formik, ...rest);
            formik.resetForm({ values: initialValues });
          }}
          render={(formik) => (
            <Stack scale="l">
              <DateTimeInput
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                timeZone="Europe/Berlin"
                horizontalConstraint={7}
              />
              <DateTimeInput
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                timeZone="Europe/Berlin"
                horizontalConstraint={7}
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
