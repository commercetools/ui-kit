import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  text,
  select,
  object,
} from '@storybook/addon-knobs';
import { injectIntl } from 'react-intl';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../../.storybook/decorators/section';
import MoneyFieldReadme from './README.md';
import * as icons from '../../icons';
import MoneyField from './money-field';
import MoneyInput from '../../inputs/money-input';

// This uses a dedicated story component to keep track of state instead of
// react-value. The reason is that MoneyInput can call twice onChange before
// the component rerenders, so we'd need to use two separate <Value />
// components to not lose data. So we use a dedicated component instead.
// That makes it easier to log the parsed value as well.
class MoneyFieldStory extends React.Component {
  static displayName = 'MoneyFieldStory';

  state = {
    currencyCode: '',
    amount: '',
  };

  componentDidUpdate(prevState) {
    if (
      prevState.amount !== this.state.amount ||
      prevState.currencyCode !== this.state.currencyCode
    ) {
      // eslint-disable-next-line no-console
      console.log(
        'parsed',
        MoneyInput.convertToMoneyValue(
          {
            amount: this.state.amount,
            currencyCode: this.state.currencyCode,
          },
          // eslint-disable-next-line react/prop-types
          this.props.intl.locale
        )
      );
    }
  }

  render() {
    const currencies = ['EUR', 'USD', 'AED', 'KWD', 'JPY'];
    const name = text('name', '') || 'default-name';
    const hint = text('hint', 'How much is the fish?');

    // hintIcon will only render when hint exists
    const iconNames = Object.keys(icons);
    const icon = select('hintIcon', ['', ...iconNames], '');
    const hintIcon = icon ? React.createElement(icons[icon]) : undefined;
    return (
      <Section>
        <MoneyField
          // MoneyField
          id={name.trim() === '' ? undefined : name}
          horizontalConstraint={select(
            'horizontalConstraint',
            ['xs', 's', 'm', 'l', 'xl', 'scale'],
            'm'
          )}
          errors={object('errors', { missing: true, customError: true })}
          renderError={key => {
            switch (key) {
              case 'customError':
                return 'A custom error.';
              default:
                return null;
            }
          }}
          isRequired={boolean('isRequired', false)}
          touched={
            boolean('touched', false)
              ? { amount: true, currencyCode: true }
              : { amount: false, currencyCode: false }
          }
          // MoneyInput
          name={name}
          value={{
            amount: this.state.amount,
            currencyCode: this.state.currencyCode,
          }}
          currencies={boolean('dropdown', true) ? currencies : undefined}
          placeholder={text('placeholder', 'Placeholder')}
          onBlur={action('onBlur')}
          isDisabled={boolean('isDisabled', false)}
          isReadOnly={boolean('isReadOnly', false)}
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
          // LabelField
          title={text('title', 'Price')}
          hint={hint}
          description={text('description', '')}
          onInfoButtonClick={
            boolean('show info button', false)
              ? action('onInfoButtonClick')
              : undefined
          }
          hintIcon={hintIcon}
          hasHighPrecisionBadge={boolean('hasHighPrecisionBadge', false)}
        />
      </Section>
    );
  }
}
const Story = injectIntl(MoneyFieldStory);
storiesOf('Components|Fields', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(MoneyFieldReadme))
  .add('MoneyField', () => <Story />);
