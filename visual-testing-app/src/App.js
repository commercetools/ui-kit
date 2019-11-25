import React from 'react';
import { PrimaryButton, Card } from 'ui-kit';

class App extends React.Component {
  render() {
    return (
      <div>
        <PrimaryButton label="ok" />
        <Card>Ok</Card>
      </div>
    );
  }
}

App.displayName = 'App';

export default App;
