import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import DateCalendarReadme from './README.md';
import DateTimeCalendar from './date-time-calendar';
import Section from '../../../../.storybook/decorators/section';

class DateTimeCalendarStory extends React.Component {
  static displayName = 'DateTimeCalendarStory';

  state = {
    value: '',
  };

  handleChange = event => {
    action('onChange')(event);
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Section>
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
          id={text('id', '')}
          name={text('name', '')}
          placeholder={text('placeholder', '')}
          isDisabled={boolean('isDisabled', false)}
          hasError={boolean('hasError', false)}
          hasWarning={boolean('hasWarning', false)}
        />
      </Section>
    );
  }
}

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DateCalendarReadme))
  .add('DateTimeCalendar', () => <DateTimeCalendarStory />);
