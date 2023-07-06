import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import omitEmpty from 'omit-empty-es';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react';
import Constraints from '../../../constraints';
import Stack from '../../../spacings/spacings-stack';
import Inline from '../../../spacings/spacings-inline';
import PrimaryButton from '../../../buttons/primary-button';
import SecondaryButton from '../../../buttons/secondary-button';
import Section from '../../../../../docs/.storybook/decorators/section';
import FormikBox from '../../../../../docs/.storybook/decorators/formik-box';
import Readme from '../README.md';
import TextField from './text-field';
import TextInput from '../../../inputs/text-input';

// Cool stuff to try in this story:
//  - Click the "Username" label and see how the input is focused automatically
//  - Type a username with a space in it
//  - Type a username which exceeds ten characters
//  - Type a username which exceeds ten characters and has a space in it
//  - Play with the horizontalConstraint knob to see it influence the field

storiesOf('Examples|Forms/Fields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('TextField', () => {
    const initialValues = { userName: '' };
    return (
      <Section>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = { userName: {} };
            if (TextInput.isEmpty(values.userName))
              errors.userName.missing = true;
            if (values.userName.trim().indexOf(' ') !== -1)
              errors.userName.usesSpaces = true;
            if (values.userName.trim().length > 10)
              errors.userName.exceedsMaxLength = true;
            return omitEmpty(errors);
          }}
          onSubmit={(values, formik, ...rest) => {
            action('onSubmit')(values, formik, ...rest);
            formik.resetForm({ values: initialValues });
          }}
          render={(formik) => (
            <Stack scale="l">
              <TextField
                title="Username"
                description={
                  boolean('Use ridiculously long description', false)
                    ? 'The name you will have on our platform. Chose it wisely as it can not be changed once it is set. Do not pick something with unicors or a superhero, everybody is doing that :) So once again, chose wisely since this is permantent.'
                    : 'The name you will have on our platform'
                }
                hint="No spaces allowed"
                name="userName"
                isRequired={true}
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.userName}
                horizontalConstraint={select(
                  'horizontalConstraint',
                  Constraints.getAcceptedMaxPropValues(),
                  7
                )}
                errors={formik.errors.userName}
                renderError={(key) => {
                  switch (key) {
                    // these could also use <FormattedMessage />
                    case 'usesSpaces':
                      return 'No spaces allowed';
                    case 'exceedsMaxLength':
                      return 'No more than 10 characters allowed';
                    default:
                      return null;
                  }
                }}
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
