import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
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
    const placeholder = text('placeholder', '');
    return (
      <Section>
        <DateRangeCalendar
          value={this.state.value}
          onChange={this.handleChange}
          horizontalConstraint={select(
            'horizontalConstraint',
            ['xs', 's', 'm', 'l', 'xl', 'scale'],
            'scale'
          )}
          id={text('id', '')}
          name={text('name', '')}
          placeholder={placeholder === '' ? undefined : placeholder}
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
  .add('DateRangeCalendar', () => <DateRangeCalendarStory />);
