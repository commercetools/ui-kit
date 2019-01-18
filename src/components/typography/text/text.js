import React from 'react';
import PropTypes from 'prop-types';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import {
  bodyStyles,
  detailStyles,
  headlineStyles,
  subheadlineStyles,
  wrapStyles,
} from './text.styles';

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
      css={headlineStyles(props)}
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
};

const Subheadline = props => {
  const SubheadlineElement = props.elementType;
  return (
    <SubheadlineElement
      title={props.title}
      css={subheadlineStyles(props)}
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
};

const Wrap = props => (
  <div css={wrapStyles()} title={props.title} {...filterDataAttributes(props)}>
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
      css={bodyStyles(props)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.children}
    </span>
  ) : (
    <p
      css={bodyStyles(props)}
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
};

const Detail = props => (
  <small
    css={detailStyles(props)}
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
    'inverted',
  ]),
  children: PropTypes.node.isRequired,
  title: nonEmptyString,
  truncate: PropTypes.bool,
};

export default {
  Headline,
  Wrap,
  Subheadline,
  Body,
  Detail,
};
