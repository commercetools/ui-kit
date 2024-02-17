import { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import { action } from '@storybook/addon-actions';
import Readme from '../README.md';
import DateTimeInput from './date-time-input';
import Section from '../../../../../docs/.storybook/decorators/section';

class DateTimeInputStory extends Component {
  static displayName = 'DateTimeInputStory';

  state = {
    value: '',
  };

  handleChange = (event) => {
    action('onChange')(event);
    this.setState({ value: event.target.value });
  };

  onBlur = (event) => {
    action('onBlur')(event);
  };
  onFocus = (event) => action('onFocus')(event);

  render() {
    const placeholder = text('placeholder', '');
    return (
      <Section>
        <DateTimeInput
          value={this.state.value}
          onChange={this.handleChange}
          horizontalConstraint={select(
            'horizontalConstraint',
            Constraints.getAcceptedMaxPropValues(6),
            10
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
          isReadOnly={boolean('isReadOnly', false)}
          hasError={boolean('hasError', false)}
          hasWarning={boolean('hasWarning', false)}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          defaultDaySelectionTime={text('defaultDaySelectionTime', '')}
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
