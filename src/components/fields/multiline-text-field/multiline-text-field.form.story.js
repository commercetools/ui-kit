import React from 'react';
import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import omitEmpty from 'omit-empty';
import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import FormikBox from '../../../../.storybook/decorators/formik-box';
import PrimaryButton from '../../buttons/primary-button';
import SecondaryButton from '../../buttons/secondary-button';
import Spacings from '../../spacings';
import Readme from './README.md';
import MultilineTextField from './multiline-text-field';
import MultilineTextInput from '../../inputs/multiline-text-input';

storiesOf('Examples|Forms/Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('MultilineTextField', () => (
    <Section>
      <Formik
        initialValues={{ description: '' }}
        validate={values => {
          const errors = { description: {} };
          if (MultilineTextInput.isEmpty(values.description))
            errors.description.missing = true;
          if (values.description.trim().length > 160)
            errors.description.exceedsMaxLength = true;
          return omitEmpty(errors);
        }}
        onSubmit={(values, formik, ...rest) => {
          action('onSubmit')(values, formik, ...rest);
          formik.resetForm(values);
        }}
        render={formik => (
          <Spacings.Stack scale="l">
            <MultilineTextField
              title="Description"
              description="Information about the product."
              hint="Use 160 spaces at most."
              name="description"
              isRequired={true}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.description}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['m', 'l', 'xl', 'scale'],
                'm'
              )}
              errors={formik.errors.description}
              renderError={key => {
                switch (key) {
                  // these could also use <FormattedMessage />
                  case 'exceedsMaxLength':
                    return 'No more than 160 characters allowed';
                  default:
                    return null;
                }
              }}
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
