import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import Readme from './README.md';
import DateInput from './date-input';
import Section from '../../../../.storybook/decorators/section';

class DateInputStory extends React.Component {
  static displayName = 'DateInputStory';

  state = {
    value: '2018-11-16',
  };

  handleChange = event => {
    action('onChange')(event);
    this.setState({ value: event.target.value });
  };

  render() {
    const placeholder = text('placeholder', '');
    return (
      <Section>
        <div>
          <DateInput
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
            isDisabled={boolean('isDisabled', false)}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
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
