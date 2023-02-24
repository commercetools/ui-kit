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

const themeContext = {
  icon: 'box', // a icon displayed in the Storybook toolbar to control contextual props
  title: 'Themes', // an unique name of a contextual environment
  components: [ThemeWrapper],
  params: [
    {
      name: 'Current design',
      props: { themeName: 'default' },
    },
    {
      name: 'New design (beta)',
      props: { themeName: 'test' },
    },
  ],
  options: {
    deep: true, // pass the `props` deeply into all wrapping components
    cancelable: false, // allow this contextual environment to be opt-out optionally in toolbar
  },
};

export default themeContext;
