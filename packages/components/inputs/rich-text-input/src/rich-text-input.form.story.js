/* eslint-disable react/prop-types, react/display-name */
import { useCallback, useRef, forwardRef } from 'react';
import { Formik, useField } from 'formik';
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
import RichTextInput from './rich-text-input';
import TextInput from '../../text-input';
import TextField from '../../../fields/text-field';

const initialValue = '';

const RichTextFormikInput = forwardRef((props, ref) => {
  const [meta, helpers] = useField(props.name);
  const { value } = meta;
  const { setValue } = helpers;

  const onChange = useCallback(
    (event) => {
      setValue(event.target.value);
      action('onChange')(event);
    },
    [setValue]
  );

  return (
    <RichTextInput
      id={props.name}
      name={props.name}
      value={value}
      onChange={onChange}
      onBlur={props.onBlur}
      hasError={props.hasError}
      ref={ref}
    />
  );
});

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('RichTextInput', () => {
    const initialValues = {
      firstName: '',
      lastName: '',
      cv: initialValue,
      coverLetter: initialValue,
      aboutMe: initialValue,
    };
    const refCv = useRef(null);
    const refCoverLetter = useRef(null);
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
              cv: {},
              coverLetter: {},
              aboutMe: {},
            };

            if (RichTextInput.isEmpty(values.cv)) errors.cv.missing = true;
            if (RichTextInput.isEmpty(values.coverLetter))
              errors.coverLetter.missing = true;
            if (RichTextInput.isEmpty(values.aboutMe))
              errors.aboutMe.missing = true;
            if (TextInput.isEmpty(values.firstName))
              errors.firstName.missing = true;
            if (TextInput.isEmpty(values.lastName))
              errors.lastName.missing = true;
            return omitEmpty(errors);
          }}
          onSubmit={(values, formik, ...rest) => {
            action('onSubmit')(values, formik, ...rest);
            formik.resetForm({ values: initialValues });
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
                <FieldLabel title="Enter your cv" htmlFor="cv" />
                <RichTextFormikInput
                  name="cv"
                  onBlur={formik.handleBlur}
                  hasError={
                    RichTextInput.isTouched(formik.touched.cv) &&
                    formik.errors.cv?.missing
                  }
                  ref={refCv}
                />
              </Stack>
              <Stack scale="s">
                <FieldLabel
                  title="Enter your cover letter"
                  htmlFor="coverLetter"
                />
                <RichTextFormikInput
                  name="coverLetter"
                  onBlur={formik.handleBlur}
                  hasError={
                    RichTextInput.isTouched(formik.touched.coverLetter) &&
                    formik.errors.coverLetter?.missing
                  }
                  ref={refCoverLetter}
                />
              </Stack>
              <Stack scale="s">
                <FieldLabel title="Tell us about yourself" htmlFor="aboutMe" />
                <RichTextFormikInput
                  name="aboutMe"
                  onBlur={formik.handleBlur}
                  hasError={
                    RichTextInput.isTouched(formik.touched.aboutMe) &&
                    formik.errors.aboutMe?.missing
                  }
                  ref={refAboutMe}
                />
              </Stack>
              <Inline>
                <SecondaryButton
                  onClick={() => {
                    formik.handleReset();
                    handleReset(refCv);
                    handleReset(refCoverLetter);
                    handleReset(refAboutMe);
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
