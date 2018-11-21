import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import DateCalendarReadme from './README.md';
import DateTimeCalendar from './date-time-calendar';
import Section from '../../../../.storybook/decorators/section';

class DateTimeCalendarStory extends React.Component {
  static displayName = 'DateTimeCalendarStory';

  state = {
    // value: '2018-11-19T14:22:50.631Z',
    value: '',
  };

  handleChange = event => {
    action('onChange')(event);
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Section>
        <div>
          <button
            onClick={() => {
              this.setState({ value: '2018-11-04T11:00:00.000Z' });
            }}
          >
            2018-11-04T11:00:00.000Z
          </button>
          <br />
          <button
            onClick={() => {
              this.setState({ value: '2018-11-19T14:22:50.631Z' });
            }}
          >
            2018-11-19T14:22:50.631Z
          </button>
          <button
            onClick={() => {
              this.setState({ value: '2018-11-19T15:00:00.000Z' });
            }}
          >
            2018-11-19T15:00:00.000Z
          </button>
          <br />
          <br />
          <DateTimeCalendar
            value={this.state.value}
            onChange={this.handleChange}
            horizontalConstraint={select(
              'horizontalConstraint',
              ['xs', 's', 'm', 'l', 'xl', 'scale'],
              'scale'
            )}
            timeZone={select(
              'timeZone',
              [
                'UTC',
                'America/Los_Angeles',
                'America/New_York',
                'Asia/Tokyo',
                'Europe/Amsterdam',
              ],
              'UTC'
            )}
          />
          {this.state.value}
        </div>
      </Section>
    );
  }
}

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DateCalendarReadme))
  .add('DateTimeCalendar', () => <DateTimeCalendarStory />);
