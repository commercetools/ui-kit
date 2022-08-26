import { useTheme, customProperties } from '@commercetools-uikit/design-system';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import {
  Suite,
  Spec,
  LocalDarkThemeProvider,
  LocalThemeProvider,
} from '../../test/percy';

export const routePath = '/theme-provider';

const ThemeSwitcher = () => {
  const { changeTheme, theme } = useTheme();
  return (
    <button
      onClick={() =>
        changeTheme({ newTheme: theme === 'default' ? 'dark' : 'default' })
      }
    >
      Change theme
    </button>
  );
};

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

export const component = () => (
  <Suite>
    <ThemeSwitcher />
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

    <Spec label="custom css variable added to default theme">
      <LocalThemeProvider
        themeOverrides={{ '--custom-color': 'blue' }}
        parentId="local-6"
        parentSelector={parentSelector('local-6')}
      >
        <DummyComponent
          color="--custom-color"
          title="Title with custom color"
          parentId="local-6"
        />
      </LocalThemeProvider>
    </Spec>

    <Spec label="custom property with camelCase naming added to default theme">
      <LocalThemeProvider
        themeOverrides={{ customColor: 'tomato' }}
        parentId="local-7"
        parentSelector={parentSelector('local-7')}
      >
        <DummyComponent
          color="customColor"
          title="Title with custom color"
          parentId="local-7"
        />
      </LocalThemeProvider>
    </Spec>
  </Suite>
);
