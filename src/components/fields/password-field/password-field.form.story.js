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
import PasswordField from './password-field';
import PasswordInput from '../../inputs/password-input';

// Cool stuff to try in this story:
//  - Click the "Password" label and see how the input is focused automatically
//  - Type a password with a space in it
//  - Type a password which exceeds ten characters
//  - Type a password which exceeds ten characters and has a space in it
//  - Play with the horizontalConstraint knob to see it influence the field

storiesOf('Examples|Forms/Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('PasswordField', () => (
    <Section>
      <Formik
        initialValues={{ password: '' }}
        validate={values => {
          const errors = { password: {} };
          if (PasswordInput.isEmpty(values.password))
            errors.password.missing = true;
          if (values.password.trim().indexOf('#') === -1)
            errors.password.insecure = true;
          return omitEmpty(errors);
        }}
        onSubmit={(values, formik, ...rest) => {
          action('onSubmit')(values, formik, ...rest);
          formik.resetForm(values);
        }}
        render={formik => (
          <Spacings.Stack scale="l">
            <PasswordField
              title="Password"
              description="Please choose a password."
              hint="Must contain at least one `#`"
              name="password"
              isRequired={true}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.password}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['s', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
              errors={formik.errors.password}
              renderError={key => {
                switch (key) {
                  // these could also use <FormattedMessage />
                  case 'insecure':
                    return 'Not secure. Use at least one `#`.';
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
