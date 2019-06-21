import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import Readme from './README.md';
import DateTimeInput from './date-time-input';
import Section from '../../../../.storybook/decorators/section';

class DateTimeInputStory extends React.Component {
  static displayName = 'DateTimeInputStory';

  state = {
    value: '',
  };

  handleChange = event => {
    action('onChange')(event);
    this.setState({ value: event.target.value });
  };

  render() {
    const placeholder = text('placeholder', '');
    return (
      <Section>
        <DateTimeInput
          value={this.state.value}
          onChange={this.handleChange}
          horizontalConstraint={select(
            'horizontalConstraint',
            ['m', 'l', 'xl', 'scale'],
            'l'
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
          placeholder={placeholder === '' ? undefined : placeholder}
          isDisabled={boolean('isDisabled', false)}
          hasError={boolean('hasError', false)}
          hasWarning={boolean('hasWarning', false)}
        />
      </Section>
    );
  }
}

storiesOf('Components|Inputs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('DateTimeInput', () => <DateTimeInputStory />);
