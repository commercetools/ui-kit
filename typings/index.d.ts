// TypeScript Version: 3.1

import * as React from 'react';

export const version: string;

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

export type Spacings = {
  Stack: ReturnType<typeof SpacingsStack>;
  Inline: ReturnType<typeof SpacingsInline>;
};
