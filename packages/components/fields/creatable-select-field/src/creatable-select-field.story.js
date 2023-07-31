import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Value } from 'react-value';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
  number,
} from '@storybook/addon-knobs/react';
import Constraints from '../../../constraints';
import Stack from '../../../spacings/spacings-stack';
import Section from '../../../../../docs/.storybook/decorators/section';
import NeighbouringStackingContext from '../../../../../docs/.storybook/decorators/neighbouring-stacking-context';
import { addMenuPortalProps } from '../../../../../docs/.storybook/utils';
import Readme from '../README.md';
import * as icons from '../../../icons';
import CreatableSelectField from './creatable-select-field';

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

storiesOf('Components|Fields/SelectFields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('CreatableSelectField', () => {
    const isMulti = boolean('isMulti', false);
    const hint = text('hint', 'Bonus points if it is a mammal');

    // hintIcon will only render when hint exists
    const iconNames = Object.keys(icons);
    const icon = select('hintIcon', ['', ...iconNames], '');
    const hintIcon = icon ? createElement(icons[icon]) : undefined;
    const name = text('name', 'favAnimal');
    const id = text('id', '');
    const iconLeft = icons[select('iconLeft', ['', ...iconNames])];

    return (
      <Section>
        <Value
          key={isMulti}
          defaultValue={isMulti ? [] : undefined}
          render={(value, onChange) => (
            <Stack scale="m">
              <CreatableSelectField
                horizontalConstraint={select(
                  'horizontalConstraint',
                  Constraints.getAcceptedMaxPropValues(3),
                  7
                )}
                errors={object('errors', { missing: true, customError: true })}
                renderError={(key) => {
                  switch (key) {
                    case 'customError':
                      return 'A custom error.';
                    default:
                      return null;
                  }
                }}
                isRequired={boolean('isRequired', false)}
                touched={boolean('touched', false)}
                aria-label={text('aria-label', '')}
                aria-labelledby={text('aria-labelledby', '')}
                backspaceRemovesValue={boolean('backspaceRemovesValue', true)}
                containerId={text('containerId', '')}
                id={id || undefined}
                name={name}
                value={value}
                onChange={(event) => {
                  action('onChange')(event);
                  onChange(event.target.value);
                }}
                onBlur={action('onBlur')}
                onFocus={action('onFocus')}
                onInputChange={action('onInputChange')}
                isAutofocussed={boolean('isAutofocussed', false)}
                isDisabled={boolean('isDisabled', false)}
                isReadOnly={boolean('isReadOnly', false)}
                isMulti={isMulti}
                hasWarning={boolean('hasWarning', false)}
                placeholder={text('placeholder', 'Select...')}
                title={text('title', 'Favourite animal')}
                maxMenuHeight={number('maxMenuHeight', 220)}
                isSearchable={boolean('isSearchable', true)}
                isClearable={boolean('isClearable', false)}
                options={options}
                tabIndex={text('tabIndex', '0')}
                tabSelectsValue={boolean('tabSelectsValue', true)}
                // Creatable props
                allowCreateWhileLoading={boolean(
                  'allowCreateWhileLoading',
                  false
                )}
                createOptionPosition={select(
                  'createOptionPosition',
                  ['first', 'last'],
                  'last'
                )}
                // FieldLabel props
                hint={hint}
                description={text('description', '')}
                onInfoButtonClick={
                  boolean('show info button', false)
                    ? action('onInfoButtonClick')
                    : undefined
                }
                hintIcon={hintIcon}
                badge={text('badge', '')}
                iconLeft={iconLeft ? createElement(iconLeft) : undefined}
                {...addMenuPortalProps()}
              />
              <NeighbouringStackingContext />
            </Stack>
          )}
        />
      </Section>
    );
  });
