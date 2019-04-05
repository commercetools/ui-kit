import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import customProperties from '@commercetools-frontend/ui-kit/dist/esm/customProperties';
// eslint-disable-next-line import/no-unresolved
import * as routes from './routes';

const darkTheme = {
  colorSurface: 'black',
  colorSolid: 'white',
  colorNeutral60: 'rgba(255,255,255,0.60)',
  colorNeutral: 'rgba(255,255,255,0.60)',
  colorAccent98: 'rgba(0,0,0,0.98)',
};

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={customProperties}>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <div>
                  <h1>Visual Testing App</h1>
                  <ul>
                    {Object.values(routes).map(({ routePath }) => (
                      <li key={routePath}>
                        <a href={routePath}>{routePath}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            />
            {Object.values(routes).map(
              ({ routePath, component: Component }) => (
                <Route
                  key={routePath}
                  path={routePath}
                  render={() => <Component themes={{ darkTheme }} />}
                />
              )
            )}
            <Route
              component={() => (
                <div>
                  <p>No route found</p>
                  <a href="/">Show all routes</a>
                </div>
              )}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

App.displayName = 'App';

export default App;
