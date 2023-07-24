// import { Formik } from 'formik';
// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { withKnobs, boolean } from '@storybook/addon-knobs/react';
// import Spacings from '@commercetools-uikit/spacings';
// import { PrimaryButton, SecondaryButton } from '@commercetools-uikit/buttons';
// import { ErrorMessage } from '@commercetools-uikit/messages';
// import Section from '../../../../../docs/.storybook/decorators/section';
// import FormikBox from '../../../../../docs/.storybook/decorators/formik-box';
// import Readme from '../README.md';
// import SelectInput from './select-input';

// export const colourOptions = [
//   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//   { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
//   { value: 'purple', label: 'Purple', color: '#5243AA' },
//   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
//   { value: 'orange', label: 'Orange', color: '#FF8B00' },
//   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
//   { value: 'green', label: 'Green', color: '#36B37E' },
//   { value: 'forest', label: 'Forest', color: '#00875A' },
//   { value: 'slate', label: 'Slate', color: '#253858' },
//   { value: 'silver', label: 'Silver', color: '#666666' },
// ];

// export const flavourOptions = [
//   { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
//   { value: 'chocolate', label: 'Chocolate', rating: 'good' },
//   { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
//   { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
// ];

// export const groupedOptions = [
//   { label: 'Colours', options: colourOptions },
//   { label: 'Flavours', options: flavourOptions },
//   { options: flavourOptions },
// ];

// storiesOf('Examples|Forms/Inputs/SelectInputs', module)
//   .addDecorator(withKnobs)
//   .addParameters({
//     readme: {
//       // Show readme at the addons panel
//       sidebar: Readme,
//     },
//   })
//   .add('SelectInput', () => {
//     const isMulti = boolean('Use multi-value select input', false);
//     const isPrefilled = boolean('Prefill selected value', false);
//     const showOptionGroupDivider = boolean('Show option group divider', false);
//     const initialState = (() => {
//       if (isMulti && isPrefilled) return ['ready'];
//       if (isMulti && !isPrefilled) return [];
//       if (!isMulti && isPrefilled) return 'ready';
//       return undefined;
//     })();
//     const initialColour = (() => {
//       if (isMulti && isPrefilled) return ['blue'];
//       if (isMulti && !isPrefilled) return [];
//       if (!isMulti && isPrefilled) return 'blue';
//       return undefined;
//     })();
//     const failValidation = boolean('Fail validation', false);
//     const stateOptions = [
//       { value: 'ready', label: 'Ready' },
//       { value: 'shipped', label: 'Shipped' },
//       { value: 'delivered', label: 'Delivered' },
//       { value: 'returned', label: 'Returned' },
//     ];
//     const initialValues = { state: initialState, colour: initialColour };
//     return (
//       <Section>
//         <Formik
//           key={`${isMulti}-${isPrefilled}`}
//           initialValues={initialValues}
//           validate={
//             // we use failing validation so that we can see the touched shape
//             // on form submission
//             () => (failValidation ? { state: true, colour: true } : {})
//           }
//           onSubmit={(values, formik, ...rest) => {
//             action('onSubmit')(values, formik, ...rest);
//             formik.resetForm({ values: initialValues });
//           }}
//           render={(formik) => {
//             const stateInput = {
//               hasError: failValidation,
//               isTouched: SelectInput.isTouched(formik.touched.state),
//             };
//             const colourInput = {
//               hasError: failValidation,
//               isTouched: SelectInput.isTouched(formik.touched.colour),
//             };
//             return (
//               <Spacings.Stack scale="l">
//                 <Spacings.Stack scale="xs">
//                   <SelectInput
//                     name="state"
//                     isMulti={isMulti}
//                     value={formik.values.state}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     options={stateOptions}
//                     hasError={stateInput.hasError && stateInput.isTouched}
//                     isSearchable={false}
//                     isClearable={true}
//                   />
//                   {stateInput.hasError && stateInput.isTouched && (
//                     <ErrorMessage>State is not valid</ErrorMessage>
//                   )}
//                 </Spacings.Stack>
//                 <Spacings.Stack scale="xs">
//                   <SelectInput
//                     name="colour"
//                     isMulti={isMulti}
//                     value={formik.values.colour}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     options={groupedOptions}
//                     hasError={colourInput.hasError && colourInput.isTouched}
//                     isSearchable={false}
//                     isClearable={true}
//                     showOptionGroupDivider={showOptionGroupDivider}
//                   />
//                   {colourInput.hasError && colourInput.isTouched && (
//                     <ErrorMessage>Colour is not valid</ErrorMessage>
//                   )}
//                 </Spacings.Stack>
//                 <Spacings.Inline>
//                   <SecondaryButton
//                     onClick={formik.handleReset}
//                     isDisabled={formik.isSubmitting}
//                     label="Reset"
//                   />
//                   <PrimaryButton
//                     onClick={formik.handleSubmit}
//                     isDisabled={formik.isSubmitting || !formik.dirty}
//                     label="Submit"
//                   />
//                 </Spacings.Inline>
//                 <hr />
//                 <FormikBox formik={formik} />
//               </Spacings.Stack>
//             );
//           }}
//         />
//       </Section>
//     );
//   });


import { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as icons from '@commercetools-uikit/icons';

import SelectInput from './select-input';

const options = [
  {
    label: 'Animals 1',
    options: [
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
    ],
  },
  {
    label: 'Animals 2',
    options: [
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
    ],
  },
  {
    label: 'Animals 3',
    options: [
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
    ],
  },
];

const meta = {
  title: 'Components/Inputs/SelectInputs/SelectInput',
  component: SelectInput,
  // parameters: {
  //   layout: 'centered',
  // },
  tags: ['autodocs'],
  argTypes: {
    iconLeft: {
      options: ['', ...Object.keys(icons)],
      mapping: Object.entries(icons).reduce<Record<string, ReactNode>>((acc, [iconName, IconComponent]) => {
        acc[iconName] = <IconComponent />;
        return acc;
      }, {}),
    }
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '24px'}}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    horizontalConstraint: 'scale',
    onFocus: () => {},
    options,
  },
};
