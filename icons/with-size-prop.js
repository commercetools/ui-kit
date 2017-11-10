import { mapProps } from 'recompose';
import classnames from 'classnames';
import styles from './icons.mod.css';

export default mapProps(({ size, ...remainingProps }) => ({
  ...remainingProps,
  ...(size === 'scale'
    ? { className: classnames(remainingProps.className, styles.scale) }
    : {}),
  width: size === 'small' ? 16 : 24,
  height: size === 'small' ? 16 : 24,
}));
