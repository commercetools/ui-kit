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

// Design tokens - customProperties
export { default as customProperties } from '../materials/custom-properties';

// Icons
export * from './icons';

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

// <FlatButton>
export const flatButtonDefaultProps: {
  tone: 'primary';
  type: 'button';
  iconPosition: 'left';
  isDisabled: false;
};
export type FlatButtonDefaultProps = typeof flatButtonDefaultProps;
export type FlatButtonProps = {
  tone?: 'primary' | 'secondary';
  type?: 'submit' | 'reset' | 'button';
  label: string;
  onClick: (event: React.SyntheticEvent) => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isDisabled?: boolean;
  children?: never;
} & FlatButtonDefaultProps;
export function FlatButton(props: FlatButtonProps): JSX.Element;

// <IconButton>
export const iconButtonDefaultProps: {
  type: 'button';
  theme: 'default';
  size: 'big';
  shape: 'round';
  isToggleButton: false;
};
export type IconButtonDefaultProps = typeof iconButtonDefaultProps;
export type IconButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  label: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  shape?: 'round' | 'square';
  size?: 'small' | 'medium' | 'big';
  isToggleButton?: boolean;
  // NOTE: only required if `isToggleButton` is defined
  isToggled?: boolean;
  // NOTE: only valid if `isToggleButton` is defined
  theme?: 'default' | 'primary' | 'info';
  children?: never;
} & IconButtonDefaultProps;
export function IconButton(props: IconButtonProps): JSX.Element;

// <LinkButton>
export const linkButtonDefaultProps: {
  isDisabled: false;
  isExternal: false;
};
export type LinkButtonDefaultProps = typeof linkButtonDefaultProps;
export type LinkButtonProps = {
  label: string;
  to:
    | string
    | { pathname: string; search?: string; query?: Record<string, string> };
  iconLeft?: React.ReactNode;
  isDisabled?: boolean;
  isExternal?: boolean;
  children?: never;
} & LinkButtonDefaultProps;
export function LinkButton(props: LinkButtonProps): JSX.Element;

// <PrimaryButton>
export const primaryButtonDefaultProps: {
  type: 'button';
  size: 'big';
  isToggleButton: false;
  tone: 'primary';
};
export type PrimaryButtonDefaultProps = typeof primaryButtonDefaultProps;
export type PrimaryButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  label: string;
  // Any valid HTML attributes to be passed to the button element
  buttonAttributes?: { [key: string]: string };
  iconLeft?: React.ReactNode;
  isToggleButton?: boolean;
  // NOTE: only required if `isToggleButton` is defined
  isToggled?: boolean;
  isDisabled?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  size?: 'big' | 'small';
  tone?: 'urgent' | 'primary';
  children?: never;
} & PrimaryButtonDefaultProps;
export function PrimaryButton(props: PrimaryButtonProps): JSX.Element;

// <SecondaryButton>
export const secondaryButtonDefaultProps: {
  type: 'button';
  theme: 'default';
  isToggleButton: false;
};
export type SecondaryButtonDefaultProps = typeof secondaryButtonDefaultProps;
export type SecondaryButtonProps = {
  // NOTE: only used when `linkTo` is not defined
  type?: 'submit' | 'reset' | 'button';
  label: string;
  // Any valid HTML attributes to be passed to the button element
  buttonAttributes?: { [key: string]: string };
  iconLeft?: React.ReactNode;
  isToggleButton?: boolean;
  // NOTE: only required if `isToggleButton` is defined
  isToggled?: boolean;
  // NOTE: only valid if `isToggleButton` is defined
  theme?: 'default' | 'info';
  isDisabled?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  linkTo?:
    | string
    | { pathname: string; search?: string; query?: Record<string, string> };
  children?: never;
} & SecondaryButtonDefaultProps;
export function SecondaryButton(props: SecondaryButtonProps): JSX.Element;

// <SecondaryIconButton>
export const secondaryIconButtonDefaultProps: {
  color: 'solid';
  type: 'button';
  isDisabled: false;
};
export type SecondaryIconButtonDefaultProps = typeof secondaryIconButtonDefaultProps;
export type SecondaryIconButtonProps = {
  // NOTE: only used when `linkTo` is not defined
  type?: 'submit' | 'reset' | 'button';
  icon: React.ReactNode;
  color?: 'solid' | 'primary';
  label: string;
  onClick: (event: React.SyntheticEvent) => void;
  isDisabled?: boolean;
  children?: never;
} & SecondaryIconButtonDefaultProps;
export function SecondaryIconButton(
  props: SecondaryIconButtonProps
): JSX.Element;

// <Card>
export const cardDefaultProps: {
  type: 'raised';
  theme: 'light';
};
export type CardDefaultProps = typeof cardDefaultProps;
export type CardProps = {
  className?: string;
  type?: 'raised' | 'flat';
  theme?: 'light' | 'dark';
  children: React.ReactNode;
} & CardDefaultProps;
export function Card(props: CardProps): JSX.Element;

// <Collapsible>
export const collapsibleDefaultProps: {
  isDefaultClosed: false;
};
export type CollapsibleDefaultProps = typeof collapsibleDefaultProps;
export type CollapsibleRenderProps = {
  isOpen: boolean;
  toggle: () => void;
};
export type CollapsibleProps = {
  isDefaultClosed?: boolean;
  isClosed?: boolean;
  // NOTE: required when `isClosed` is defined
  onToggle?: () => void;
  children: (renderProps: CollapsibleRenderProps) => React.ReactNode;
} & CollapsibleDefaultProps;
export function Collapsible(props: CollapsibleProps): JSX.Element;

// <CollapsibleMotion>
export const collapsibleMotionDefaultProps: {
  isDefaultClosed: false;
};
export type CollapsibleMotionDefaultProps = typeof collapsibleMotionDefaultProps;
export type CollapsibleMotionRenderProps = {
  isOpen: boolean;
  containerStyles: React.CSSProperties;
  toggle: () => void;
  registerContentNode: React.RefObject<HTMLElement>;
};
export type CollapsibleMotionProps = {
  isOpen: boolean;
  onToggle: () => void;
  children: (renderProps: CollapsibleMotionRenderProps) => React.ReactNode;
} & CollapsibleMotionDefaultProps;
export function CollapsibleMotion(props: CollapsibleMotionProps): JSX.Element;

// <ConstraintsHorizontal>
export const constraintsHorizontalDefaultProps: {
  constraint: 'scale';
};
export type ConstraintsHorizontalDefaultProps = typeof constraintsHorizontalDefaultProps;
export type ConstraintsHorizontalProps = {
  constraint?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'scale';
  children: React.ReactNode;
} & ConstraintsHorizontalDefaultProps;
export function ConstraintsHorizontal(
  props: ConstraintsHorizontalProps
): JSX.Element;

export type Constraints = {
  Horizontal: ReturnType<typeof ConstraintsHorizontal>;
};
