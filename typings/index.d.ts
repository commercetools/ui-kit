// TypeScript Version: 3.1

import * as React from 'react';

export const version: string;

// TODO: import it from `react-intl`, however it currently fails with an error:
//   Error: Errors in typescript@3.1 for external dependencies:
// ../node_modules/@formatjs/intl-relativetimeformat/lib/core.d.ts(47,60): erro
export type MessageDescriptor = {
  id: string;
  description?: string;
  defaultMessage: string;
};

// <ContentNotification>
export type ContentNotificationProps = {
  type: 'error' | 'info' | 'warning' | 'success';
  children: React.ReactNode;
};
export function ContentNotification(
  props: ContentNotificationProps
): JSX.Element;

// <Avatar>
export const avatarDefaultProps: {
  firstName: string;
  lastName: string;
  isHighlighted: boolean;
  size: 's' | 'm' | 'l';
};
export type AvatarDefaultProps = typeof avatarDefaultProps;
export type AvatarProps = {
  firstName?: string;
  lastName?: string;
  gravatarHash: string;
  isHighlighted?: boolean;
  size?: 's' | 'm' | 'l';
  children?: never;
} & AvatarDefaultProps;
export function Avatar(props: AvatarProps): JSX.Element;

// <Spacings.Stack>
export const spacingsStackDefaultProps: {
  scale: 's';
  alignItems: 'stretch';
};
export type SpacingsStackDefaultProps = typeof spacingsStackDefaultProps;
export type SpacingsStackProps = {
  scale?: 'xs' | 's' | 'm' | 'l' | 'xl';
  children?: React.ReactNode;
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'flexStart'
    | 'flexEnd';
} & SpacingsStackDefaultProps;
export function SpacingsStack(props: SpacingsStackProps): JSX.Element;

// <Spacings.Inline>
export const spacingsInlineDefaultProps: {
  scale: 's';
  alignItems: 'flex-start';
  justifyContent: 'flex-start';
};
export type SpacingsInlineDefaultProps = typeof spacingsInlineDefaultProps;
export type SpacingsInlineProps = {
  scale?: 'xs' | 's' | 'm' | 'l' | 'xl';
  children?: React.ReactNode;
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'flexStart'
    | 'flexEnd';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
} & SpacingsInlineDefaultProps;
export function SpacingsInline(props: SpacingsInlineProps): JSX.Element;

// <Spacings.Inset>
export const spacingsInsetDefaultProps: {
  scale: 'm';
};
export type SpacingsInsetDefaultProps = typeof spacingsInsetDefaultProps;
export type SpacingsInsetProps = {
  scale?: 'xs' | 's' | 'm' | 'l' | 'xl';
  children?: React.ReactNode;
} & SpacingsInsetDefaultProps;
export function SpacingsInset(props: SpacingsInsetProps): JSX.Element;

// <Spacings.InsetSquish>
export const spacingsInsetSquishDefaultProps: {
  scale: 'm';
};
export type SpacingsInsetSquishDefaultProps = typeof spacingsInsetSquishDefaultProps;
export type SpacingsInsetSquishProps = {
  scale?: 's' | 'm' | 'l';
  children?: React.ReactNode;
} & SpacingsInsetSquishDefaultProps;
export function SpacingsInsetSquish(
  props: SpacingsInsetSquishProps
): JSX.Element;

export type Spacings = {
  Stack: ReturnType<typeof SpacingsStack>;
  Inline: ReturnType<typeof SpacingsInline>;
  Inset: ReturnType<typeof SpacingsInset>;
  InsetSquish: ReturnType<typeof SpacingsInsetSquish>;
};

// <Text.Headline>
export type TextHeadlineProps = {
  as: 'h1' | 'h2' | 'h3';
  title?: string;
  truncate?: boolean;
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export function TextHeadline(props: TextHeadlineProps): JSX.Element;

// <Text.Subeadline>
export type TextSubeadlineProps = {
  as: 'h4' | 'h5';
  title?: string;
  truncate?: boolean;
  isBold?: boolean;
  tone?: 'primary' | 'secondary' | 'information' | 'positive' | 'negative';
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export function TextSubheadline(props: TextSubeadlineProps): JSX.Element;

// <Text.Wrap>
export type TextWrapProps = {
  title?: string;
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export function TextWrap(props: TextWrapProps): JSX.Element;

// <Text.Body>
export type TextBodyProps = {
  as: 'span' | 'p';
  title?: string;
  truncate?: boolean;
  isBold?: boolean;
  isItalic?: boolean;
  tone?:
    | 'primary'
    | 'secondary'
    | 'information'
    | 'positive'
    | 'negative'
    | 'inverted';
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export function TextBody(props: TextBodyProps): JSX.Element;

// <Text.Detail>
export type TextDetailProps = {
  title?: string;
  truncate?: boolean;
  isBold?: boolean;
  isItalic?: boolean;
  tone?:
    | 'primary'
    | 'secondary'
    | 'information'
    | 'positive'
    | 'negative'
    | 'warning'
    | 'inverted';
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export function TextDetail(props: TextDetailProps): JSX.Element;

export type Text = {
  Headline: ReturnType<typeof TextHeadline>;
  Subheadline: ReturnType<typeof TextSubheadline>;
  Wrap: ReturnType<typeof TextWrap>;
  Body: ReturnType<typeof TextBody>;
  Detail: ReturnType<typeof TextDetail>;
};
