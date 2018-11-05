import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import moment from 'moment-timezone';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import DateTimeInput from './date-time-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DateTimeInput', () => {
    const timeZone = select(
      'timeZone',
      ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/Berlin'],
      'UTC'
    );
    return (
      <Section>
        <Value
          defaultValue=""
          render={(value, onChange) => (
            <div>
              <pre>Value: {value}</pre>
              <pre>
                Value in {timeZone}:{' '}
                {value && moment.tz(value, timeZone).toString()}
              </pre>
              <DateTimeInput
                timeZone={timeZone}
                value={value}
                onChange={date => {
                  action('onChange')(date);
                  onChange(date);
                }}
                onFocus={action('onFocus')}
                onBlur={action('onBlur')}
                isClearable={boolean('isClearable', true)}
                horizontalConstraint={select(
                  'horizontalConstraint',
                  ['xs', 's', 'm', 'l', 'xl', 'scale'],
                  'm'
                )}
                isDisabled={boolean('isDisabled', false)}
                hasError={boolean('hasError', false)}
                hasWarning={boolean('hasWarning', false)}
              />
            </div>
          )}
        />
      </Section>
    );
  });
