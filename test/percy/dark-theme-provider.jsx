import PropTypes from 'prop-types';
import { ThemeProvider } from '@commercetools-uikit/design-system';

const darkTheme = {
  colorSurface: 'black',
  colorSolid: 'white',
  colorNeutral60: 'rgba(255,255,255,0.60)',
  colorNeutral: 'rgba(255,255,255,0.60)',
  colorAccent98: 'rgba(0,0,0,0.98)',
};

const DarkThemeProvider = (props) => (
  <ThemeProvider scope="local" customPropertiesOverrides={darkTheme}>
    {props.children}
  </ThemeProvider>
);
DarkThemeProvider.propTypes = {
  children: PropTypes.node,
};
DarkThemeProvider.displayName = 'DarkThemeProvider';

export default DarkThemeProvider;
