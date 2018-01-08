import React from 'react';
import PropTypes from 'prop-types';
import styles from './upload-file-button.mod.css';

const UploadFileButton = props => (
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

UploadFileButton.displayName = 'UploadFileButton';
UploadFileButton.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool,
};
UploadFileButton.defaultProps = {
  isMultiple: false,
};
export default UploadFileButton;
