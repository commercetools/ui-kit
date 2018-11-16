import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import DateCalendarReadme from './README.md';
import DateCalendar from './date-calendar';
import Section from '../../../../.storybook/decorators/section';

class DateCalendarStory extends React.Component {
  static displayName = 'DateCalendarStory';

  state = {
    value: '2018-11-16',
  };

  handleChange = event => {
    action('onChange')(event);
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Section>
        <DateCalendar value={this.state.value} onChange={this.handleChange} />
      </Section>
    );
  }
}

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DateCalendarReadme))
  .add('DateCalendar', () => <DateCalendarStory />);
