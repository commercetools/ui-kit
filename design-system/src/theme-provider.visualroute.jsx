import {
  ThemeProvider,
  useTheme,
  customProperties,
} from '@commercetools-uikit/design-system';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Suite, Spec } from '../../test/percy';

export const routePath = '/theme-provider';

const DummyComponent = (props) => {
  const { theme } = useTheme();
  return (
    <h1
      style={{
        color: props.color
          ? `var(--${kebabCase(props.color)})`
          : customProperties.colorPrimary,
      }}
    >
      {props.title ?? (
        <>
          Title with {theme} theme <i>colorPrimary</i> design token
        </>
      )}
    </h1>
  );
};
DummyComponent.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
};

export const component = () => (
  <Suite>
    <Spec label="use default theme">
      <ThemeProvider scope="local">
        <DummyComponent />
      </ThemeProvider>
    </Spec>

    <Spec label="use dark theme">
      <ThemeProvider scope="local" theme="dark">
        <DummyComponent />
      </ThemeProvider>
    </Spec>

    <Spec label="repeat default theme">
      <ThemeProvider scope="local">
        <DummyComponent />
      </ThemeProvider>
    </Spec>

    <Spec label="repeat dark theme">
      <ThemeProvider scope="local" theme="dark">
        <DummyComponent />
      </ThemeProvider>
    </Spec>

    <Spec label="overridden default theme">
      <ThemeProvider
        scope="local"
        theme="default"
        customPropertiesOverrides={{ colorPrimary: 'red' }}
      >
        <DummyComponent />
      </ThemeProvider>
    </Spec>

    <Spec label="custom property with double hyphen and kebab-case naming added to default theme">
      <ThemeProvider
        scope="local"
        theme="default"
        customPropertiesOverrides={{ '--custom-color': 'blue' }}
      >
        <DummyComponent
          color="--custom-color"
          title="Title with custom color"
        />
      </ThemeProvider>
    </Spec>

    <Spec label="custom property with camelCase naming added to default theme">
      <ThemeProvider
        scope="local"
        theme="default"
        customPropertiesOverrides={{ customColor: 'tomato' }}
      >
        <DummyComponent color="customColor" title="Title with custom color" />
      </ThemeProvider>
    </Spec>
  </Suite>
);
