import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import TextareaAutosize from 'react-textarea-autosize';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { getTextareaStyles } from './multiline-input.styles';

const MIN_ROW_COUNT = 1;

const MultilineInput = (props) => {
  return (
    <TextareaAutosize
      name={props.name}
      type="text"
      autoComplete={props.autoComplete}
      value={props.value}
      onChange={props.onChange}
      onHeightChange={props.onHeightChange}
      id={props.id}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      disabled={props.isDisabled}
      placeholder={props.placeholder}
      readOnly={props.isReadOnly}
      autoFocus={props.isAutofocussed}
      className={props.className}
      css={(theme) => getTextareaStyles(props, theme)}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      aria-multiline="true"
      role="textbox"
      minRows={MIN_ROW_COUNT}
      maxRows={props.isOpen ? undefined : MIN_ROW_COUNT}
      useCacheForDOMMeasurements={true}
      {...filterDataAttributes(props)}
    />
  );
};

MultilineInput.displayName = 'MultilineInput';

MultilineInput.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isAutofocussed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  placeholder: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onHeightChange: PropTypes.func,
};

export default MultilineInput;
