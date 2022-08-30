import PropTypes from 'prop-types';
import { useEffect } from 'react';
import {
  customProperties,
  themesNames,
  ThemeProvider,
  useTheme,
} from '../../../design-system';

const defaultThemeName = themesNames.default;

const defaultTheme = customProperties;

const customTheme = {
  colorSolid: '#fff',
  colorSurface: '#1a1a1a',
};

const ThemeToggler = (props) => {
  const { applyTheme } = useTheme();

  useEffect(() => {
    applyTheme({ newTheme: props.name, themeOverrides: props.theme });
  });

  return null;
};

const ThemeWrapper = (props) => {
  return (
    <>
      <ThemeProvider theme={defaultThemeName} />
      <ThemeToggler {...props} />
      {props.children}
    </>
  );
};

ThemeWrapper.propTypes = {
  theme: PropTypes.any,
};

const themeParams = [
  {
    name: 'Default Theme',
    props: { name: 'default', theme: defaultTheme },
  },
  {
    name: 'Custom Theme',
    props: { name: 'default', theme: customTheme },
  },
];

const themeContext = {
  icon: 'box', // a icon displayed in the Storybook toolbar to control contextual props
  title: 'Themes', // an unique name of a contextual environment
  components: [ThemeWrapper],
  params: themeParams,
  options: {
    deep: true, // pass the `props` deeply into all wrapping components
    disable: false, // disable this contextual environment completely
    cancelable: false, // allow this contextual environment to be opt-out optionally in toolbar
  },
};

export default themeContext;
