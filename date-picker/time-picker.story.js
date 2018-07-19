import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import Section from '../.storybook/decorators/section';
import DatePicker from './date-picker';
import Readme from './README.md';

storiesOf('Dates', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('TimePicker', () => {
    const locale = select('locale', ['de', 'en'], 'en');
    const timeZone = select(
      'timeZone',
      ['Europe/Madrid', 'America/Los_Angeles'],
      'Europe/Madrid'
    );
    return (
      <IntlProvider
        locale="en"
        messages={{
          en: {
            'UIKit.DatePicker.labelRange': 'to',
          },
        }}
      >
        <Section>
          <DatePicker
            key={`${locale}-${timeZone}`}
            placeholder={text('placeholder', 'Select time ...')}
            mode={select('mode', ['single', 'multiple', 'range'], 'single')}
            timeScale={select(
              'timeScale',
              ['date', 'datetime', 'time'],
              'time'
            )}
            isDisabled={boolean('isDisabled?', false)}
            value={text('Time (UTC)', '16:02:50.000')}
            onChange={action('on change')}
            isInvalid={boolean('isInvalid?', false)}
            timeZone={timeZone}
            locale={locale}
          />
        </Section>
      </IntlProvider>
    );
  });
