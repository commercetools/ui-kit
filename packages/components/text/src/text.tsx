import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@emotion/react';
import invariant from 'tiny-invariant';
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

type TBasicTextProps = {
  intlMessage?: MessageDescriptor;
  children?: React.ReactNode;
};

type TBasicHeadlineProps = {
  title?: string;
};

const getIsIntlMessage = (
  intlMessage: unknown
): intlMessage is MessageDescriptor => {
  if (intlMessage && typeof intlMessage === 'object') {
    return (
      'id' in intlMessage &&
      'description' in intlMessage &&
      'defaultMessage' in intlMessage
    );
  }
  return false;
};

const warnIfMissingTitle = (
  props: TBasicHeadlineProps,
  componentName: string
) => {
  if (typeof props.title === 'string') {
    invariant(
      props.title.length > 0,
      `Invalid prop 'title' supplied to '${componentName}'. Expected it to be nonempty string, but it was empty.`
    );
  }
};

const warnIfMissingContent = (
  props: TBasicTextProps,
  componentName: string
) => {
  const hasContent =
    getIsIntlMessage(props.intlMessage) ||
    Boolean(React.Children.count(props.children));

  invariant(
    hasContent,
    oneLine`
      Warning: Failed prop type:
      The prop \`intlMessage\` is marked as required in \`${componentName}\`,
      but its value is \`undefined\`
      `
  );
  invariant(
    hasContent,
    oneLine`
        Warning: Failed prop type:
        The prop \`children\` is marked as required in \`${componentName}\`,
        but its value is \`undefined\`
      `
  );
};

const Text = (props: TBasicTextProps) => (
  <>
    {props.intlMessage ? (
      <FormattedMessage {...props.intlMessage} />
    ) : (
      props.children
    )}
  </>
);
Text.displayName = 'Text';

export type THeadlineProps = {
  as?: 'h1' | 'h2' | 'h3';
  // @deprecated: use `as` instead
  elementType?: 'h1' | 'h2' | 'h3';
  truncate?: boolean;
} & TBasicTextProps &
  TBasicHeadlineProps;

const Headline = (props: THeadlineProps) => {
  const theme = useTheme();

  if (props.elementType) {
    warnDeprecatedProp(
      'elementType',
      'TextHeadline',
      `\n \`elementType\` is deprecated. \n Please use "as" prop instead.`
    );
  }

  warnIfMissingTitle(props, 'TextHeadline');
  warnIfMissingContent(props, 'TextHeadline');

  // For backwards compatibility
  // we allow both `as` and `elementType` to be optional.
  const HeadlineElement = props.as || props.elementType;

  // however, if none of the prop is specified,
  // we render plain text and set a warning on the log.
  if (!HeadlineElement) {
    invariant(
      false,
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

export type TSubheadlineProps = {
  as?: 'h4' | 'h5';
  // @deprecated: use `as` instead
  elementType?: 'h4' | 'h5';
  truncate?: boolean;
  isBold?: boolean;
  tone?: 'primary' | 'secondary' | 'information' | 'positive' | 'negative';
} & TBasicTextProps &
  TBasicHeadlineProps;

const Subheadline = (props: TSubheadlineProps) => {
  const theme = useTheme();

  if (props.elementType) {
    warnDeprecatedProp(
      'elementType',
      'TextSubheadline',
      `\n \`elementType\` is deprecated. \n Please use "as" prop instead.`
    );
  }
  warnIfMissingTitle(props, 'TextSubheadline');
  warnIfMissingContent(props, 'TextSubheadline');

  const SubheadlineElement = props.as || props.elementType;
  if (!SubheadlineElement) {
    invariant(
      false,
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

export type TWrapProps = TBasicTextProps & TBasicHeadlineProps;

const Wrap = (props: TWrapProps) => {
  const theme = useTheme();
  warnIfMissingTitle(props, 'TextWrap');
  warnIfMissingContent(props, 'TextWrap');
  return (
    <div
      css={wrapStyles(theme)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </div>
  );
};
Wrap.displayName = 'TextWrap';

export type TBodyProps = {
  as: 'span' | 'p';
  isBold?: boolean;
  isItalic?: boolean;
  // @deprecated: use `as="span"` instead
  isInline?: boolean;
  tone?: 'primary' | 'secondary' | 'information' | 'positive' | 'negative';
  truncate?: boolean;
} & TBasicTextProps &
  TBasicHeadlineProps;

const Body = (props: TBodyProps) => {
  const theme = useTheme();

  warnIfMissingTitle(props, 'TextBody');
  warnIfMissingContent(props, 'TextBody');

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

export type TDetailProps = {
  isBold?: boolean;
  isItalic?: boolean;
  // used for styling via `detailStyles`
  isInline?: boolean;
  tone?: 'primary' | 'secondary' | 'information' | 'positive' | 'negative';
  truncate?: boolean;
} & TBasicTextProps &
  TBasicHeadlineProps;

const Detail = (props: TDetailProps) => {
  const theme = useTheme();
  warnIfMissingTitle(props, 'TextDetail');
  warnIfMissingContent(props, 'TextDetail');
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
