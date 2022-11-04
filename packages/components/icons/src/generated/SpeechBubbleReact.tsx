// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/speech-bubble.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import { warning } from '@commercetools-uikit/utils';
import { css, ClassNames } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
export type Props = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size?: 'small' | 'medium' | 'big' | 'scale';
};
export type SVGProps = Props & {
  className: string;
};
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
} as const;

const getSizeDimensions = (size: Props['size']) => {
  switch (size) {
    case 'scale':
      return {
        width: '100%',
        height: 'auto',
      };

    case 'small':
    case 'medium':
    case 'big':
      return {
        width: `${iconSizes[size]}px`,
        height: `${iconSizes[size]}px`,
      };

    default:
      return {
        width: `${iconSizes.big}px`,
        height: `${iconSizes.big}px`,
      };
  }
};

const getSizeStyle = (size: Props['size']) => {
  const dimensions = getSizeDimensions(size);

  switch (size) {
    case 'scale':
      return `
        &:not(:root) {
          width: ${dimensions.width};
          height: ${dimensions.height};
        }
      `;

    default:
      return `
        width: ${dimensions.width};
        height: ${dimensions.height};
      `;
  }
};

const getColor = (color: Props['color']) => {
  if (!color) return 'inherit';
  let iconColor;

  switch (color) {
    case 'solid':
      iconColor = designTokens.colorSolid;
      break;

    case 'neutral60':
      iconColor = designTokens.colorNeutral60;
      break;

    case 'surface':
      iconColor = designTokens.colorSurface;
      break;

    case 'info':
      iconColor = designTokens.colorInfo;
      break;

    case 'primary':
      iconColor = designTokens.colorPrimary;
      break;

    case 'primary40':
      iconColor = designTokens.colorPrimary40;
      break;

    case 'warning':
      iconColor = designTokens.colorWarning;
      break;

    case 'error':
      iconColor = designTokens.colorError;
      break;

    default:
      break;
  }

  if (!iconColor) {
    warning(
      color,
      `ui-kit/Icon: the specified color '${color}' is not supported.`
    );
    return 'inherit';
  }

  return iconColor;
};

export const getIconStyles = (props: Props) => css`
  *:not([fill='none']) {
    fill: ${getColor(props.color)};
  }
  &,
  image {
    ${getSizeStyle(props.size)};
  }
  flex-shrink: 0;
`;

const SvgSpeechBubble = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 14h6.025a.926.926 0 0 0 .7-.288A.99.99 0 0 0 14 13a.97.97 0 0 0-.287-.713A.97.97 0 0 0 13 12H6.975a.928.928 0 0 0-.7.287A.993.993 0 0 0 6 13c0 .283.096.52.287.712.192.192.43.288.713.288Zm0-3h10.025a.926.926 0 0 0 .7-.288A.99.99 0 0 0 18 10a.968.968 0 0 0-.288-.713A.967.967 0 0 0 17 9H6.975a.928.928 0 0 0-.7.287A.993.993 0 0 0 6 10c0 .283.096.52.287.712.192.192.43.288.713.288Zm0-3h10.025a.928.928 0 0 0 .7-.287A.993.993 0 0 0 18 7a.968.968 0 0 0-.288-.713A.967.967 0 0 0 17 6H6.975a.928.928 0 0 0-.7.287A.993.993 0 0 0 6 7a.97.97 0 0 0 .287.713A.97.97 0 0 0 7 8ZM2 19.575V4c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 4 2h16c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v12c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 20 18H6l-2.3 2.3c-.317.317-.68.387-1.088.212-.408-.175-.612-.487-.612-.937Zm2-2.4L5.175 16H20V4H4v13.175ZM4 4v13.175V4Z"
      fill="#000"
    />
  </svg>
);

SvgSpeechBubble.displayName = 'SvgSpeechBubble';

const SpeechBubbleIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgSpeechBubble
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);

SpeechBubbleIcon.displayName = 'SpeechBubbleIcon';
export default SpeechBubbleIcon;
