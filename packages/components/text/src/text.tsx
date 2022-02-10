import type { MessageDescriptor } from 'react-intl';

import { Children, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@emotion/react';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import {
  bodyStyles,
  detailStyles,
  headlineStyles,
  subheadlineStyles,
  wrapStyles,
} from './text.styles';

type TBasicTextProps = {
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
} & TBasicTextProps &
  TBasicHeadlineProps;

const Headline = (props: THeadlineProps) => {
  const theme = useTheme();

  warnIfMissingTitle(props, 'TextHeadline');
  warnIfMissingContent(props, 'TextHeadline');

  const HeadlineElement = props.as;
  if (!HeadlineElement) {
    warning(
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
  truncate?: boolean;
  isBold?: boolean;
  tone?: 'primary' | 'secondary' | 'information' | 'positive' | 'negative';
} & TBasicTextProps &
  TBasicHeadlineProps;

const Subheadline = (props: TSubheadlineProps) => {
  const theme = useTheme();

  warnIfMissingTitle(props, 'TextSubheadline');
  warnIfMissingContent(props, 'TextSubheadline');

  const SubheadlineElement = props.as;
  if (!SubheadlineElement) {
    warning(
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
  as?: 'span' | 'p';
  isBold?: boolean;
  isItalic?: boolean;
  tone?:
    | 'primary'
    | 'secondary'
    | 'information'
    | 'positive'
    | 'negative'
    | 'inverted';
  truncate?: boolean;
} & TBasicTextProps &
  TBasicHeadlineProps;

const Body = (props: TBodyProps) => {
  const theme = useTheme();

  warnIfMissingTitle(props, 'TextBody');
  warnIfMissingContent(props, 'TextBody');

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

  return (
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
  as?: 'span' | 'small';
  tone?:
    | 'primary'
    | 'secondary'
    | 'information'
    | 'positive'
    | 'negative'
    | 'warning'
    | 'inverted';
  truncate?: boolean;
} & TBasicTextProps &
  TBasicHeadlineProps;

const Detail = (props: TDetailProps) => {
  const theme = useTheme();
  warnIfMissingTitle(props, 'TextDetail');
  warnIfMissingContent(props, 'TextDetail');
  if (props.as) {
    const TextDetailElement = props.as;
    return (
      <TextDetailElement
        css={detailStyles(props, theme)}
        title={props.title}
        {...filterDataAttributes(props)}
      >
        <Text intlMessage={props.intlMessage}>{props.children}</Text>
      </TextDetailElement>
    );
  }

  return (
    <div
      css={detailStyles(props, theme)}
      title={props.title}
      {...filterDataAttributes(props)}
    >
      <Text intlMessage={props.intlMessage}>{props.children}</Text>
    </div>
  );
};
Detail.displayName = 'TextDetail';

export default { Headline, Wrap, Subheadline, Detail, Body };
