import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import DateCalendarReadme from './README.md';
import DateCalendar from './date-calendar';
import Section from '../../../../.storybook/decorators/section';

class DateCalendarStory extends React.Component {
  static displayName = 'DateCalendarStory';

  render() {
    return (
      <Section>
        <DateCalendar />
      </Section>
    );
  }
}

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DateCalendarReadme))
  .add('DateCalendar', () => <DateCalendarStory />);
