import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const componentsContext = require.context(
  '../../src/components',
  true,
  /\.visualroute\.js$/
);
const allComponents = componentsContext.keys().reduce((components, file) => {
  const Comp = componentsContext(file);
  const label = file.substring(file.lastIndexOf('/') + 1);
  // eslint-disable-next-line no-param-reassign
  components[label] = Comp;
  return components;
}, {});

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={() => <div>Home</div>} />
          {Object.values(allComponents).map(Component => (
            <Route
              key={Component.routePath}
              path={Component.routePath}
              component={Component.component}
            />
          ))}
          <Route component={() => <div>No route found</div>} />
        </Switch>
      </Router>
    );
  }
}

App.displayName = 'App';

export default App;
