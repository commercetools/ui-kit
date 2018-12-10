import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './text.mod.css';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const nonEmptyString = (props, propName, componentName) => {
  const value = props[propName];
  if (typeof value === 'string' && !value)
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Expected it to be nonempty string, but it was empty.`
    );
  return null;
};

const Headline = props => {
  const HeadlineElement = props.elementType;
  return (
    <HeadlineElement
      className={classnames({
        [styles.truncate]: props.truncate,
      })}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </HeadlineElement>
  );
};
Headline.displayName = 'TextHeadline';
Headline.propTypes = {
  elementType: PropTypes.oneOf(['h1', 'h2', 'h3']).isRequired,
  children: PropTypes.node.isRequired,
  title: nonEmptyString,
  truncate: PropTypes.bool,
  dataTest: PropTypes.string,
};

const Subheadline = props => {
  const SubheadlineElement = props.elementType;
  return (
    <SubheadlineElement
      className={classnames({
        [styles.bold]: props.isBold,
        [styles[`${props.tone}`]]: props.tone,
        [styles.truncate]: props.truncate,
      })}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </SubheadlineElement>
  );
};
Subheadline.displayName = 'TextSubheadline';
Subheadline.propTypes = {
  elementType: PropTypes.oneOf(['h4', 'h5']).isRequired,
  isBold: PropTypes.bool,
  tone: PropTypes.oneOf([
    'primary',
    'secondary',
    'information',
    'positive',
    'negative',
  ]),
  children: PropTypes.node.isRequired,
  title: nonEmptyString,
  truncate: PropTypes.bool,
  dataTest: PropTypes.string,
};

const Wrap = props => (
  <div className={styles.wrap} title={props.title}>
    {props.children}
  </div>
);
Wrap.displayName = 'TextWrap';
Wrap.propTypes = {
  children: PropTypes.node.isRequired,
  title: nonEmptyString,
};

const Body = props =>
  props.isInline ? (
    <span
      className={classnames(styles['body-text'], {
        [styles.bold]: props.isBold,
        [styles.italic]: props.isItalic,
        [styles[`${props.tone}`]]: props.tone,
        [styles.truncate]: props.truncate,
      })}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </span>
  ) : (
    <p
      className={classnames(styles['body-text'], {
        [styles.bold]: props.isBold,
        [styles.italic]: props.isItalic,
        [styles[`${props.tone}`]]: props.tone,
        [styles.truncate]: props.truncate,
      })}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </p>
  );
Body.displayName = 'TextBody';
Body.propTypes = {
  isBold: PropTypes.bool,
  isItalic: PropTypes.bool,
  isInline: PropTypes.bool,
  tone: PropTypes.oneOf([
    'primary',
    'secondary',
    'information',
    'positive',
    'negative',
    'inverted',
  ]),
  children: PropTypes.node.isRequired,
  title: nonEmptyString,
  truncate: PropTypes.bool,
  dataTest: PropTypes.string,
};

const Detail = props => (
  <small
    className={classnames({
      [styles.bold]: props.isBold,
      [styles.italic]: props.isItalic,
      [styles['inline-text']]: props.isInline,
      [styles[`${props.tone}`]]: props.tone,
      [styles.truncate]: props.truncate,
    })}
    title={props.title}
    {...filterDataAttributes(props)}
  >
    {props.children}
  </small>
);
Detail.displayName = 'TextDetail';
Detail.propTypes = {
  isBold: PropTypes.bool,
  isItalic: PropTypes.bool,
  isInline: PropTypes.bool,
  tone: PropTypes.oneOf([
    'primary',
    'secondary',
    'information',
    'positive',
    'negative',
    'warning',
  ]),
  children: PropTypes.node.isRequired,
  title: nonEmptyString,
  truncate: PropTypes.bool,
  dataTest: PropTypes.string,
};

export default {
  Headline,
  Wrap,
  Subheadline,
  Body,
  Detail,
};
