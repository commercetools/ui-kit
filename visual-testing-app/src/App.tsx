/// <reference types="vite/client" />
import './globals.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@commercetools-uikit/design-system';

interface TRouteComponent {
  routePath: string;
  component: React.ComponentType;
}

type TRouteObject = {
  [key: string]: TRouteComponent;
};

const pkgComponentsModules: TRouteObject = import.meta.glob(
  '../../packages/**/*.visualroute.jsx',
  { eager: true }
);

const designSystemComponentsModules: TRouteObject = import.meta.glob(
  '../../design-system/**/*.visualroute.jsx',
  { eager: true }
);

const allUniqueRouteComponents = Object.values({
  ...pkgComponentsModules,
  ...designSystemComponentsModules,
}).reduce<Record<string, TRouteComponent>>((allComponents, RouteComponent) => {
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

const App = () => {
  console.log(pkgComponentsModules);
  return (
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
};

export default App;
