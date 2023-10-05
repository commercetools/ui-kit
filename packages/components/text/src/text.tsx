import type { MessageDescriptor } from 'react-intl';

import { Children, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import {
  bodyStyles,
  captionStyles,
  detailStyles,
  headlineStyles,
  subheadlineStyles,
  wrapStyles,
} from './text.styles';

export type TTone =
  | 'primary'
  | 'secondary'
  | 'information'
  | 'positive'
  | 'negative'
  | 'critical'
  | 'inherit';

export type TFontWeight = 'regular' | 'medium' | 'bold';

export type TBasicTextProps = {
  id?: string;
  intlMessage?: MessageDescriptor & {
    values?: Record<string, React.ReactNode>;
  };
  children?: ReactNode;
};

type TBasicHeadlineProps = {
  title?: string;
};

const warnIfMissingTitle = (
  props: TBasicHeadlineProps,
  componentName: string
) => {
  if (typeof props.title === 'string') {
    warning(
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
    props.intlMessage || Boolean(Children.count(props.children));

  warning(
    hasContent,
    [
      'Warning: Failed prop type:',
      `The prop \`intlMessage\` is marked as required in \`${componentName}\``,
      'but its value is `undefined`',
    ].join(' ')
  );
  warning(
    hasContent,
    [
      'Warning: Failed prop type:',
      `The prop \`children\` is marked as required in \`${componentName}\``,
      'but its value is `undefined`',
    ].join(' ')
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
  truncate?: boolean;
  nowrap?: boolean;
} & TBasicTextProps &
  TBasicHeadlineProps;

const Headline = (props: THeadlineProps) => {
  warnIfMissingTitle(props, 'TextHeadline');
  warnIfMissingContent(props, 'TextHeadline');

  const HeadlineElement = props.as;
  if (!HeadlineElement) {
    warning(
      false,
      'ui-kit/Text: You attempt to render a TextHeadline without specifying `as` prop.'
    );

    return (
      <span id={props.id}>
        <Text intlMessage={props.intlMessage}>{props.children}</Text>
      </span>
    );
  }
  return (
    <HeadlineElement
      id={props.id}
      css={headlineStyles(props)}
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
  truncate?: boolean;
  nowrap?: boolean;
  isBold?: boolean;
  tone?: TTone;
} & TBasicTextProps &
  TBasicHeadlineProps;

const Subheadline = (props: TSubheadlineProps) => {
  warnIfMissingTitle(props, 'TextSubheadline');
  warnIfMissingContent(props, 'TextSubheadline');

  const SubheadlineElement = props.as;
  if (!SubheadlineElement) {
    warning(
      false,
      'ui-kit/Text: You attempt to render TextSubheadline without specifying `as` prop.'
    );
    return (
      <Text id={props.id} intlMessage={props.intlMessage}>
        {props.children}
      </Text>
    );
  }

  return (
    <SubheadlineElement
      id={props.id}
      title={props.title}
      css={subheadlineStyles(props)}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </SubheadlineElement>
  );
};
Subheadline.displayName = 'TextSubheadline';

export type TWrapProps = TBasicTextProps & TBasicHeadlineProps;

const Wrap = (props: TWrapProps) => {
  warnIfMissingTitle(props, 'TextWrap');
  warnIfMissingContent(props, 'TextWrap');
  return (
    <div
      id={props.id}
      css={wrapStyles()}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </div>
  );
};
Wrap.displayName = 'TextWrap';

export type TBodyProps = {
  as?: 'span' | 'p';
  /**
   * @deprecated
   *
   * `isBold` prop is being deprecatied in favor of the new `fontWeight` prop.
   */
  isBold?: boolean;
  isItalic?: boolean;
  isStrikethrough?: boolean;
  tone?: TTone | 'inverted';
  fontWeight?: TFontWeight | 'regular' | 'medium' | 'bold';
  truncate?: boolean;
  nowrap?: boolean;
} & TBasicTextProps &
  TBasicHeadlineProps;

const Body = (props: TBodyProps) => {
  warnIfMissingTitle(props, 'TextBody');
  warnIfMissingContent(props, 'TextBody');

  if (props.as) {
    const BodyElement = props.as;
    return (
      <BodyElement
        id={props.id}
        css={bodyStyles(props)}
        title={props.title}
        {...filterDataAttributes(props)}
      >
        <Text intlMessage={props.intlMessage}>{props.children}</Text>
      </BodyElement>
    );
  }

  return (
    <p
      id={props.id}
      css={bodyStyles(props)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </p>
  );
};
Body.displayName = 'TextBody';

export type TDetailProps = {
  /**
   * @deprecated
   *
   * `isBold` prop is being deprecatied in favor of the new `fontWeight` prop.
   */
  isBold?: boolean;
  isItalic?: boolean;
  isStrikethrough?: boolean;
  as?: 'span' | 'small';
  tone?: TTone | 'warning' | 'inverted';
  fontWeight?: TFontWeight | 'regular' | 'medium' | 'bold';
  truncate?: boolean;
  nowrap?: boolean;
  'aria-labelledby'?: string;
} & TBasicTextProps &
  TBasicHeadlineProps;

const Detail = (props: TDetailProps) => {
  warnIfMissingTitle(props, 'TextDetail');
  warnIfMissingContent(props, 'TextDetail');
  if (props.as) {
    const TextDetailElement = props.as;
    return (
      <TextDetailElement
        id={props.id}
        css={detailStyles(props)}
        title={props.title}
        aria-labelledby={props['aria-labelledby']}
        {...filterDataAttributes(props)}
      >
        <Text intlMessage={props.intlMessage}>{props.children}</Text>
      </TextDetailElement>
    );
  }

  return (
    <div
      css={detailStyles(props)}
      title={props.title}
      aria-labelledby={props['aria-labelledby']}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </div>
  );
};
Detail.displayName = 'TextDetail';

export type TCaptionProps = {
  isItalic?: boolean;
  isStrikethrough?: boolean;
  tone?: TTone | 'warning' | 'inverted';
  fontWeight?: TFontWeight | 'regular' | 'medium' | 'bold';
  truncate?: boolean;
  nowrap?: boolean;
  'aria-labelledby'?: string;
} & TBasicTextProps &
  TBasicHeadlineProps;

const Caption = (props: TCaptionProps) => {
  warnIfMissingTitle(props, 'TextCaption');
  warnIfMissingContent(props, 'TextCaption');
  return (
    <div
      css={captionStyles(props)}
      title={props.title}
      aria-labelledby={props['aria-labelledby']}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </div>
  );
};
Caption.displayName = 'TextCaption';

export default { Headline, Wrap, Subheadline, Detail, Body, Caption };
