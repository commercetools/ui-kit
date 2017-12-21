import React from 'react';
import PropTypes from 'prop-types';
import Spacings from '../../materials/spacings';
import LoadingSpinner from '../../loading-spinner';
import styles from './text-input.mod.css';

const getStyles = props => {
  if (props.isReadOnly) return styles.readonly;
  if (props.isDisabled) return styles.disabled;
  if (props.isLoading) return styles.loading;
  if (props.hasError) return styles.error;
  if (props.hasWarning) return styles.warning;

  return styles.pristine;
};

const TextInput = props => (
  <div className={styles.container}>
    <input
      name={props.name}
      type="text"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      disabled={props.isDisabled}
      placeholder={props.placeholder}
      className={getStyles(props)}
      readOnly={props.isReadOnly}
      autoFocus={props.isAutofocussed}
      /* ARIA */
      aria-readonly={props.isReadOnly}
      role="textbox"
      contentEditable={!props.isReadOnly}
    />
    {props.isLoading && (
      <div className={styles.spinner}>
        <Spacings.InsetSquish>
          <LoadingSpinner scale="s" />
        </Spacings.InsetSquish>
      </div>
    )}
  </div>
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isAutofocussed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default TextInput;
