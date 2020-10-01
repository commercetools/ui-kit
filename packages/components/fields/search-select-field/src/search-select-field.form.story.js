import React from 'react';
import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import omitEmpty from 'omit-empty';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  select,
  number,
} from '@storybook/addon-knobs/react';
import Spacings from '@commercetools-uikit/spacings';
import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
import Section from '../../../../../.storybook/decorators/section';
import FormikBox from '../../../../../.storybook/decorators/formik-box';
import Readme from '../README.md';
import SearchSelectField from './search-select-field';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const options = [
  { value: 'platypus', label: 'Platypus' },
  { value: 'goat', label: 'Goat' },
  { value: 'giraffe', label: 'Giraffe' },
  { value: 'whale', label: 'Whale' },
  { value: 'killer-whale', label: 'Killer Whale', isDisabled: true },
  { value: 'otter', label: 'Otter' },
  { value: 'elephant', label: 'Elephant' },
  { value: 'rat', label: 'Rat' },
  { value: 'anteater', label: 'Anteater' },
  { value: 'alligator', label: 'Alligator' },
  { value: 'dog', label: 'Dog' },
  { value: 'pig', label: 'Pig' },
  { value: 'hippopotamus', label: 'Hippopotamus' },
  { value: 'lion', label: 'Lion' },
  { value: 'monkey', label: 'Monkey' },
  { value: 'kangaroo', label: 'Kangaroo' },
  { value: 'flamingo', label: 'Flamingo' },
  { value: 'moose', label: 'Moose' },
  { value: 'prairie-dog', label: 'Prairie Dog', isDisabled: true },
  { value: 'snake', label: 'Snake' },
  { value: 'porcupine', label: 'Porcupine' },
  { value: 'stingray', label: 'Stingray' },
  { value: 'panther', label: 'Panther' },
  { value: 'lizard', label: 'Lizard' },
  { value: 'parrot', label: 'Parrot' },
  { value: 'dolphin', label: 'Dolphin' },
  { value: 'chicken', label: 'Chicken' },
  { value: 'sloth', label: 'Sloth' },
  { value: 'shark', label: 'Shark' },
  { value: 'ape', label: 'Ape' },
  { value: 'bear', label: 'Bear' },
  { value: 'cheetah', label: 'Cheetah' },
  { value: 'camel', label: 'Camel' },
  { value: 'beaver', label: 'Beaver' },
  { value: 'armadillo', label: 'Armadillo' },
  { value: 'tiger', label: 'Tiger' },
  { value: 'llama', label: 'Llama' },
  { value: 'seal', label: 'Seal' },
  { value: 'hawk', label: 'Hawk' },
  { value: 'wolf', label: 'Wolf' },
  { value: 'yak', label: 'Yak' },
  { value: 'rhinoceros', label: 'Rhinoceros' },
  { value: 'alpaca', label: 'Alpaca' },
  { value: 'zebra', label: 'Zebra' },
  { value: 'cat', label: 'Cat' },
  { value: 'rabbit', label: 'Rabbit' },
  { value: 'turtle', label: 'Turtle' },
  { value: 'cow', label: 'Cow' },
  { value: 'turkey', label: 'Turkey' },
  { value: 'deer', label: 'Deer' },
];

storiesOf('Examples|Forms/Fields/SelectFields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('SearchSelectField', () => {
    const isMulti = boolean('isMulti', true);
    const hasWarning = boolean('hasWarning', false);
    const initialValues = { animal: isMulti ? [] : undefined };
    const delayTimeMs = number('Load delay in ms', 250, {
      range: true,
      min: 0,
      max: 5000,
      step: 50,
    });
    return (
      <Section key={isMulti}>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = { animal: {} };
            if (isMulti ? values.animal.length === 0 : !values.animal)
              errors.animal.missing = true;
            return omitEmpty(errors);
          }}
          onSubmit={(values, formik) => {
            action('onSubmit')(values, formik);
            formik.resetForm({ values: initialValues });
          }}
          render={(formik) => (
            <Spacings.Stack scale="l">
              <SearchSelectField
                horizontalConstraint={select(
                  'horizontalConstraint',
                  ['s', 'm', 'l', 'xl', 'scale'],
                  'm'
                )}
                errors={formik.errors.animal}
                isRequired={true}
                touched={formik.touched.animal}
                name="animal"
                value={formik.values.animal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isDisabled={formik.isSubmitting}
                isMulti={isMulti}
                hasWarning={hasWarning}
                title="Favourite animal"
                description="Bonus points if it is a mammal"
                isClearable={true}
                cacheOptions={number('cacheOptions', 2)}
                loadOptions={(searchText) =>
                  delay(delayTimeMs).then(() =>
                    options.filter((option) =>
                      option.label
                        .toLowerCase()
                        .startsWith(searchText.toLowerCase())
                    )
                  )
                }
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
