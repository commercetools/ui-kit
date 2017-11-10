import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './text.mod.css';

const Headline = props => (
  <props.elementType>{props.children}</props.elementType>
);
Headline.displayName = 'TextHeadline';
Headline.propTypes = {
  elementType: PropTypes.oneOf(['h1', 'h2', 'h3']).isRequired,
  children: PropTypes.node.isRequired,
};

const Subheadline = props => (
  <props.elementType className={classnames({ [styles.bold]: props.isBold })}>
    {props.children}
  </props.elementType>
);
Subheadline.displayName = 'TextSubheadline';
Subheadline.propTypes = {
  elementType: PropTypes.oneOf(['h4', 'h5']).isRequired,
  isBold: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const Body = props => (
  <p
    className={classnames(styles['body-text'], { [styles.bold]: props.isBold })}
  >
    {props.children}
  </p>
);
Body.displayName = 'TextBody';
Body.propTypes = {
  isBold: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const Detail = props => (
  <small
    className={classnames(
      { [styles.bold]: props.isBold },
      { [styles[`${props.tone}`]]: props.tone }
    )}
  >
    {props.children}
  </small>
);
Detail.displayName = 'TextDetail';
Detail.propTypes = {
  isBold: PropTypes.bool,
  tone: PropTypes.oneOf(['secondary', 'positive', 'negative']),
  children: PropTypes.node.isRequired,
};

export default {
  Headline,
  Subheadline,
  Body,
  Detail,
};
