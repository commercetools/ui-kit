import { useRef } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@commercetools-uikit/design-system';

export const LocalThemeProvider = (props) => {
  const ref = useRef(null);

  return (
    <div ref={ref}>
      <ThemeProvider
        ref={ref}
        theme={props.theme}
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
  theme: PropTypes.string,
};

const darkTheme = {
  colorSurface: 'black',
  colorSolid: 'white',
  colorNeutral60: 'rgba(255,255,255,0.60)',
  colorNeutral: 'rgba(255,255,255,0.60)',
  colorAccent98: 'rgba(0,0,0,0.98)',
};

export const LocalDarkThemeProvider = (props) => (
  <LocalThemeProvider theme={props.theme} customPropertiesOverrides={darkTheme}>
    {props.children}
  </LocalThemeProvider>
);
LocalDarkThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
};
