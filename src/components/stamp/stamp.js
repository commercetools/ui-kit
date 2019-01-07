import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spacings from '../spacings';
import styles from './stamp.mod.css';

export const availableTones = [
  'critical',
  'warning',
  'positive',
  'information',
  'primary',
  'secondary',
];

const Label = props => (
  <div className={classnames(styles.container, styles[`tone-${props.tone}`])}>
    <Spacings.InsetSquish scale="s">{props.children}</Spacings.InsetSquish>
  </div>
);

Label.displayName = 'Label';
Label.propTypes = {
  tone: PropTypes.oneOf(availableTones).isRequired,
  children: PropTypes.node.isRequired,
};

export default Label;
