import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import Spacings from '@commercetools-uikit/spacings';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import Section from '../../../../../docs/.storybook/decorators/section';
import FormikBox from '../../../../../docs/.storybook/decorators/formik-box';
import Readme from '../README.md';
import DateInput from './date-input';

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('DateInput', () => {
    const initialValues = {
      startDate: '2018-09-20',
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
            <Spacings.Stack scale="l">
              <DateInput
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={7}
              />
              <DateInput
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                horizontalConstraint={7}
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
    );
  });
