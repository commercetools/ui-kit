import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import { TAvatarProps } from './avatar';

const fontSizeMap = {
  s: {
    narrow: designTokens.fontSize30,
    wide: designTokens.fontSize10,
  },
  m: {
    narrow: designTokens.fontSize50,
    wide: designTokens.fontSize30,
  },
  l: {
    narrow: designTokens.fontSize90,
    wide: designTokens.fontSize80,
  },
};

const widthSizeMap = {
  s: '32px',
  m: '40px',
  l: '100px',
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
  return fontSizeMap[avatarSize!][widthCode];
};

export const getWidthSize = (avatarSize: TAvatarProps['size']) =>
  widthSizeMap[avatarSize!];

export const getBackgroundColor = (
  avatarColor: TAvatarProps['color'] = 'accent',
  isHighlighted: TAvatarProps['isHighlighted']
) => colorsMap[avatarColor][isHighlighted ? 'highlighted' : 'normal'];

export const getForegroundColor = (avatarColor: TAvatarProps['color']) => {
  switch (avatarColor) {
    case 'brown':
      return designTokens.colorBrown35;
    case 'purple':
      return designTokens.colorPurple50;
    case 'turquoise':
      return designTokens.colorTurquoise35;
    default:
      return designTokens.colorAccent30;
  }
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
    font-size: ${designTokens.fontSize30};
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
