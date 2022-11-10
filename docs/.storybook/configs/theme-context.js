import PropTypes from 'prop-types';
import { ThemeProvider } from '../../../design-system';

const ThemeWrapper = (props) => {
  return (
    <>
      <ThemeProvider theme={props.themeName} />
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
    name: 'Test Theme',
    props: { themeName: 'test' },
  },
];

const themeContext = {
  icon: 'box', // a icon displayed in the Storybook toolbar to control contextual props
  title: 'Themes', // an unique name of a contextual environment
  components: [ThemeWrapper],
  params: themeParams,
  options: {
    deep: true, // pass the `props` deeply into all wrapping components
    // Disable only in the main production environment.
    disable: process.env.VERCEL_ENV === 'production', // disable this contextual environment completely
    cancelable: false, // allow this contextual environment to be opt-out optionally in toolbar
  },
};

export default themeContext;
