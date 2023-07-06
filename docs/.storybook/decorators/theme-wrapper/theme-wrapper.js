import PropTypes from 'prop-types';
import { ThemeProvider } from '@commercetools-uikit/design-system';

const ThemeWrapper = (storyFn) => {
  return (
    <>
      <ThemeProvider theme="test" />
      {storyFn()}
    </>
  );
};

ThemeWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ThemeWrapper;
