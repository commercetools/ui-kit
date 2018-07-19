import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import Section from '../.storybook/decorators/section';
import Readme from './README.md';
import DatePicker from './date-picker';

addLocaleData({
  locale: 'de',
});

storiesOf('Dates', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DatePicker', () => {
    const locale = select('locale', ['de', 'en'], 'en');
    const timeZone = select(
      'timeZone',
      ['Europe/Madrid', 'America/Los_Angeles'],
      'Europe/Madrid'
    );
    return (
      <IntlProvider
        locale={locale}
        messages={{
          en: {
            'UIKit.DatePicker.labelRange': 'to',
          },
          de: {
            'UIKit.DatePicker.labelRange': 'bis',
          },
        }}
      >
        <Section>
          <DatePicker
            key={`${locale}-${timeZone}`}
            placeholder={text('placeholder', 'Select a date...')}
            mode={select('mode', ['single', 'multiple', 'range'], 'single')}
            timeScale={select(
              'timeScale',
              ['date', 'datetime', 'time'],
              'date'
            )}
            isDisabled={boolean('isDisabled', false)}
            value={text('Date (UTC)', '2017-12-31T16:02:50.000Z')}
            onChange={action('on change')}
            isInvalid={boolean('isInvalid?', false)}
            timeZone={timeZone}
            horizontalConstraint={select(
              'horizontalConstraint',
              ['xs', 's', 'm', 'l', 'xl', 'scale'],
              'm'
            )}
          />
        </Section>
      </IntlProvider>
    );
  });
