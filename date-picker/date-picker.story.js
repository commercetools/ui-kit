import React from 'react';
import { IntlProvider } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import Section from '../.storybook/decorators/section';
import Readme from './README.md';
import DatePicker from './date-picker';

storiesOf('Dates', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DatePicker', () => (
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
          placeholder={text('placeholder', 'Select a date...')}
          mode={select('mode', ['single', 'multiple', 'range'], 'single')}
          timeScale={select('timeScale', ['date', 'datetime', 'time'], 'date')}
          isDisabled={boolean('isDisabled', false)}
          value={text('Date (UTC)', '2017-12-31T16:02:50.000Z')}
          onChange={action('on change')}
          isInvalid={boolean('isInvalid?', false)}
          timeZone={'Europe/Madrid'}
          /* Note that when you switch the locale in the interface it will not update completely,
           * because the locale of flatpickr cannot be updated dynamically, you need to change the default (3rd parameter)
           * below */
          locale={select('locale', ['de', 'en'], 'en')}
          horizontalConstraint={select(
            'horizontalConstraint',
            ['xs', 's', 'm', 'l', 'xl', 'scale'],
            'm'
          )}
        />
      </Section>
    </IntlProvider>
  ));
