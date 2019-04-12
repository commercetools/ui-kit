import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import requiredIf from 'react-required-if';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import {
  bodyStyles,
  detailStyles,
  headlineStyles,
  subheadlineStyles,
  wrapStyles,
} from './text.styles';

const intlMessageShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  defaultMessage: PropTypes.string.isRequired,
});

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
      css={theme => headlineStyles(props, theme)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.intlMessage ? (
        <FormattedMessage {...props.intlMessage} />
      ) : (
        props.children
      )}
    </HeadlineElement>
  );
};

Headline.displayName = 'TextHeadline';
Headline.propTypes = {
  elementType: PropTypes.oneOf(['h1', 'h2', 'h3']).isRequired,
  title: nonEmptyString,
  truncate: PropTypes.bool,
  intlMessage: requiredIf(intlMessageShape, props => !props.children),
  children: requiredIf(PropTypes.node, props => !props.intlMessage),
};

const Subheadline = props => {
  const SubheadlineElement = props.elementType;
  return (
    <SubheadlineElement
      title={props.title}
      css={theme => subheadlineStyles(props, theme)}
      {...filterDataAttributes(props)}
    >
      {props.intlMessage ? (
        <FormattedMessage {...props.intlMessage} />
      ) : (
        props.children
      )}
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
  title: nonEmptyString,
  truncate: PropTypes.bool,
  intlMessage: requiredIf(intlMessageShape, props => !props.children),
  children: requiredIf(PropTypes.node, props => !props.intlMessage),
};

const Wrap = props => (
  <div
    css={theme => wrapStyles(props, theme)}
    title={props.title}
    {...filterDataAttributes(props)}
  >
    {props.intlMessage ? (
      <FormattedMessage {...props.intlMessage} />
    ) : (
      props.children
    )}
  </div>
);

Wrap.displayName = 'TextWrap';
Wrap.propTypes = {
  title: nonEmptyString,
  intlMessage: requiredIf(intlMessageShape, props => !props.children),
  children: requiredIf(PropTypes.node, props => !props.intlMessage),
};

const Body = props =>
  props.isInline ? (
    <span
      css={theme => bodyStyles(props, theme)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.intlMessage ? (
        <FormattedMessage {...props.intlMessage} />
      ) : (
        props.children
      )}
    </span>
  ) : (
    <p
      css={theme => bodyStyles(props, theme)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      {props.intlMessage ? (
        <FormattedMessage {...props.intlMessage} />
      ) : (
        props.children
      )}
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
  title: nonEmptyString,
  truncate: PropTypes.bool,
  intlMessage: requiredIf(intlMessageShape, props => !props.children),
  children: requiredIf(PropTypes.node, props => !props.intlMessage),
};

const Detail = props => (
  <small
    css={theme => detailStyles(props, theme)}
    title={props.title}
    {...filterDataAttributes(props)}
    className={props.className}
  >
    {props.intlMessage ? (
      <FormattedMessage {...props.intlMessage} />
    ) : (
      props.children
    )}
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
  className: PropTypes.string,
  title: nonEmptyString,
  truncate: PropTypes.bool,
  intlMessage: requiredIf(intlMessageShape, props => !props.children),
  children: requiredIf(PropTypes.node, props => !props.intlMessage),
};

export default {
  Headline,
  Wrap,
  Subheadline,
  Body,
  Detail,
};
