import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import Readme from './README.md';
import DateRangeInput from './date-range-input';
import Section from '../../../../.storybook/decorators/section';

class DateRangeInputStory extends React.Component {
  static displayName = 'DateRangeInputStory';

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
        <DateRangeInput
          value={this.state.value}
          onChange={this.handleChange}
          horizontalConstraint={select(
            'horizontalConstraint',
            ['m', 'l', 'xl', 'scale'],
            'l'
          )}
          id={text('id', '')}
          name={text('name', '')}
          placeholder={placeholder === '' ? undefined : placeholder}
          isClearable={boolean('isClearable', false)}
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
  .add('DateRangeInput', () => <DateRangeInputStory />);
