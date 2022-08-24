import PropTypes from 'prop-types';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { createSequentialId } from '@commercetools-uikit/utils';
import { useFieldId } from '@commercetools-uikit/hooks';

const sequentialId = createSequentialId('local-theme-provider-');

export const LocalThemeProvider = (props) => {
  const id = useFieldId(undefined, sequentialId);
  return (
    <div id={id}>
      <ThemeProvider
        theme={props.theme}
        themeOverrides={props.themeOverrides}
        parentSelector={() => document.getElementById(id)}
      />
      {props.children}
    </div>
  );
};
LocalThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  themeOverrides: PropTypes.object,
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
  <LocalThemeProvider theme="dark" themeOverrides={darkTheme}>
    {props.children}
  </LocalThemeProvider>
);
LocalDarkThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
