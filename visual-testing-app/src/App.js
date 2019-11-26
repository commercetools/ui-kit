import React from 'react';
import { PrimaryButton, Card, DateInput, i18n } from 'ui-kit';
import { IntlProvider } from 'react-intl';

class App extends React.Component {
  render() {
    return (
      <IntlProvider locale="en" messages={i18n.en}>
        <PrimaryButton label="ok" />
        <DateInput value="" onChange={() => {}} />
        <Card>Ok</Card>
      </IntlProvider>
    );
  }
}

App.displayName = 'App';

export default App;
