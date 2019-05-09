import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import omit from 'lodash/omit';
import { getInputStyles } from '../styles';
import { getConstraintSyles } from '../../constraints/horizontal';

class TextInput extends React.PureComponent {
  getInputProps = (props = {}) => {
    const readOnly = props.readOnly || props.isReadOnly;

    return {
      type: 'text',
      readOnly,
      disabled: props.disabled || props.isDisabled,
      autoFocus: props.autoFocus || props.isAutofocussed,
      /* ARIA */
      role: 'textbox',
      'aria-readonly': readOnly,
      contentEditable: readOnly,
      ...omit(props, [
        'hasError',
        'hasWarning',
        'horizontalConstraint',
        /* deprecated */
        'isReadOnly',
        'isDisabled',
        'isAutofocussed',
      ]),
    };
  };

  render() {
    return (
      <input
        css={theme => [
          getInputStyles(this.props, theme),
          getConstraintSyles(this.props.horizontalConstraint),
        ]}
        {...this.getInputProps(this.props)}
      />
    );
  }
}

TextInput.displayName = 'TextInput';
TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
};

TextInput.isEmpty = value => !value || value.trim().length === 0;

export default TextInput;
