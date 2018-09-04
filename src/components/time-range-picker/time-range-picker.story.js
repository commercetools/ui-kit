import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs } from '@storybook/addon-knobs';
import Section from '../../../.storybook/decorators/section';
import Readme from './README.md';
import TimeRangePicker from './time-range-picker';

storiesOf('TimeRangePicker', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('TimeRangePicker', () => (
    <Section>
      <TimeRangePicker
        value={{}}
        onChange={action}
        timeZone={'Europe/Madrid'}
      />
    </Section>
  ));
