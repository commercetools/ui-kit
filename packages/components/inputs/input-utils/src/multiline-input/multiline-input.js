import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import TextareaAutosize from 'react-textarea-autosize';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { getTextareaStyles } from './multiline-input.styles';

const MIN_ROW_COUNT = 1;

const MultilineInput = (props) => {
  const { onHeightChange } = props;
  const ref = React.useRef();
  const handleHeightChange = React.useCallback(
    (height, meta) => {
      const rowCount = Math.floor(ref.current.scrollHeight / meta.rowHeight);
      onHeightChange(height, rowCount);
    },
    [ref, onHeightChange]
  );
  return (
    <TextareaAutosize
      ref={ref}
      name={props.name}
      type="text"
      autoComplete={props.autoComplete}
      value={props.value}
      onChange={props.onChange}
      onHeightChange={handleHeightChange}
      id={props.id}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      disabled={props.isDisabled}
      placeholder={props.placeholder}
      readOnly={props.isReadOnly}
      autoFocus={props.isAutofocussed}
      css={getTextareaStyles(props)}
      // Allow to override the styles by passing a `className` prop.
      // Custom styles can also be passed using the `css` prop from emotion.
      // https://emotion.sh/docs/css-prop#style-precedence
      className={props.className}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      aria-multiline="true"
      role="textbox"
      minRows={MIN_ROW_COUNT}
      maxRows={props.isOpen ? undefined : MIN_ROW_COUNT}
      cacheMeasurements={true}
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
