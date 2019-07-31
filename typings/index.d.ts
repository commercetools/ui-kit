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
export const ContentNotification: {
  (props: ContentNotificationProps): JSX.Element;
  displayName: string;
};

// <Avatar>
export type AvatarProps = {
  firstName: string;
  lastName: string;
  gravatarHash: string;
  isHighlighted: boolean;
  size: 's' | 'm' | 'l';
  children?: never;
};
export const Avatar: {
  (props: AvatarProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<
    AvatarProps,
    'firstName' | 'lastName' | 'isHighlighted' | 'size'
  >;
};

// <Spacings.Stack>
export type SpacingsStackProps = {
  scale: 'xs' | 's' | 'm' | 'l' | 'xl';
  alignItems:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'flexStart'
    | 'flexEnd';
  children: React.ReactNode;
};
export const SpacingsStack: {
  (props: SpacingsStackProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SpacingsStackProps, 'scale' | 'alignItems'>;
};

// <Spacings.Inline>
export type SpacingsInlineProps = {
  scale: 'xs' | 's' | 'm' | 'l' | 'xl';
  alignItems:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'flexStart'
    | 'flexEnd';
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  children: React.ReactNode;
};
export const SpacingsInline: {
  (props: SpacingsInlineProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<
    SpacingsInlineProps,
    'scale' | 'alignItems' | 'justifyContent'
  >;
};

// <Spacings.Inset>
export type SpacingsInsetProps = {
  scale: 'xs' | 's' | 'm' | 'l' | 'xl';
  children: React.ReactNode;
};
export const SpacingsInset: {
  (props: SpacingsInsetProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SpacingsInsetProps, 'scale'>;
};

// <Spacings.InsetSquish>
export type SpacingsInsetSquishProps = {
  scale: 's' | 'm' | 'l';
  children: React.ReactNode;
};
export const SpacingsInsetSquish: {
  (props: SpacingsInsetSquishProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SpacingsInsetSquishProps, 'scale'>;
};

export const Spacings: {
  Stack: typeof SpacingsStack;
  Inline: typeof SpacingsInline;
  Inset: typeof SpacingsInset;
  InsetSquish: typeof SpacingsInsetSquish;
};

// <Text.Headline>
export type TextHeadlineProps = {
  as: 'h1' | 'h2' | 'h3';
  title?: string;
  truncate?: boolean;
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export const TextHeadline: {
  (props: TextHeadlineProps): JSX.Element;
  displayName: string;
};

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
export const TextSubheadline: {
  (props: TextSubeadlineProps): JSX.Element;
  displayName: string;
};

// <Text.Wrap>
export type TextWrapProps = {
  title?: string;
  children?: React.ReactNode;
  intlMessage?: MessageDescriptor;
};
export const TextWrap: {
  (props: TextWrapProps): JSX.Element;
  displayName: string;
};

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
export const TextBody: {
  (props: TextBodyProps): JSX.Element;
  displayName: string;
};

// <Text.Detail>
export type TextDetailProps = {
  title?: string;
  truncate?: boolean;
  isBold?: boolean;
  isItalic?: boolean;
  isInline?: boolean;
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
export const TextDetail: {
  (props: TextDetailProps): JSX.Element;
  displayName: string;
};

export const Text: {
  Headline: typeof TextHeadline;
  Subheadline: typeof TextSubheadline;
  Wrap: typeof TextWrap;
  Body: typeof TextBody;
  Detail: typeof TextDetail;
};

// <FlatButton>
export type FlatButtonProps = {
  tone: 'primary' | 'secondary';
  type: 'submit' | 'reset' | 'button';
  label: string;
  onClick: (event: React.SyntheticEvent) => void;
  icon?: React.ReactNode;
  iconPosition: 'left' | 'right';
  isDisabled: boolean;
  children?: never;
};
export const FlatButton: {
  (props: FlatButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<
    FlatButtonProps,
    'tone' | 'type' | 'iconPosition' | 'isDisabled'
  >;
};

// <IconButton>
export type IconButtonProps = {
  type: 'submit' | 'reset' | 'button';
  label: string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  shape: 'round' | 'square';
  size: 'small' | 'medium' | 'big';
  isToggleButton: boolean;
  // NOTE: only required if `isToggleButton` is defined
  isToggled?: boolean;
  // NOTE: only valid if `isToggleButton` is defined
  theme: 'default' | 'primary' | 'info';
  children?: never;
};
export const IconButton: {
  (props: IconButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<
    IconButtonProps,
    'type' | 'theme' | 'size' | 'shape' | 'isToggleButton'
  >;
};

// <LinkButton>
export type LinkButtonProps = {
  label: string;
  to:
    | string
    | { pathname: string; search?: string; query?: Record<string, string> };
  iconLeft?: React.ReactNode;
  isDisabled: boolean;
  isExternal: boolean;
  children?: never;
};
export const LinkButton: {
  (props: LinkButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<LinkButtonProps, 'isDisabled' | 'isExternal'>;
};

// <PrimaryButton>
export type PrimaryButtonProps = {
  type: 'submit' | 'reset' | 'button';
  label: string;
  // Any valid HTML attributes to be passed to the button element
  buttonAttributes?: { [key: string]: string };
  iconLeft?: React.ReactNode;
  isToggleButton: boolean;
  // NOTE: only required if `isToggleButton` is defined
  isToggled?: boolean;
  isDisabled?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  size: 'big' | 'small';
  tone: 'urgent' | 'primary';
  children?: never;
};
export const PrimaryButton: {
  (props: PrimaryButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<
    PrimaryButtonProps,
    'type' | 'size' | 'isToggleButton' | 'tone'
  >;
};

// <SecondaryButton>
export type SecondaryButtonProps = {
  // NOTE: only used when `linkTo` is not defined
  type: 'submit' | 'reset' | 'button';
  label: string;
  // Any valid HTML attributes to be passed to the button element
  buttonAttributes?: { [key: string]: string };
  iconLeft?: React.ReactNode;
  isToggleButton: boolean;
  // NOTE: only required if `isToggleButton` is defined
  isToggled?: boolean;
  // NOTE: only valid if `isToggleButton` is defined
  theme: 'default' | 'info';
  isDisabled?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  linkTo?:
    | string
    | { pathname: string; search?: string; query?: Record<string, string> };
  children?: never;
};
export const SecondaryButton: {
  (props: SecondaryButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SecondaryButtonProps, 'type' | 'theme' | 'isToggleButton'>;
};

// <SecondaryIconButton>
export type SecondaryIconButtonProps = {
  // NOTE: only used when `linkTo` is not defined
  type: 'submit' | 'reset' | 'button';
  icon: React.ReactNode;
  color: 'solid' | 'primary';
  label: string;
  onClick: (event: React.SyntheticEvent) => void;
  isDisabled: boolean;
  children?: never;
};
export const SecondaryIconButton: {
  (props: SecondaryIconButtonProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<SecondaryIconButtonProps, 'color' | 'type' | 'isDisabled'>;
};

// <Card>
export type CardProps = {
  className?: string;
  type: 'raised' | 'flat';
  theme: 'light' | 'dark';
  children: React.ReactNode;
};
export const Card: {
  (props: CardProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CardProps, 'type' | 'theme'>;
};

// <Collapsible>
export type CollapsibleRenderProps = {
  isOpen: boolean;
  toggle: () => void;
};
export type CollapsibleProps = {
  isDefaultClosed: boolean;
  isClosed?: boolean;
  // NOTE: required when `isClosed` is defined
  onToggle?: () => void;
  children: (renderProps: CollapsibleRenderProps) => React.ReactNode;
};
export const Collapsible: {
  (props: CollapsibleProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CollapsibleProps, 'isDefaultClosed'>;
};

// <CollapsibleMotion>
export type CollapsibleMotionRenderProps = {
  isOpen: boolean;
  containerStyles: React.CSSProperties;
  toggle: () => void;
  registerContentNode: React.RefObject<HTMLElement>;
};
export type CollapsibleMotionProps = {
  isDefaultClosed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  children: (renderProps: CollapsibleMotionRenderProps) => React.ReactNode;
};
export const CollapsibleMotion: {
  (props: CollapsibleMotionProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<CollapsibleMotionProps, 'isDefaultClosed'>;
};

// <ConstraintsHorizontal>
export type ConstraintsHorizontalProps = {
  constraint: 'xs' | 's' | 'm' | 'l' | 'xl' | 'scale';
  children: React.ReactNode;
};
export const ConstraintsHorizontal: {
  (props: ConstraintsHorizontalProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<ConstraintsHorizontalProps, 'constraint'>;
};

export const Constraints: {
  Horizontal: typeof ConstraintsHorizontal;
};

// <PrimaryActionDropdown>
export type PrimaryActionDropdownProps = {
  children: React.ReactNode;
};
export const PrimaryActionDropdown: {
  (props: PrimaryActionDropdownProps): JSX.Element;
  displayName: string;
};

// <PrimaryActionDropdownOption>
export type PrimaryActionDropdownOptionProps = {
  onClick: (event: React.SyntheticEvent) => void;
  isDisabled: boolean;
  iconLeft: React.ReactNode;
  children: string;
};
export const PrimaryActionDropdownOption: {
  (props: PrimaryActionDropdownOptionProps): JSX.Element;
  displayName: string;
  defaultProps: Pick<PrimaryActionDropdownOptionProps, 'isDisabled'>;
};
