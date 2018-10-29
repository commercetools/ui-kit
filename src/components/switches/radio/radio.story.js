import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import Radio from '.';

storiesOf('Switches', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Radio', () => (
    <Section>
      <Radio.Group
        name="uikit-group"
        onChange={action('onChange')}
        value={select(
          'value',
          ['foo-value', 'bar-value', 'baz-value'],
          'foo-value'
        )}
        direction={select('direction', ['stack', 'inline'], 'stack')}
        scale={select('scale', ['xs', 's', 'm', 'l', 'xl'], 'm')}
      >
        <Radio.Option
          isDisabled={boolean('isFirstOptionDisabled', false)}
          isHovered={boolean('isFirstOptionHovered', false)}
          value="foo-value"
        >
          {text('Label of primary action', 'Primary option')}
        </Radio.Option>
        <Radio.Option
          isDisabled={boolean('isSecondOptionDisabled', false)}
          isHovered={boolean('isSecondOptionHovered', true)}
          value="bar-value"
        >
          {text('Label of second action', 'Second option')}
        </Radio.Option>
        <Radio.Option
          isDisabled={boolean('isThirdOptionDisabled', true)}
          isHovered={boolean('isThirdOptionHovered', false)}
          value="baz-value"
        >
          {text('Label of third action', 'Third option')}
        </Radio.Option>
      </Radio.Group>
    </Section>
  ));
