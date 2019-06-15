// TypeScript Version: 3.1

import * as React from 'react';

export const version: string;

// <ContentNotification>
export type ContentNotificationProps = {
  type: "error" | "info" | "warning" | "success",
  children: React.ReactNode
};
export function ContentNotification(props: ContentNotificationProps): JSX.Element;

// <Avatar>
export const avatarDefaultProps: {
  firstName: string,
  lastName: string,
  isHighlighted: boolean,
  size: "s" | "m" | "l",
};
export type AvatarDefaultProps = typeof avatarDefaultProps;
export type AvatarProps = {
  firstName?: string,
  lastName?: string,
  gravatarHash: string,
  isHighlighted?: boolean,
  size?: "s" | "m" | "l",
  children?: never
} & AvatarDefaultProps;
export function Avatar(props: AvatarProps): JSX.Element;
