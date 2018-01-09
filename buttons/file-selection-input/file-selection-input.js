import React from 'react';
import PropTypes from 'prop-types';
import styles from './file-selection-input.mod.css';

const FileSelectionInput = props => (
  <label>
    <span className={styles.button}>
      <input
        className={styles.input}
        type="file"
        accept="image/png,image/jpeg,image/gif"
        onChange={props.onChange}
        multiple={props.isMultiple}
      />
      {props.children}
    </span>
  </label>
);

FileSelectionInput.displayName = 'FileSelectionInput';
FileSelectionInput.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool,
};
FileSelectionInput.defaultProps = {
  isMultiple: false,
};
export default FileSelectionInput;
