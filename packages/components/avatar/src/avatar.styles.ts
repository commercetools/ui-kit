import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import startCase from 'lodash/startCase';
import { TAvatarProps } from './avatar';

const fontSizeMap = {
  s: {
    narrow: designTokens.fontSize10, // '12px',
    wide: designTokens.fontSize30, // '16px',
  },
  m: {
    narrow: designTokens.fontSize30, // '16px',
    wide: designTokens.fontSize50, // '20px',
  },
  l: {
    narrow: designTokens.fontSize80, // '40px',
    wide: designTokens.fontSize90, //'48px',
  },
};

const widthSizeMap = {
  s: '32px',
  m: '40px',
  l: '80px',
};

const colorsMap = {
  accent: {
    normal: designTokens.colorAccent90,
    highlighted: designTokens.colorAccent95,
  },
  purple: {
    normal: designTokens.colorPurple90,
    highlighted: designTokens.colorPurple95,
  },
  turquoise: {
    normal: designTokens.colorTurquoise90,
    highlighted: designTokens.colorTurquoise95,
  },
  brown: {
    normal: designTokens.colorBrown90,
    highlighted: designTokens.colorBrown95,
  },
};

export const getFontSize = (
  avatarInitials: string,
  avatarSize: TAvatarProps['size']
) => {
  const widthCode = avatarInitials.length > 1 ? 'wide' : 'narrow';
  return fontSizeMap[avatarSize][widthCode];
};

export const getWidthSize = (avatarSize: TAvatarProps['size']) =>
  widthSizeMap[avatarSize];

export const getBackgroundColor = (
  avatarColor: TAvatarProps['color'] = 'accent',
  isHighlighted: TAvatarProps['isHighlighted']
) => colorsMap[avatarColor][isHighlighted ? 'highlighted' : 'normal'];

export const getForegroundColor = (avatarColor: TAvatarProps['color']) => {
  return designTokens[
    `color${startCase(avatarColor)}50` as keyof typeof designTokens
  ];
};

export const getAvatarStyles = (avatarProps: TAvatarProps) => {
  const avatarSize = getWidthSize(avatarProps.size);
  const backgroundColor = getBackgroundColor(
    avatarProps.color,
    avatarProps.isHighlighted
  );
  const foregroundColor = getForegroundColor(avatarProps.color);
  return css`
    align-items: center;
    background-color: ${backgroundColor};
    border-radius: 100%;
    font-size: ${designTokens.fontSizeDefault};
    font-weight: ${designTokens.fontWeight600};
    color: ${foregroundColor};
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;
    fill: ${foregroundColor};

    height: ${avatarSize};
    width: ${avatarSize};
  `;
};
