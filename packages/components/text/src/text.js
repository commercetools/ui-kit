import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import requiredIf from 'react-required-if';
import { useTheme } from '@emotion/react';
import isNil from 'lodash/isNil';
import { oneLine } from 'common-tags';
import {
  filterDataAttributes,
  warnDeprecatedProp,
} from '@commercetools-uikit/utils';
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

const Text = ({ intlMessage, children = '' }) =>
  intlMessage ? <FormattedMessage {...intlMessage} /> : children;

Text.displayName = 'Text';
Text.propTypes = {
  intlMessage: intlMessageShape,
  children: PropTypes.node,
};

const nonEmptyString = (props, propName, componentName) => {
  const value = props[propName];
  if (typeof value === 'string' && !value)
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'. Expected it to be nonempty string, but it was empty.`
    );
  return null;
};

const Headline = (props) => {
  const theme = useTheme();
  const HeadlineElement = props.as || props.elementType;
  return (
    <HeadlineElement
      css={headlineStyles(props, theme)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </HeadlineElement>
  );
};
Headline.displayName = 'TextHeadline';
Headline.propTypes = {
  as: requiredIf(
    PropTypes.oneOf(['h1', 'h2', 'h3']),
    (props) => !props.elementType
  ),
  elementType(props, propName, componentName, ...rest) {
    if (props[propName] != null) {
      warnDeprecatedProp(
        propName,
        componentName,
        `\n Please use "as" prop instead.`
      );

      if (props.as) {
        return new Error(oneLine`
          Invalid prop "${propName}" supplied to "${componentName}".
          "${propName}" does not have any effect when "as" is defined`);
      }

      return PropTypes.oneOf(['h1', 'h2', 'h3']).isRequired(
        props,
        propName,
        componentName,
        ...rest
      );
    }
    return PropTypes.oneOf(['h1', 'h2', 'h3'])(
      props,
      propName,
      componentName,
      ...rest
    );
  },
  title: nonEmptyString,
  truncate: PropTypes.bool,
  intlMessage: requiredIf(
    intlMessageShape,
    (props) => !React.Children.count(props.children)
  ),
  children: requiredIf(PropTypes.node, (props) => !props.intlMessage),
};

const Subheadline = (props) => {
  const theme = useTheme();
  const SubheadlineElement = props.as || props.elementType;
  return (
    <SubheadlineElement
      title={props.title}
      css={subheadlineStyles(props, theme)}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </SubheadlineElement>
  );
};
Subheadline.displayName = 'TextSubheadline';
Subheadline.propTypes = {
  as: requiredIf(PropTypes.oneOf(['h4', 'h5']), (props) => !props.elementType),
  elementType(props, propName, componentName, ...rest) {
    if (props[propName] != null) {
      warnDeprecatedProp(
        propName,
        componentName,
        `\n Please use "as" prop instead.`
      );

      if (props.as) {
        return new Error(oneLine`
          Invalid prop "${propName}" supplied to "${componentName}".
          "${propName}" does not have any effect when "as" is defined`);
      }

      return PropTypes.oneOf(['h4', 'h5']).isRequired(
        props,
        propName,
        componentName,
        ...rest
      );
    }
    return PropTypes.oneOf(['h4', 'h5'])(
      props,
      propName,
      componentName,
      ...rest
    );
  },
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
  intlMessage: requiredIf(
    intlMessageShape,
    (props) => !React.Children.count(props.children)
  ),
  children: requiredIf(PropTypes.node, (props) => !props.intlMessage),
};

const Wrap = (props) => {
  const theme = useTheme();
  return (
    <div
      css={wrapStyles(props, theme)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </div>
  );
};
Wrap.displayName = 'TextWrap';
Wrap.propTypes = {
  title: nonEmptyString,
  intlMessage: requiredIf(
    intlMessageShape,
    (props) => !React.Children.count(props.children)
  ),
  children: requiredIf(PropTypes.node, (props) => !props.intlMessage),
};

const Body = (props) => {
  const theme = useTheme();
  if (props.as) {
    const BodyElement = props.as;
    return (
      <BodyElement
        css={bodyStyles(props, theme)}
        title={props.title}
        {...filterDataAttributes(props)}
      >
        <Text intlMessage={props.intlMessage}>{props.children}</Text>
      </BodyElement>
    );
  }

  return props.isInline ? (
    <span
      css={bodyStyles(props, theme)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </span>
  ) : (
    <p
      css={bodyStyles(props, theme)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </p>
  );
};
Body.displayName = 'TextBody';
Body.propTypes = {
  as: PropTypes.oneOf(['span', 'p']),
  isBold: PropTypes.bool,
  isItalic: PropTypes.bool,
  isInline(props, propName, componentName, ...rest) {
    if (!isNil(props[propName])) {
      warnDeprecatedProp(
        propName,
        componentName,
        `\n Please use "as" prop instead.`
      );

      if (props.as) {
        return new Error(oneLine`
        Invalid prop "${propName}" supplied to "${componentName}".
        "${propName}" does not have any effect when "as" is defined`);
      }
    }

    return PropTypes.bool(props, propName, componentName, ...rest);
  },
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
  intlMessage: requiredIf(
    intlMessageShape,
    (props) => !React.Children.count(props.children)
  ),
  children: requiredIf(PropTypes.node, (props) => !props.intlMessage),
};

const Detail = (props) => {
  const theme = useTheme();
  return (
    <small
      css={detailStyles(props, theme)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </small>
  );
};
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
  title: nonEmptyString,
  truncate: PropTypes.bool,
  intlMessage: requiredIf(
    intlMessageShape,
    (props) => !React.Children.count(props.children)
  ),
  children: requiredIf(PropTypes.node, (props) => !props.intlMessage),
};

export { Headline, Wrap, Subheadline, Detail, Body };
