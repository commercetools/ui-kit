import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import Radio from '.';

const radioGroup = 'Radio Group';
const radioOption1 = 'Option #1';
const radioOption2 = 'Option #2';
const radioOption3 = 'Option #3';

storiesOf('Components|Switches', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('RadioGroup', () => (
    <Section>
      <Value
        defaultValue={'foo-value'}
        render={(value, onChange) => (
          <Radio.Group
            name={text('name', '', radioGroup)}
            onChange={event => {
              action('onChange')(event);
              onChange(event.target.value);
            }}
            value={value}
            direction={select(
              'direction',
              ['stack', 'inline'],
              'stack',
              radioGroup
            )}
            scale={select(
              'scale',
              ['xs', 's', 'm', 'l', 'xl'],
              'm',
              radioGroup
            )}
          >
            <Radio.Option
              isDisabled={boolean('isDisabled #1', false, radioOption1)}
              isHovered={boolean('isHovered #1', false, radioOption1)}
              value="foo-value"
            >
              {'Label of primary action'}
            </Radio.Option>
            <Radio.Option
              value="bar-value"
              isDisabled={boolean('isDisabled #2', false, radioOption2)}
              isHovered={boolean('isHovered #2', false, radioOption2)}
            >
              {'Label of second action'}
            </Radio.Option>
            <Radio.Option
              value="baz-value"
              isDisabled={boolean('isDisabled #3', false, radioOption3)}
              isHovered={boolean('isHovered #3', false, radioOption3)}
            >
              {'Label of third action'}
            </Radio.Option>
          </Radio.Group>
        )}
      />
    </Section>
  ));
