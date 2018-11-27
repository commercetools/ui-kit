import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
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
        <div>
          <DateCalendar
            value={this.state.value}
            onChange={this.handleChange}
            horizontalConstraint={select(
              'horizontalConstraint',
              ['xs', 's', 'm', 'l', 'xl', 'scale'],
              'scale'
            )}
            id={text('id', '')}
            name={text('name', '')}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
          />
        </div>
      </Section>
    );
  }
}

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DateCalendarReadme))
  .add('DateCalendar', () => <DateCalendarStory />);
