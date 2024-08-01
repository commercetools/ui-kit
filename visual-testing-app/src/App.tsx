import './globals.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@commercetools-uikit/design-system';

// @ts-expect-error
const pkgComponentsModules = import.meta.glob(
  '../../packages/**/*.visualroute.jsx',
  { eager: true }
);
// @ts-expect-error
const designSystemComponentsModules = import.meta.glob(
  '../../design-system/**/*.visualroute.jsx',
  { eager: true }
);

const allUniqueRouteComponents = Object.values({
  ...pkgComponentsModules,
  ...designSystemComponentsModules,
}).reduce((allComponents, RouteComponent) => {
  // trim leading slash
  // @ts-expect-error
  const label = RouteComponent.routePath.substring(1);
  // @ts-expect-error
  if (allComponents[label]) {
    // eslint-disable-next-line no-console
    console.error(`Duplicate route generated for: /${label}`);
  }
  // eslint-disable-next-line no-param-reassign
  // @ts-expect-error
  allComponents[label] = RouteComponent;
  return allComponents;
}, {});
// @ts-expect-error
const allSortedComponents = Object.keys(allUniqueRouteComponents)
  .sort() // @ts-expect-error
  .map((key) => allUniqueRouteComponents[key]);

const App = () => (
  <>
    <ThemeProvider />
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
