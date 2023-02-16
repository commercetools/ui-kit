import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import Section from '../../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import SelectableSearchInput from './selectable-search-input';
import { useState } from 'react';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('SelectableSearchInput', () => {
    const menuOptions = [
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

    const name = text('name', '') || 'default-name';
    const [dropdownValue, setDropdownValue] = useState();
    const [textInputValue, setTextInputValue] = useState();

    const value = {
      textValue: textInputValue,
      dropdownValue: dropdownValue,
    };

    return (
      <Section
        backgroundColor={select(
          'storyBackgroundColor',
          {
            Default: null,
            Contrast: 'aliceblue',
          },
          null
        )}
      >
        <SelectableSearchInput
          id={text('id', '')}
          name={name}
          value={value}
          onChange={(event) => {
            action('onChange')(event);
            if (event.target.name.endsWith('.textInput')) {
              setTextInputValue(event.target.value);
            }
            if (event.target.name.endsWith('.dropdown')) {
              setDropdownValue(event.target.value);
            }
          }}
          isAutofocussed={boolean('isAutofocussed', false)}
          isDisabled={boolean('isDisabled', false)}
          isReadOnly={boolean('isReadOnly', false)}
          isClearable={boolean('isClearable', true)}
          hasError={boolean('hasError', false)}
          hasWarning={boolean('hasWarning', false)}
          placeholder={text('placeholder', 'Placeholder')}
          horizontalConstraint={select(
            'horizontalConstraint',
            Constraints.getAcceptedMaxPropValues(3),
            7
          )}
          menuOptions={menuOptions}
        />
      </Section>
    );
  });
