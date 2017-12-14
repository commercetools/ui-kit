import { mapProps } from 'recompose';
import classnames from 'classnames';
import styles from './toggle.mod.css';

const getSize = (size, isMouseOver, isDisabled) => {
  if (isMouseOver && !isDisabled) {
    return size === 'small' ? 26 : 52;
  }
  return size === 'small' ? 16 : 32;
};

const getHoverStateClass = isMouseOver => (isMouseOver ? '-hover' : '');

const getCheckedStateClass = isChecked => (isChecked ? '-checked' : '');

const getClassName = (defaultClass, isChecked, isMouseOver, size) =>
  styles[
    `${defaultClass}${getHoverStateClass(isMouseOver)}${getCheckedStateClass(
      isChecked
    )}-${size}`
  ];

export default mapProps(
  ({ size, isChecked, isMouseOver, isDisabled, ...remainingProps }) => ({
    ...remainingProps,
    className: classnames(
      getClassName('button', isChecked, isDisabled ? false : isMouseOver, size)
    ),
    width: getSize(size, isMouseOver, isDisabled),
    height: getSize(size, isMouseOver, isDisabled),
  })
);
