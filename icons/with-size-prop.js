import { mapProps } from 'recompose';
import classnames from 'classnames';
import styles from './icons.mod.css';

const ICON_SIZES = {
  SMALL: 12,
  MEDIUM: 16,
  BIG: 24,
};

const getIconSize = size => {
  switch (size) {
    case 'small':
      return ICON_SIZES.SMALL;
    case 'medium':
      return ICON_SIZES.MEDIUM;
    case 'big':
      return ICON_SIZES.BIG;
    default:
      return ICON_SIZES.BIG;
  }
};

export default mapProps(({ size, ...remainingProps }) => ({
  ...remainingProps,
  ...(size === 'scale'
    ? { className: classnames(remainingProps.className, styles.scale) }
    : {}),
  width: getIconSize(size),
  height: getIconSize(size),
}));
