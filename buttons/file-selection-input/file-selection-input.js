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
        name={props.name}
        onChange={props.onChange}
        multiple={props.allowMultiple}
      />
      {props.children}
    </span>
  </label>
);

FileSelectionInput.displayName = 'FileSelectionInput';
FileSelectionInput.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  allowMultiple: PropTypes.bool,
};
FileSelectionInput.defaultProps = {
  allowMultiple: false,
};
export default FileSelectionInput;
