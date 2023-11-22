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
} from '@storybook/addon-knobs';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import Section from '../../../../../docs/.storybook/decorators/section';
import NeighbouringStackingContext from '../../../../../docs/.storybook/decorators/neighbouring-stacking-context';
import { addMenuPortalProps } from '../../../../../docs/.storybook/utils';
import Readme from '../README.md';
import * as icons from '../../../icons';
import AsyncSelectField from './async-select-field';

const animalOptions = [
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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const filterAnimals = (inputValue) =>
  animalOptions.filter((animalOption) =>
    animalOption.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const loadOptions = (inputValue) =>
  delay(500).then(() => filterAnimals(inputValue));

storiesOf('Components|Fields/SelectFields', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('AsyncSelectField', () => {
    const isMulti = boolean('isMulti', false);
    const hint = text('hint', 'Bonus points if it is a mammal');
    const loadingMessage = text('loadingMessage', 'Loading results');

    const defaultOptions = boolean('defaultOptions', true)
      ? animalOptions
      : false;

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
            <Spacings.Stack scale="m">
              <AsyncSelectField
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
                controlShouldRenderValue={boolean(
                  'controlShouldRenderValue',
                  true
                )}
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
                loadingMessage={loadingMessage}
                title={text('title', 'Favourite animal')}
                maxMenuHeight={number('maxMenuHeight', 220)}
                isSearchable={boolean('isSearchable', true)}
                isClearable={boolean('isClearable', false)}
                tabIndex={text('tabIndex', '0')}
                tabSelectsValue={boolean('tabSelectsValue', true)}
                // Async props
                defaultOptions={defaultOptions}
                loadOptions={loadOptions}
                cacheOptions={boolean('cacheOptions', false)}
                // FieldLabel
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
            </Spacings.Stack>
          )}
        />
      </Section>
    );
  });
