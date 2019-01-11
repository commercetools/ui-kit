import React from 'react';
import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import Toggle from '.';

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Toggle', () => (
    <Section>
      <Value
        defaultValue={false}
        render={(value, onChange) => (
          <Toggle
            id={text('id', '')}
            name={text('name', '')}
            size={select('size', ['small', 'big'], 'big')}
            isDisabled={boolean('isDisabled', false)}
            isChecked={value}
            onChange={event => {
              action('onChange')(event);
              onChange(event.target.checked);
            }}
          />
        )}
      />
    </Section>
  ));
