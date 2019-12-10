import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { getExampleDateStrings } from '@commercetools-uikit/calendar-utils';
import Readme from './README.md';
import DateInput from './date-input';
import Section from '../../../../.storybook/decorators/section';

const exampleDates = getExampleDateStrings();

class DateInputStory extends React.Component {
  static displayName = 'DateInputStory';

  state = {
    value: exampleDates.preselectedDate,
  };

  handleChange = event => {
    action('onChange')(event);
    this.setState({ value: event.target.value });
  };

  handleFocus = event => {
    action('onFocus')(event);
  };

  handleBlur = event => {
    action('onBlur')(event);
  };

  render() {
    const placeholder = text('placeholder', '');
    return (
      <Section>
        <div>
          <DateInput
            value={this.state.value}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            horizontalConstraint={select(
              'horizontalConstraint',
              ['m', 'l', 'xl', 'scale'],
              'l'
            )}
            id={text('id', '')}
            name={text('name', '')}
            placeholder={placeholder === '' ? undefined : placeholder}
            isDisabled={boolean('isDisabled', false)}
            isReadOnly={boolean('isReadOnly', false)}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
            minValue={text('minValue', exampleDates.minDate)}
            maxValue={text('maxValue', exampleDates.maxDate)}
          />
        </div>
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
  .add('DateInput', () => <DateInputStory />);
