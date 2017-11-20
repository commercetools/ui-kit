import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import Section from '../.storybook/decorators/section';
import { DatePicker } from './date-picker';
import Readme from './README.md';

storiesOf('Dates', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('TimePicker', () => (
    <Section>
      <DatePicker
        placeholder={text('placeholder', 'Select time ...')}
        mode={select('mode', ['single', 'multiple', 'range'], 'single')}
        timeScale={select('timeScale', ['date', 'datetime', 'time'], 'time')}
        isDisabled={boolean('isDisabled?', false)}
        value={text('Time (UTC)', '16:02:50.000')}
        onChange={action('on change')}
        isInvalid={boolean('isInvalid?', false)}
        /* Note that when you switch the locale in the interface it will not update completely,
         * because the locale of flatpickr cannot be updated dynamically, you need to change the default (3rd parameter)
         * below */
        locale={select('locale', ['de', 'en'], 'de')}
        size={select(
          'size',
          { scale: 'Full-Width', static: 'Static' },
          'static'
        )}
      />
    </Section>
  ));
