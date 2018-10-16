import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import DateInput from './date-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DateInput', () => {
    const timeZone = select(
      'timeZone',
      ['Europe/Madrid', 'America/Los_Angeles'],
      'Europe/Madrid'
    );
    return (
      <Section>
        <Value
          key={timeZone}
          defaultValue="2017-12-31"
          render={(value, onChange) => (
            <DateInput
              id={text('id', '')}
              placeholder={text('placeholder', 'Select a date...')}
              mode={select('mode', ['single', 'multiple', 'range'], 'single')}
              isDisabled={boolean('isDisabled', false)}
              value={text('value (Date in UTC)', value)}
              onChange={date => {
                action('onChange')(date);
                onChange(date);
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
