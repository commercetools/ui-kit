import { useTheme, designTokens } from '@commercetools-uikit/design-system';
import { Switch, Route } from 'react-router-dom';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import {
  Suite,
  Spec,
  LocalDarkThemeProvider,
  LocalThemeProvider,
} from '../../test/percy';

export const routePath = '/theme-provider';

const parentSelector = (id) => () => document.getElementById(id);

const DummyComponent = (props) => {
  const { theme } = useTheme(
    props.parentId ? parentSelector(props.parentId) : undefined
  );

  return (
    <h1
      style={{
        color: props.color
          ? `var(--${kebabCase(props.color)})`
          : designTokens.colorSolid,
        backgroundColor: designTokens.colorSurface,
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
      color: designTokens.colorSolid,
      backgroundColor: designTokens.colorSurface,
    }}
  >
    {props.text}
  </div>
);
TestComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

export const component = () => (
  <Switch>
    <Route path={routePath} component={DefaultRoute} />
  </Switch>
);
