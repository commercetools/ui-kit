import type { MessageDescriptor } from 'react-intl';

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

type TTextProps = {
  intlMessage?: MessageDescriptor;
  children?: React.ReactNode;
};

type TDeprecatedProps = {
  // @deprecated
  elementType: string;
};

const warnIfNoTextProps = (props: TTextProps, componentName) => {
  if (!props.intlMessage && !React.Children.count(props.children)) {
    console.error(
      oneLine`
        Warning: Failed prop type:
        The prop \`intlMessage\` is marked as required in \`${componentName}\`,
        but its value is \`undefined\`
      `
    );
    console.error(
      oneLine`
        Warning: Failed prop type:
        The prop \`children\` is marked as required in \`${componentName}\`,
        but its value is \`undefined\`
      `
    );
  }
};

const Text = (props: TTextProps) => (
  <>
    {props.intlMessage ? (
      <FormattedMessage {...props.intlMessage} />
    ) : (
      props.children
    )}
  </>
);
Text.displayName = 'Text';

type THeadlineProps = {
  as?: 'h1' | 'h2' | 'h3';
  // @deprecated
  elementType?: 'h1' | 'h2' | 'h3';
  title?: string | null;
  truncate?: boolean;
} & TTextProps;

const Headline = (props: THeadlineProps) => {
  const theme = useTheme();

  if (props.elementType) {
    warnDeprecatedProp(
      'elementType',
      'TextHeadline',
      `\n \`elementType\` is deprecated. \n Please use "as" prop instead.`
    );
  }

  warnIfNoTextProps(props, 'TextHeadline');

  // For backwards compatibility
  // we allow both `as` and `elementType` to be optional.
  const HeadlineElement = props.as || props.elementType;

  // however, if none of the prop is specified,
  // we render plain text and set a warning on the log.
  if (!HeadlineElement) {
    console.error(
      'ui-kit/Text: You attempt to render a TextHeadline without specifying `as` prop.'
    );
    return <Text intlMessage={props.intlMessage}>{props.children}</Text>;
  }

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

type TSubheadlineProps = {
  as?: 'h4' | 'h5';
  // @deprecated
  elementType?: 'h4' | 'h5';
  title?: string;
  truncate?: boolean;
  isBold?: boolean;
  tone?: 'primary' | 'secondary' | 'information' | 'positive' | 'negative';
} & TTextProps;

const Subheadline = (props: TSubheadlineProps) => {
  const theme = useTheme();

  if (props.elementType) {
    warnDeprecatedProp(
      'elementType',
      'TextSubheadline',
      `\n \`elementType\` is deprecated. \n Please use "as" prop instead.`
    );
  }
  warnIfNoTextProps(props, 'TextSubheadline');

  const SubheadlineElement = props.as || props.elementType;
  if (!SubheadlineElement) {
    console.error(
      'ui-kit/Text: You attempt to render TextSubheadline without specifying `as` prop.'
    );
    return <Text intlMessage={props.intlMessage}>{props.children}</Text>;
  }
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

type TWrapProps = {
  title?: string;
} & TTextProps;

const Wrap = (props: TWrapProps) => {
  const theme = useTheme();
  warnIfNoTextProps(props, 'TextWrap');
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

type TBodyProps = {
  as: 'span' | 'p';
  isBold?: boolean;
  isItalic?: boolean;
  // @deprecated
  isInline?: boolean;
  tone?: 'primary' | 'secondary' | 'information' | 'positive' | 'negative';
  title?: string;
  truncate?: boolean;
} & TTextProps;

const Body = (props: TBodyProps) => {
  const theme = useTheme();

  warnIfNoTextProps(props, 'TextBody');

  if (props.isInline) {
    warnDeprecatedProp(
      'isInline',
      'TextSubheadline',
      `\n \`isInline\` is deprecated. \n Please use "as" prop instead.`
    );
  }

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

type TDetailProps = {
  isBold?: boolean;
  isItalic?: boolean;
  tone?: 'primary' | 'secondary' | 'information' | 'positive' | 'negative';
  title?: string;
  truncate?: boolean;
} & TTextProps;

const Detail = (props: TDetailProps) => {
  const theme = useTheme();
  warnIfNoTextProps(props, 'TextDetail');
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

export default { Headline, Wrap, Subheadline, Detail, Body };
