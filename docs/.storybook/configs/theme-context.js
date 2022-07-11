import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import {
  customProperties,
  ThemeProvider as CssVariablesThemeProvider,
  useTheme,
} from '../../../design-system';

const darkTheme = {
  colorSolid: customProperties.colorSurface,
  colorSurface: customProperties.colorSolid,
};

const defaultTheme = customProperties;

const ThemeToggler = (props) => {
  const { changeTheme } = useTheme();

  useEffect(() => {
    changeTheme(props.theme);
  });

  return <></>;
};

const ThemeWrapper = (props) => {
  return (
    <CssVariablesThemeProvider>
      <ThemeToggler theme={props.name} />
      <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
    </CssVariablesThemeProvider>
  );
};

ThemeWrapper.propTypes = {
  theme: PropTypes.any,
};

const themeParams = [
  {
    name: 'Default Theme',
    props: { name: 'default', theme: defaultTheme },
    default: true,
  },
  {
    name: 'Dark Theme (experimental)',
    props: { name: 'dark', theme: darkTheme },
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
