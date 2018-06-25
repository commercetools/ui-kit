import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import filterDataAttributes from '../../utils/filter-data-attributes';
import Text from '../../typography/text';
import styles from './link-button.mod.css';

const LinkButton = props => {
  const dataAttributes = {
    'data-track-component': 'LinkButton',
    ...filterDataAttributes(props),
  };
  return (
    <Link
      to={props.to}
      className={classnames(styles.button, {
        [styles.disabled]: props.isDisabled,
      })}
      {...dataAttributes}
    >
      {Boolean(props.iconLeft) &&
        React.cloneElement(props.iconLeft, {
          size: 'medium',
          theme: props.isDisabled ? 'grey' : 'green',
        })}
      <Text.Body>{props.label}</Text.Body>
    </Link>
  );
};

LinkButton.displayName = 'LinkButton';
LinkButton.propTypes = {
  label: PropTypes.node.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
      query: PropTypes.objectOf(PropTypes.string),
    }),
  ]).isRequired,
  iconLeft: PropTypes.element,
  isDisabled: PropTypes.bool,
};
LinkButton.defaultProps = {
  isDisabled: false,
};

export default LinkButton;
