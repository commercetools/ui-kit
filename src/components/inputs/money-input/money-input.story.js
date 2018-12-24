import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  array,
  boolean,
  text,
  select,
} from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import MoneyInputReadme from './README.md';
import MoneyInput from './money-input';

// This uses a dedicated story component to keep track of state instead of
// react-value. The reason is that MoneyInput can call twice onChange before
// the component rerenders, so we'd need to use two separate <Value />
// components to not lose data. So we use a dedicated component instead.
// That makes it easier to log the parsed value as well.
class MoneyInputStory extends React.Component {
  static displayName = 'MoneyInputStory';

  state = {
    amount: '',
    currencyCode: '',
  };

  componentDidUpdate(prevState) {
    if (
      prevState.amount !== this.state.amount ||
      prevState.currencyCode !== this.state.currencyCode
    ) {
      // eslint-disable-next-line no-console
      console.log(
        'parsed',
        MoneyInput.convertToMoneyValue({
          amount: this.state.amount,
          currencyCode: this.state.currencyCode,
        })
      );
    }
  }

  render() {
    const name = text('name', '') || 'default-name';
    const value = {
      amount: this.state.amount,
      currencyCode: this.state.currencyCode,
    };
    return (
      <React.Fragment>
        <Section>
          <MoneyInput
            id={text('id', '')}
            name={name}
            value={value}
            currencies={array('currencies', ['EUR', 'USD', 'AED', 'KWD'])}
            placeholder={text('placeholder', 'Placeholder')}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
            isDisabled={boolean('isDisabled', false)}
            isReadOnly={boolean('isReadOnly', false)}
            isCurrencySelectionDisabled={boolean(
              'isCurrencySelectionDisabled',
              false
            )}
            isAutofocussed={boolean('isAutofocussed', false)}
            onChange={event => {
              action('onChange')(event);

              if (event.target.name.endsWith('.amount')) {
                this.setState({ amount: event.target.value });
              }

              if (event.target.name.endsWith('.currencyCode')) {
                this.setState({ currencyCode: event.target.value });
              }
            }}
            hasError={boolean('hasError', false)}
            hasWarning={boolean('hasWarning', false)}
            horizontalConstraint={select(
              'horizontalConstraint',
              ['s', 'm', 'l', 'xl', 'scale'],
              'm'
            )}
          />
        </Section>
        <Section>
          <p>
            <i>
              Check the console to see the result of{' '}
              <code>MoneyInput.convertToMoneyValue</code>.
            </i>
          </p>
        </Section>
      </React.Fragment>
    );
  }
}

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(MoneyInputReadme))
  .add('MoneyInput', () => <MoneyInputStory />);
