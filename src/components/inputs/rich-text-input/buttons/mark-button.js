import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';

const MarkButton = props => {
  const { onClickMark } = props;

  const onMouseDown = React.useCallback(() => {
    onClickMark(props.type);
  }, [props.type, onClickMark]);

  return (
    <Button
      label={props.type}
      onMouseDown={onMouseDown}
      isActive={props.isActive}
      icon={props.icon}
    />
  );
};

MarkButton.displayName = 'MarkButton';

MarkButton.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.any,
  type: PropTypes.string.isRequired,
  onClickMark: PropTypes.func,
};

export default MarkButton;
