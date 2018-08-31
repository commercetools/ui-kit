import React from 'react';
import { Value } from 'react-value';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import LinkTo from '@storybook/addon-links/react';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Spacings from '../../materials/spacings';
import Readme from './README.md';
import CreatableSelectInput from './creatable-select-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('CreatableSelectInput', () => {
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
    const isMulti = boolean('isMulti', false);
    return (
      <Spacings.Stack scale="xl">
        <Section>
          <IntlProvider locale="en">
            <Value
              key={isMulti}
              defaultValue={isMulti ? [] : undefined}
              render={(value, onChange) => (
                <CreatableSelectInput
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    ['xs', 's', 'm', 'l', 'xl', 'scale'],
                    'scale'
                  )}
                  name={text('name', 'form-field-name')}
                  value={value}
                  onChange={(event, ...args) => {
                    action('onChange')(event, ...args);
                    onChange(event.target.value);
                  }}
                  onBlur={action('onBlur')}
                  isMulti={isMulti}
                  placeholder={text('placeholder', 'Select..')}
                  isSearchable={boolean('isSearchable', true)}
                  isDisabled={boolean('isDisabled', false)}
                  isClearable={boolean('isClearable', false)}
                  hasError={boolean('hasError', false)}
                  hasWarning={boolean('hasWarning', false)}
                  options={options}
                />
              )}
            />
          </IntlProvider>
        </Section>
        <Section>
          <LinkTo kind="Examples|Forms/Inputs" story="CreatableSelectInput">
            See form example
          </LinkTo>
        </Section>
      </Spacings.Stack>
    );
  });
