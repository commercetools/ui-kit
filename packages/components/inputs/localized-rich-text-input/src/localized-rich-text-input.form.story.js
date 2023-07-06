/* eslint-disable react/prop-types, react/display-name */
import { useCallback, useRef } from 'react';
import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import omitEmpty from 'omit-empty-es';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';
import FieldLabel from '../../../field-label';
import Stack from '../../../spacings/spacings-stack';
import Inline from '../../../spacings/spacings-inline';
import PrimaryButton from '../../../buttons/primary-button';
import SecondaryButton from '../../../buttons/secondary-button';
import Section from '../../../../../docs/.storybook/decorators/section';
import FormikBox from '../../../../../docs/.storybook/decorators/formik-box';
import Readme from '../README.md';
import LocalizedRichTextInput from './localized-rich-text-input';
import TextInput from '../../text-input';
import TextField from '../../../fields/text-field';

const initialValue = '';
const initialLocalizedValue = {
  en: initialValue,
  de: initialValue,
  'nan-Hant-TW': initialValue,
};

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('LocalizedRichTextInput', () => {
    const initialValues = {
      firstName: '',
      lastName: '',
      aboutMe: initialLocalizedValue,
    };
    const refAboutMe = useRef(null);
    const handleReset = useCallback((ref) => {
      ref.current?.resetValue();
    }, []);

    return (
      <Section>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {
              firstName: {},
              lastName: {},
              aboutMe: {},
            };

            errors.aboutMe.missing = LocalizedRichTextInput.isEmpty(
              values.aboutMe
            );
            errors.firstName.missing = TextInput.isEmpty(values.firstName);
            errors.lastName.missing = TextInput.isEmpty(values.lastName);
            return omitEmpty(errors);
          }}
          onSubmit={(values, formik, ...rest) => {
            action('onSubmit')(values, formik, ...rest);
          }}
          render={(formik) => (
            <Stack scale="l">
              <TextField
                title="Enter your first name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isDisabled={formik.isSubmitting}
                touched={formik.touched.firstName}
                errors={formik.errors.firstName}
              />
              <TextField
                title="Enter your last name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isDisabled={formik.isSubmitting}
                touched={formik.touched.lastName}
                errors={formik.errors.lastName}
              />
              <Stack scale="s">
                <FieldLabel title="Tell us about yourself" htmlFor="aboutMe" />
                <LocalizedRichTextInput
                  name="aboutMe"
                  id="aboutMe"
                  onBlur={formik.handleBlur}
                  hasError={
                    LocalizedRichTextInput.isTouched(formik.touched.aboutMe) &&
                    formik.errors.aboutMe?.missing
                  }
                  ref={refAboutMe}
                  selectedLanguage="en"
                  value={formik.values.aboutMe}
                  onChange={formik.handleChange}
                  isDisabled={formik.isSubmitting}
                  touched={formik.touched.firstName}
                  errors={formik.errors.firstName}
                  defaultExpandMultilineText={true}
                  defaultExpandLanguages={true}
                />
              </Stack>
              <Inline>
                <SecondaryButton
                  onClick={() => {
                    handleReset(refAboutMe);
                    formik.handleReset();
                  }}
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
