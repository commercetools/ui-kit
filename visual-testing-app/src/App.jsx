import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  customProperties,
  ThemeProvider as CssVariablesThemeProvider,
} from '@commercetools-uikit/design-system';

const darkTheme = {
  colorSurface: 'black',
  colorSolid: 'white',
  colorNeutral60: 'rgba(255,255,255,0.60)',
  colorNeutral: 'rgba(255,255,255,0.60)',
  colorAccent98: 'rgba(0,0,0,0.98)',
};
const pkgComponentsModules = import.meta.globEager(
  '../../packages/**/*.visualroute.jsx'
);
const designSystemComponentsModules = import.meta.globEager(
  '../../design-system/**/*.visualroute.jsx'
);

const allUniqueRouteComponents = Object.values({
  ...pkgComponentsModules,
  ...designSystemComponentsModules
}).reduce(
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
  .map((key) => allUniqueRouteComponents[key]);

const App = () => (
  <CssVariablesThemeProvider>
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
                  {allSortedComponents.map((Component) => (
                    <li key={Component.routePath}>
                      <a href={Component.routePath}>{Component.routePath}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
          {allSortedComponents.map((Component) => (
            <Route
              key={Component.routePath}
              path={Component.routePath}
              // eslint-disable-next-line react/jsx-pascal-case
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
  </CssVariablesThemeProvider>
);

export default App;
