import { mapProps } from 'recompose';
import invariant from 'tiny-invariant';
import styles from './icons.mod.css';

const getThemeClassName = theme => {
  if (!theme) return undefined;

  const themeClassName = styles[`theme-${theme}`];

  // Whenever a theme is specified a fitting theme className should
  // be available.
  invariant(
    themeClassName,
    `ui-kit/Icon: the specified theme '${theme}' is not supported.`
  );

  return themeClassName;
};

export default mapProps(({ theme, ...remainingProps }) => ({
  ...remainingProps,
  className: getThemeClassName(theme),
}));
