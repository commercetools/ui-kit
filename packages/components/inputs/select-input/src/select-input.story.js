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
import Readme from '../README.md';
import SelectInput from './select-input';
import * as icons from '../../../icons';

const iconNames = Object.keys(icons);

const getMenuPortalTargetValue = (menuPortalTarget) => {
  if (menuPortalTarget === 'document.body') {
    return document.body;
  }
  return undefined;
};

storiesOf('Components|Inputs/SelectInputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('SelectInput', () => {
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
                <SelectInput
                  horizontalConstraint={select(
                    'horizontalConstraint',
                    Constraints.getAcceptedMaxPropValues(3),
                    'scale'
                  )}
                  hasError={boolean('hasError', false)}
                  hasWarning={boolean('hasWarning', false)}
                  aria-label={text('aria-label', '')}
                  aria-labelledby={text('aria-labelledby', '')}
                  isAutofocussed={boolean('isAutofocussed', false)}
                  backspaceRemovesValue={boolean('backspaceRemovesValue', true)}
                  controlShouldRenderValue={boolean(
                    'controlShouldRenderValue',
                    true
                  )}
                  id={text('id', '')}
                  containerId={text('containerId', '')}
                  isClearable={boolean('isClearable', false)}
                  isDisabled={boolean('isDisabled', false)}
                  isReadOnly={boolean('isReadOnly', false)}
                  isMulti={isMulti}
                  isSearchable={boolean('isSearchable', false)}
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
                  showOptionGroupDivider={showOptionGroupDivider}
                  iconLeft={iconLeft ? createElement(iconLeft) : undefined}
                  menuPortalZIndex={select('menuPortalZIndex', [1, 2, 3], 1)}
                  // this IIFE is only to make the `menuPortalTarget` knob show up after `menuPortalZIndex`
                  {...(() => {
                    const menuPortalTarget = select(
                      'menuPortalTarget',
                      ['undefined', 'document.body'],
                      'undefined'
                    );
                    return {
                      menuPortalTarget:
                        getMenuPortalTargetValue(menuPortalTarget),
                    };
                  })()}
                />
                {/* this IIFE is only to make the `menuPortalZIndex-show-neighbouring-stacking-context` knob show up last on the list */}
                {(() => {
                  const isActive = boolean(
                    'menuPortalZIndex-show-neighbouring-stacking-context',
                    false
                  );
                  return isActive && <NeighbouringStackingContext />;
                })()}
              </Spacings.Stack>
            )}
          />
        </Section>
        <Section>
          <LinkTo kind="Examples/Forms/Inputs/SelectInputs" story="SelectInput">
            See form example
          </LinkTo>
        </Section>
      </Spacings.Stack>
    );
  });
