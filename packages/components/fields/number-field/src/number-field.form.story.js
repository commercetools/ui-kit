import React from 'react';
import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import omitEmpty from 'omit-empty-es';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import Section from '../../../../../docs/.storybook/decorators/section';
import FormikBox from '../../../../../docs/.storybook/decorators/formik-box';
import Readme from '../README.md';
import NumberField from './number-field';
import NumberInput from '../../../inputs/number-input';

// Cool stuff to try in this story:
//  - Click the "Age" label and see how the input is focused automatically
//  - Type an age with a space in it
//  - Type a negative age
//  - Play with the horizontalConstraint knob to see it influence the field

storiesOf('Examples|Forms/Fields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('NumberField', () => {
    const initialValues = { age: '' };
    return (
      <Section>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = { age: {} };
            if (NumberInput.isEmpty(values.age)) errors.age.missing = true;
            else if (values.age < 0) errors.age.negative = true;
            return omitEmpty(errors);
          }}
          onSubmit={(values, formik, ...rest) => {
            action('onSubmit')(values, formik, ...rest);
            formik.resetForm({ values: initialValues });
          }}
          render={(formik) => (
            <Spacings.Stack scale="l">
              <NumberField
                title="Age"
                description={
                  boolean('Use ridiculously long description', false)
                    ? 'The name you will have on our platform. Chose it wisely as it can not be changed once it is set. Do not pick something with unicors or a superhero, everybody is doing that :) So once again, chose wisely since this is permantent.'
                    : 'The name you will have on our platform'
                }
                hint="Can not be negative"
                name="age"
                isRequired={true}
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.age}
                horizontalConstraint={select(
                  'horizontalConstraint',
                  Constraints.getAcceptedMaxPropValues(3),
                  7
                )}
                errors={formik.errors.age}
                renderError={(key) => {
                  switch (key) {
                    // these could also use <FormattedMessage />
                    case 'negative':
                      // we could also supply the "min" property instead
                      // of creating validation for it.
                      return 'No negative values allowed';
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
    );
  });
