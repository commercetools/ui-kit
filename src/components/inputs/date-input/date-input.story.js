import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import DateInputReadme from './README.md';
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
              ['xs', 's', 'm', 'l', 'xl', 'scale'],
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

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DateInputReadme))
  .add('DateInput', () => <DateInputStory />);
