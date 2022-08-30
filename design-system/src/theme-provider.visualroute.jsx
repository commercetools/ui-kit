import { useTheme, customProperties } from '@commercetools-uikit/design-system';
import { Switch, Route } from 'react-router';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import {
  Suite,
  Spec,
  LocalDarkThemeProvider,
  LocalThemeProvider,
} from '../../test/percy';
import { ThemeProvider } from './theme-provider';

export const routePath = '/theme-provider';

const parentSelector = (id) => () => document.getElementById(id);

const DummyComponent = (props) => {
  const { theme } = useTheme(parentSelector(props.parentId));

  return (
    <h1
      style={{
        color: props.color
          ? `var(--${kebabCase(props.color)})`
          : customProperties.colorSolid,
        backgroundColor: customProperties.colorSurface,
        margin: 0,
      }}
    >
      {props.title ?? (
        <>
          Title with {theme} theme <i>colorSolid</i> design token
        </>
      )}
    </h1>
  );
};
DummyComponent.propTypes = {
  color: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  parentId: PropTypes.string,
};

const DefaultRoute = () => (
  <Suite>
    <Spec label="use global default theme">
      <DummyComponent />
    </Spec>

    <Spec label="use local default theme">
      <LocalThemeProvider
        parentId="local-1"
        parentSelector={parentSelector('local-1')}
      >
        <DummyComponent parentId="local-1" />
      </LocalThemeProvider>
    </Spec>

    <Spec label="use local dark theme">
      <LocalDarkThemeProvider
        theme="dark"
        parentId="local-2"
        parentSelector={parentSelector('local-2')}
      >
        <DummyComponent parentId="local-2" />
      </LocalDarkThemeProvider>
    </Spec>

    <Spec label="repeat local default theme">
      <LocalThemeProvider
        parentId="local-3"
        parentSelector={parentSelector('local-3')}
      >
        <DummyComponent parentId="local-3" />
      </LocalThemeProvider>
    </Spec>

    <Spec label="repeat local dark theme">
      <LocalDarkThemeProvider
        theme="dark"
        parentId="local-4"
        parentSelector={parentSelector('local-4')}
      >
        <DummyComponent parentId="local-4" />
      </LocalDarkThemeProvider>
    </Spec>

    <Spec label="overridden local default theme">
      <LocalThemeProvider
        themeOverrides={{ colorSolid: 'red' }}
        parentId="local-5"
        parentSelector={parentSelector('local-5')}
      >
        <DummyComponent
          title={
            <>
              Title with overridden <i>colorSolid</i> design token
            </>
          }
          parentId="local-5"
        />
      </LocalThemeProvider>
    </Spec>

    <Spec label="custom property added to default theme">
      <LocalThemeProvider
        themeOverrides={{ customColor: 'tomato' }}
        parentId="local-6"
        parentSelector={parentSelector('local-6')}
      >
        <DummyComponent
          color="customColor"
          title="Title with custom color"
          parentId="local-6"
        />
      </LocalThemeProvider>
    </Spec>
  </Suite>
);

const TestComponent = (props) => (
  <div
    style={{
      color: customProperties.colorSolid,
      backgroundColor: customProperties.colorSurface,
    }}
  >
    {props.text}
  </div>
);
TestComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

const localThemeParentSelector = () => document.getElementById('local');

const InteractiveRoute = () => {
  const { applyTheme } = useTheme();
  return (
    <>
      <button
        onClick={() => {
          applyTheme({
            themeOverrides: {
              colorSolid: 'red',
              colorSurface: 'yellow',
              customColor: '#BADA55',
            },
          });
        }}
      >
        change global theme
      </button>
      <button
        onClick={() => {
          applyTheme({
            themeOverrides: { colorSolid: 'green', colorSurface: 'tomato' },
            parentSelector: localThemeParentSelector,
          });
        }}
      >
        change local theme
      </button>
      <ThemeProvider />
      <TestComponent text="global" />
      <div id="local">
        <ThemeProvider parentSelector={localThemeParentSelector} />
        <TestComponent text="local" />
      </div>
    </>
  );
};

export const component = () => (
  <Switch>
    <Route path={`${routePath}/interactive`} component={InteractiveRoute} />
    <Route path={routePath} component={DefaultRoute} />
  </Switch>
);
