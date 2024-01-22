import { Formik } from 'formik';
import { horizontalConstraintArgType } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react';
import NumberField, { type TNumberFieldProps } from './number-field';
import omitEmpty from 'omit-empty-es';
import Spacings from '@commercetools-uikit/spacings';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import type { TPrimaryButtonProps } from '@commercetools-uikit/primary-button';
import FormikBox from '../../../../../.storybook/decorators/formik-box';
import NumberInput from '../../../inputs/number-input';

// Cool stuff to try in this story:
//  - Click the "Age" label and see how the input is focused automatically
//  - Type an age with a space in it
//  - Type a negative age
//  - Play with the horizontalConstraint knob to see it influence the field

type TNumberFieldPropsAndCustomArgs = TNumberFieldProps & {
  useRidiculouslyLongDescription?: boolean;
};

const meta = {
  title: 'Examples/Forms/Fields/NumberField',
  component: NumberField,
  tags: ['autodocs'],
} satisfies Meta<TNumberFieldPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<TNumberFieldPropsAndCustomArgs>;

export const Default: Story = {
  args: {
    useRidiculouslyLongDescription: false,
    horizontalConstraint: 7,
  },
  argTypes: {
    horizontalConstraint: horizontalConstraintArgType({ min: 3 }),
  },
  render: (args) => {
    const initialValues = { age: '' };
    return (
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: { age: Record<string, boolean> } = {
            age: {},
          };
          if (NumberInput.isEmpty(values.age)) errors.age.missing = true;
          else if (Number(values.age) < 0) errors.age.negative = true;
          return omitEmpty(errors);
        }}
        // @ts-ignore
        onSubmit={(values, formik, ...rest) => {
          formik.resetForm({ values: initialValues });
        }}
        render={(formik) => (
          <Spacings.Stack scale="l">
            <NumberField
              title="Age"
              description={
                args.useRidiculouslyLongDescription
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
              horizontalConstraint={args.horizontalConstraint}
              errors={formik.errors.age as TNumberFieldProps['errors']}
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
                onClick={
                  formik.handleSubmit as unknown as TPrimaryButtonProps['onClick']
                }
                isDisabled={formik.isSubmitting || !formik.dirty}
                label="Submit"
              />
            </Spacings.Inline>
            <hr />
            <FormikBox formik={formik} />
          </Spacings.Stack>
        )}
      />
    );
  },
};
