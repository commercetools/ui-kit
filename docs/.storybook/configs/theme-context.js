import PropTypes from 'prop-types';
import { ThemeProvider } from '@emotion/react';
import { customProperties } from '../../../design-system';

const darkTheme = {
  colorSolid: customProperties.colorSurface,
  colorSurface: customProperties.colorSolid,
};

const defaultTheme = customProperties;

const ThemeWrapper = (props) => (
  <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
);

ThemeWrapper.propTypes = {
  theme: PropTypes.any,
};

const themeParams = [
  {
    name: 'Default Theme',
    props: { theme: defaultTheme },
    default: true,
  },
  {
    name: 'Dark Theme (experimental)',
    props: { theme: darkTheme },
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
