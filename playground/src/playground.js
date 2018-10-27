import React from 'react';
import { PrimaryButton, MoneyInput, i18n } from 'ui-kit';
import { IntlProvider } from 'react-intl';

export default class Playground extends React.Component {
  static displayName = 'Playground';
  render() {
    return (
      <IntlProvider locale="en" messages={i18n.en}>
        <div>
          <h1>Components</h1>
          <h2>PrimaryButton</h2>
          <PrimaryButton
            label="Alerts a message"
            onClick={() => alert('Button clicked')}
            horizontalConstraint="m"
          />
          <h2>MoneyInput</h2>
          <MoneyInput
            id={'some-id'}
            name={'some-name'}
            value={{
              currencyCode: 'EUR',
              amount: '12.50',
            }}
            currencies={['EUR', 'USD']}
            horizontalConstraint="m"
            onChange={event => alert(JSON.stringify(event))}
          />
        </div>
      </IntlProvider>
    );
  }
}
