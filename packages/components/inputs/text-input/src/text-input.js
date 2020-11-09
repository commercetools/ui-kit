import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { useTheme } from 'emotion-theming';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import { getInputStyles } from '../../styles';

const TextInput = (props) => {
  const theme = useTheme();
  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <input
        id={props.id}
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.onChange}
        className={props.className}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        disabled={props.isDisabled}
        placeholder={props.placeholder}
        readOnly={props.isReadOnly}
        autoFocus={props.isAutofocussed}
        autoComplete={props.autoComplete}
        css={getInputStyles(props, theme)}
        {...filterDataAttributes(props)}
        /* ARIA */
        aria-readonly={props.isReadOnly}
        role="textbox"
        contentEditable={!props.isReadOnly}
      />
    </Constraints.Horizontal>
  );
};

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id: PropTypes.string,
  /**
   * Used as HTML autocomplete property
   */
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  /**
   * Used as HTML name of the input component. property
   */
  name: PropTypes.string,
  /**
   * Value of the input component.
   */
  value: PropTypes.string.isRequired,
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   * <br />
   * Signature: `(event) => void`
   */
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  /**
   * Called when input is blurred
   * Signature: `(event) => void`
   */
  onBlur: PropTypes.func,
  /**
   * Called when input is focused
   * Signature: `(event) => void`
   */
  onFocus: PropTypes.func,
  /**
   * Focus the input on initial render
   */
  isAutofocussed: PropTypes.bool,
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled: PropTypes.bool,
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly: PropTypes.bool,
  /**
   * Indicates if the input has invalid values
   */
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  /**
   * Placeholder text for the input
   */
  placeholder: PropTypes.string,
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
};

TextInput.defaultProps = {
  horizontalConstraint: 'scale',
};

TextInput.isEmpty = (value) => !value || value.trim().length === 0;

export default TextInput;
