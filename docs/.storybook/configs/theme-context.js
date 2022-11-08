import PropTypes from 'prop-types';
import {
  designTokens,
  ThemeProvider,
} from '@commercetools-uikit/design-system';

const defaultTheme = designTokens;

const customTheme = {
  colorSolid: '#fff',
  colorSurface: '#1a1a1a',
};

const ThemeWrapper = (props) => {
  return (
    <>
      <ThemeProvider
        theme={props.themeName}
        themeOverrides={props.themeOverrides}
      />
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
    props: { themeName: 'default' },
  },
  {
    name: 'Custom Theme',
    props: { themeName: 'default' },
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
