import React from 'react';
import PropTypes from 'prop-types';
import RichTextInputButton from './rich-text-input-button';

const RichTextInputMarkButton = props => {
  const { onClickMark } = props;

  const onMouseDown = () => {
    onClickMark(props.type);
  };

  return (
    <RichTextInputButton
      label={props.type}
      onMouseDown={onMouseDown}
      isActive={props.isActive}
      icon={props.icon}
    />
  );
};

RichTextInputMarkButton.displayName = 'RichTextInputMarkButton';

RichTextInputMarkButton.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.any,
  type: PropTypes.string.isRequired,
  onClickMark: PropTypes.func,
};

export default RichTextInputMarkButton;
