import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import Section from '../../../../.storybook/decorators/section';
import Readme from './README.md';
import DateTimeInput from './date-time-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DateTimeInput', () => {
    const locale = select('locale', ['de', 'en'], 'en');
    const timeZone = select(
      'timeZone',
      ['Europe/Madrid', 'America/Los_Angeles'],
      'Europe/Madrid'
    );
    return (
      <Section>
        <IntlProvider locale={locale}>
          <Value
            key={`${locale}-${timeZone}`}
            defaultValue="2017-12-31T16:02:50.000Z"
            render={(value, onChange) => (
              <DateTimeInput
                key={`${locale}-${timeZone}`}
                id={text('id', '')}
                placeholder={text('placeholder', 'Select a date...')}
                mode={select('mode', ['single', 'multiple', 'range'], 'single')}
                isDisabled={boolean('isDisabled', false)}
                value={text('value (Date in UTC)', value)}
                onChange={datetime => {
                  action('onChange')(datetime);
                  onChange(datetime);
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
        </IntlProvider>
      </Section>
    );
  });
