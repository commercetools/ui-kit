import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import TimeInput from './time-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('TimeInput', () => {
    const timeZone = select(
      'timeZone',
      ['Europe/Madrid', 'America/Los_Angeles'],
      'Europe/Madrid'
    );
    return (
      <Section>
        <Value
          key={timeZone}
          defaultValue="17:12:00.000"
          render={(value, onChange) => (
            <TimeInput
              key={timeZone}
              id={text('id', '')}
              placeholder={text('placeholder', 'Select a time...')}
              mode={select('mode', ['single', 'multiple', 'range'], 'single')}
              isDisabled={boolean('isDisabled', false)}
              value={text('value (Date in UTC)', value)}
              onChange={time => {
                action('onChange')(time);
                onChange(time);
              }}
              isInvalid={boolean('isInvalid?', false)}
              timeZone={timeZone}
              horizontalConstraint={select(
                'horizontalConstraint',
                ['xs', 's', 'm', 'l', 'xl', 'scale'],
                'm'
              )}
            />
          )}
        />
      </Section>
    );
  });
