import { useRef } from 'react';
import {
  ThemeProvider,
  useTheme,
  customProperties,
} from '@commercetools-uikit/design-system';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Suite, Spec, LocalDarkThemeProvider } from '../../test/percy';

export const routePath = '/theme-provider';

const LocalThemeProvider = (props) => {
  const ref = useRef(null);

  return (
    <div ref={ref}>
      <ThemeProvider
        ref={ref}
        customPropertiesOverrides={props.customPropertiesOverrides}
      >
        {props.children}
      </ThemeProvider>
    </div>
  );
};
LocalThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  customPropertiesOverrides: PropTypes.object,
};

const DummyComponent = (props) => {
  const { theme } = useTheme();
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
};

export const component = () => (
  <Suite>
    <Spec label="use default theme">
      <LocalThemeProvider>
        <DummyComponent />
      </LocalThemeProvider>
    </Spec>

    <Spec label="use dark theme">
      <LocalDarkThemeProvider theme="dark">
        <DummyComponent />
      </LocalDarkThemeProvider>
    </Spec>

    <Spec label="repeat default theme">
      <LocalThemeProvider>
        <DummyComponent />
      </LocalThemeProvider>
    </Spec>

    <Spec label="repeat dark theme">
      <LocalDarkThemeProvider theme="dark">
        <DummyComponent />
      </LocalDarkThemeProvider>
    </Spec>

    <Spec label="overridden default theme">
      <LocalThemeProvider customPropertiesOverrides={{ colorSolid: 'red' }}>
        <DummyComponent
          title={
            <>
              Title with overridden <i>colorSolid</i> design token
            </>
          }
        />
      </LocalThemeProvider>
    </Spec>

    <Spec label="custom property with double hyphen and kebab-case naming added to default theme">
      <LocalThemeProvider
        customPropertiesOverrides={{ '--custom-color': 'blue' }}
      >
        <DummyComponent
          color="--custom-color"
          title="Title with custom color"
        />
      </LocalThemeProvider>
    </Spec>

    <Spec label="custom property with camelCase naming added to default theme">
      <LocalThemeProvider customPropertiesOverrides={{ customColor: 'tomato' }}>
        <DummyComponent color="customColor" title="Title with custom color" />
      </LocalThemeProvider>
    </Spec>
  </Suite>
);
