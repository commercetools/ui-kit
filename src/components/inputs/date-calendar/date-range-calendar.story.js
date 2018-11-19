import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import DateCalendarReadme from './README.md';
import DateRangeCalendar from './date-range-calendar';
import Section from '../../../../.storybook/decorators/section';

class DateRangeCalendarStory extends React.Component {
  static displayName = 'DateRangeCalendarStory';

  state = {
    value: ['2018-11-13', '2018-11-16'],
  };

  handleChange = event => {
    action('onChange')(event);
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Section>
        <div>
          <DateRangeCalendar
            value={this.state.value}
            onChange={this.handleChange}
          />
          {JSON.stringify(this.state.value)}
        </div>
      </Section>
    );
  }
}

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DateCalendarReadme))
  .add('DateRangeCalendar', () => <DateRangeCalendarStory />);
