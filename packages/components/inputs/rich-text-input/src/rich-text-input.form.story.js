/* eslint-disable react/prop-types, react/display-name */
import { useState, useEffect } from 'react';
import { Formik, useField } from 'formik';
import { storiesOf } from '@storybook/react';
import omitEmpty from 'omit-empty-es';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';
import FieldLabel from '@commercetools-uikit/field-label';
import Spacings from '@commercetools-uikit/spacings';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import Section from '../../../../../docs/.storybook/decorators/section';
import FormikBox from '../../../../../docs/.storybook/decorators/formik-box';
import Readme from '../README.md';
import RichTextInput from './rich-text-input';
import TextInput from '../../text-input';
import TextField from '../../../fields/text-field';

const initialValue = '';

const RichTextFormikInput = (props) => {
  const [field, meta, helpers] = useField(props.name);
  const { value, touched } = meta;
  const { setValue, setTouched } = helpers;

  return (
    <RichTextInput
      id={props.name}
      name={props.name}
      value={value}
      onChange={(state) => {
        setValue(state);
        setTouched(true);
      }}
      onBlur={props.onBlur}
      hasError={props.hasError}
      reset={props.reset}
    />
  );
};

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
    const [reset, setReset] = useState(false);
    useEffect(() => {
      if (reset) {
        setReset(false);
      }
    }, [reset]);

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
            <Spacings.Stack scale="l">
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
              <Spacings.Stack scale="s">
                <FieldLabel title="Enter your cv" htmlFor="cv" />
                <RichTextFormikInput
                  name="cv"
                  onBlur={formik.handleBlur}
                  hasError={
                    RichTextInput.isTouched(formik.touched.cv) &&
                    formik.errors.cv &&
                    formik.errors.cv.missing
                  }
                  reset={reset}
                />
              </Spacings.Stack>
              <Spacings.Stack scale="s">
                <FieldLabel
                  title="Enter your cover letter"
                  htmlFor="coverLetter"
                />
                <RichTextFormikInput
                  name="coverLetter"
                  onBlur={formik.handleBlur}
                  hasError={
                    RichTextInput.isTouched(formik.touched.coverLetter) &&
                    formik.errors.coverLetter &&
                    formik.errors.coverLetter.missing
                  }
                  reset={reset}
                />
              </Spacings.Stack>
              <Spacings.Stack scale="s">
                <FieldLabel title="Tell us about yourself" htmlFor="aboutMe" />
                <RichTextFormikInput
                  name="aboutMe"
                  onBlur={formik.handleBlur}
                  hasError={
                    RichTextInput.isTouched(formik.touched.aboutMe) &&
                    formik.errors.aboutMe &&
                    formik.errors.aboutMe.missing
                  }
                  reset={reset}
                />
              </Spacings.Stack>
              <Spacings.Inline>
                <SecondaryButton
                  onClick={() => {
                    formik.handleReset();
                    setReset(true);
                  }}
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
