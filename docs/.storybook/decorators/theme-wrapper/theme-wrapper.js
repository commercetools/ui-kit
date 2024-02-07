import PropTypes from 'prop-types';
import { ThemeProvider } from '../../../../design-system';

const ThemeWrapper = (storyFn) => {
  return (
    <>
      <ThemeProvider theme="default" />
      {storyFn()}
    </>
  );
};

ThemeWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ThemeWrapper;
