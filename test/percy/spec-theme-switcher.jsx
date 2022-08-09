import { useTheme } from '@commercetools-uikit/design-system';
import { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

const SpecThemeSwitcher = (props) => {
  const { changeTheme } = useTheme();
  useLayoutEffect(() => {
    changeTheme(props.theme);
  }, [changeTheme, props.theme]);

  return props.children;
};

SpecThemeSwitcher.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
};

SpecThemeSwitcher.defaultProps = {
  theme: 'default',
};

export default SpecThemeSwitcher;
