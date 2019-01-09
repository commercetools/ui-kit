import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const componentsContext = require.context(
  '../../src/components',
  true,
  /\.visualroute\.js$/
);
const allComponents = componentsContext.keys().reduce((components, file) => {
  const Comp = componentsContext(file);
  // trim leading slash
  const label = Comp.routePath.substring(1);
  if (components[label]) {
    // eslint-disable-next-line no-console
    console.error(`Duplicate route generated for: /${label}`);
  }
  // eslint-disable-next-line no-param-reassign
  components[label] = Comp;
  return components;
}, {});

const sketchContext = require.context('../..', true, /\.sketch\.js$/);
const sketchComponents = sketchContext.keys().reduce((components, file) => {
  const Comp = sketchContext(file);
  components.push(Comp);
  return components;
}, []);

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
          <Route
            path="/sketch"
            render={() => (
              <React.Fragment>
                {sketchComponents.map((exps, index) => (
                  <exps.default key={index} />
                ))}
              </React.Fragment>
            )}
          />
          <Route render={() => <div>No route found</div>} />
        </Switch>
      </Router>
    );
  }
}

App.displayName = 'App';

export default App;
