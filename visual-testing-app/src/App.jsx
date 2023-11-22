import './globals.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@commercetools-uikit/design-system';

const pkgComponentsModules = import.meta.globEager(
  '../../packages/**/*.visualroute.jsx'
);
const designSystemComponentsModules = import.meta.globEager(
  '../../design-system/**/*.visualroute.jsx'
);

const allUniqueRouteComponents = Object.values({
  ...pkgComponentsModules,
  ...designSystemComponentsModules,
}).reduce((allComponents, RouteComponent) => {
  // trim leading slash
  const label = RouteComponent.routePath.substring(1);
  if (allComponents[label]) {
    // eslint-disable-next-line no-console
    console.error(`Duplicate route generated for: /${label}`);
  }
  // eslint-disable-next-line no-param-reassign
  allComponents[label] = RouteComponent;
  return allComponents;
}, {});
const allSortedComponents = Object.keys(allUniqueRouteComponents)
  .sort()
  .map((key) => allUniqueRouteComponents[key]);

const App = () => (
  <>
    <ThemeProvider theme="test" />
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
            render={() => <Component.component />}
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
  </>
);

export default App;
