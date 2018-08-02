import React from 'react';
import { storiesOf } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import Section from '../../.storybook/decorators/section';
import Readme from './README.md';
import DateInput from './date-input';

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DateInput', () => {
    const locale = select('locale', ['de', 'en'], 'en');
    const timeZone = select(
      'timeZone',
      ['Europe/Madrid', 'America/Los_Angeles'],
      'Europe/Madrid'
    );
    return (
      <Section>
        <IntlProvider locale={locale}>
          <DateInput
            key={`${locale}-${timeZone}`}
            placeholder={text('placeholder', 'Select a date...')}
            mode={select('mode', ['single', 'multiple', 'range'], 'single')}
            timeScale={'date'}
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
        </IntlProvider>
      </Section>
    );
  });
