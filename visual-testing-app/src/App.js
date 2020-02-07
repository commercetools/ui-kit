import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { customProperties } from '@commercetools-uikit/design-system';

const darkTheme = {
  colorSurface: 'black',
  colorSolid: 'white',
  colorNeutral60: 'rgba(255,255,255,0.60)',
  colorNeutral: 'rgba(255,255,255,0.60)',
  colorAccent98: 'rgba(0,0,0,0.98)',
};

const srcComponentsContext = require.context(
  '../../src/components',
  true,
  /\.visualroute\.js$/
);
const pkgComponentsContext = require.context(
  '../../packages',
  true,
  /\.visualroute\.js$/
);
const srcRouteComponent = srcComponentsContext
  .keys()
  .map(id => srcComponentsContext(id));
const pkgRouteComponent = pkgComponentsContext
  .keys()
  .map(id => pkgComponentsContext(id));
const allRouteComponents = srcRouteComponent.concat(pkgRouteComponent);
const allUniqueRouteComponents = allRouteComponents.reduce(
  (allComponents, RouteComponent) => {
    // trim leading slash
    const label = RouteComponent.routePath.substring(1);
    if (allComponents[label]) {
      // eslint-disable-next-line no-console
      console.error(`Duplicate route generated for: /${label}`);
    }
    // eslint-disable-next-line no-param-reassign
    allComponents[label] = RouteComponent;
    return allComponents;
  },
  {}
);
const allSortedComponents = Object.keys(allUniqueRouteComponents)
  .sort()
  .map(key => allUniqueRouteComponents[key]);

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
                    {allSortedComponents.map(Component => (
                      <li key={Component.routePath}>
                        <a href={Component.routePath}>{Component.routePath}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            />
            {allSortedComponents.map(Component => (
              <Route
                key={Component.routePath}
                path={Component.routePath}
                render={() => <Component.component themes={{ darkTheme }} />}
              />
            ))}
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
