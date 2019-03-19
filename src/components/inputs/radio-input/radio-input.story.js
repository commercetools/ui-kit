import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import { Value } from 'react-value';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Spacings from '../../spacings';
import Readme from './README.md';
import RadioInput from '.';

const radioGroup = 'Radio Group';
const radioOption1 = 'Option #1';
const radioOption2 = 'Option #2';
const radioOption3 = 'Option #3';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('RadioInputGroup', () => (
    <Section>
      <Value
        defaultValue={'apple'}
        render={(value, onChange) => (
          <RadioInput.Group
            id={text('id', 'fruits', radioGroup)}
            name={text('name', 'fruits', radioGroup)}
            value={value}
            onChange={event => {
              action('onChange')(event);
              onChange(event.target.value);
            }}
            onBlur={event => {
              action('onBlur')(event);
            }}
            onFocus={event => {
              action('onFocus')(event);
            }}
            isDisabled={boolean('disabled', false, radioGroup)}
            isReadOnly={boolean('read only', false, radioGroup)}
            hasError={boolean('has error', false, radioGroup)}
            hasWarning={boolean('has warning', false, radioGroup)}
            horizontalConstraint={select(
              'horizontalConstraint',
              ['m', 'l', 'xl', 'scale'],
              'm',
              radioGroup
            )}
            direction={select(
              'direction',
              ['stack', 'inline'],
              'stack',
              radioGroup
            )}
            directionProps={{
              scale: select(
                'direction props (scale)',
                ['xs', 's', 'm', 'l', 'xl'],
                'm',
                radioGroup
              ),
            }}
          >
            <RadioInput.Option
              value={text('value #1', 'apple', radioOption1)}
              isDisabled={boolean(
                'isDisabled #1 (forced)',
                false,
                radioOption1
              )}
              isHovered={boolean('isHovered #1', false, radioOption1)}
            >
              <Spacings.Inline scale="xs" alignItems="center">
                <div>{'🍎'}</div>
                {text('label #1', 'Apple', radioOption1)}
              </Spacings.Inline>
            </RadioInput.Option>
            <RadioInput.Option
              value={text('value #2', 'banana', radioOption2)}
              isDisabled={boolean(
                'isDisabled #2 (forced)',
                false,
                radioOption2
              )}
              isHovered={boolean('isHovered #2', false, radioOption2)}
            >
              <Spacings.Inline scale="xs" alignItems="center">
                <div>{'🍌'}</div>
                {text('label #2', 'Banana', radioOption2)}
              </Spacings.Inline>
            </RadioInput.Option>
            <RadioInput.Option
              value={text('value #3', 'pineapple', radioOption3)}
              isDisabled={boolean(
                'isDisabled #3 (forced)',
                false,
                radioOption3
              )}
              isHovered={boolean('isHovered #3', false, radioOption3)}
            >
              <Spacings.Inline scale="xs" alignItems="center">
                <div>{'🍍'}</div>
                {text('label #3', 'Pineapple', radioOption3)}
              </Spacings.Inline>
            </RadioInput.Option>
          </RadioInput.Group>
        )}
      />
    </Section>
  ));
