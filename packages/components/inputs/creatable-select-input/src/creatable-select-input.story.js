import { createElement } from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import LinkTo from '@storybook/addon-links/react';
import Section from '../../../../../docs/.storybook/decorators/section';
import NeighbouringStackingContext from '../../../../../docs/.storybook/decorators/neighbouring-stacking-context';
import { addMenuPortalProps } from '../../../../../docs/.storybook/utils';
import Readme from '../README.md';
import CreatableSelectInput from './creatable-select-input';
import * as icons from '../../../icons';

const iconNames = Object.keys(icons);

storiesOf('Components|Inputs/SelectInputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('CreatableSelectInput', () => {
    const options = [
      {
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
        ],
      },
      {
        options: [
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
        ],
      },
      {
        options: [
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
        ],
      },
    ];
    const isMulti = boolean('isMulti', false);
    const showOptionGroupDivider = boolean('Show option group divider', false);
    const iconLeft = icons[select('iconLeft', ['', ...iconNames])];

    return (
      <Spacings.Stack scale="xl">
        <Section>
          <Value
            key={isMulti}
            defaultValue={isMulti ? [] : undefined}
            render={(value, onChange) => (
              <Spacings.Stack scale="m">
                <CreatableSelectInput
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    Constraints.getAcceptedMaxPropValues(3),
                    'scale'
                  )}
                  hasError={boolean('hasError', false)}
                  hasWarning={boolean('hasWarning', false)}
                  aria-label={text('aria-label', '')}
                  aria-labelledby={text('aria-labelledby', '')}
                  autoFocus={boolean('isAutofocussed', false)}
                  backspaceRemovesValue={boolean('backspaceRemovesValue', true)}
                  id={text('id', '')}
                  containerId={text('containerId', '')}
                  isClearable={boolean('isClearable', false)}
                  isCondensed={boolean('isCondensed', false)}
                  isDisabled={boolean('isDisabled', false)}
                  isReadOnly={boolean('isReadOnly', false)}
                  isMulti={isMulti}
                  isSearchable={boolean('isSearchable', true)}
                  maxMenuHeight={number('maxMenuHeight', 220)}
                  closeMenuOnSelect={boolean('closeMenuOnSelect', true)}
                  name={text('name', 'form-field-name')}
                  onBlur={action('onBlur')}
                  onChange={(event, ...args) => {
                    action('onChange')(event, ...args);
                    onChange(event.target.value);
                  }}
                  onFocus={action('onFocus')}
                  onInputChange={action('onInputChange')}
                  options={options}
                  placeholder={text('placeholder', 'Select..')}
                  tabIndex={text('tabIndex', '0')}
                  tabSelectsValue={boolean('tabSelectsValue', true)}
                  value={value}
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
                  showOptionGroupDivider={showOptionGroupDivider}
                  iconLeft={iconLeft ? createElement(iconLeft) : undefined}
                  {...addMenuPortalProps()}
                />
                <NeighbouringStackingContext />
              </Spacings.Stack>
            )}
          />
        </Section>
        <Section>
          <LinkTo
            kind="Examples/Forms/Inputs/SelectInputs"
            story="CreatableSelectInput"
          >
            See form example
          </LinkTo>
        </Section>
      </Spacings.Stack>
    );
  });
