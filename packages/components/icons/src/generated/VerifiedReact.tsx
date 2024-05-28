// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/verified.react.svg
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
    | 'error'
    | 'success';
  size?: 'small' | 'medium' | 'big' | 'scale' | '10' | '20' | '30' | '40';
};
export type SVGProps = Props & {
  className: string;
};
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
  '10': 12,
  '20': 16,
  '30': 20,
  '40': 24,
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
    case '10':
    case '20':
    case '30':
    case '40':
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
    case 'success':
      iconColor = designTokens.colorSuccess;
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
const SvgVerified = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M7.734 18.429 5.312 17.9a.83.83 0 0 1-.529-.342.82.82 0 0 1-.154-.605l.242-2.488-1.65-1.894A.82.82 0 0 1 3 12q0-.33.22-.572l1.651-1.894-.242-2.488a.82.82 0 0 1 .154-.605.83.83 0 0 1 .529-.342l2.422-.528L9.01 3.413a.82.82 0 0 1 .484-.374 1 1 0 0 1 .616.022l2.29.969 2.29-.969a1 1 0 0 1 .616-.022.82.82 0 0 1 .485.374l1.277 2.158 2.422.528a.83.83 0 0 1 .528.342.82.82 0 0 1 .154.605l-.242 2.488 1.651 1.894q.22.242.22.572t-.22.572l-1.651 1.894.242 2.488a.82.82 0 0 1-.154.605.83.83 0 0 1-.528.341l-2.422.529-1.277 2.158a.82.82 0 0 1-.485.374 1 1 0 0 1-.616-.022l-2.29-.969-2.29.969a1 1 0 0 1-.616.022.82.82 0 0 1-.484-.374zm3.126-3.92a.84.84 0 0 0 .617.243q.373 0 .616-.242l3.743-3.743a.86.86 0 0 0 .264-.628.86.86 0 0 0-.264-.627.86.86 0 0 0-.627-.264.86.86 0 0 0-.628.264l-3.104 3.105L10.2 11.36a.86.86 0 0 0-.628-.231.86.86 0 0 0-.605.253.84.84 0 0 0-.243.617q0 .375.243.617z" />
  </svg>
);
SvgVerified.displayName = 'SvgVerified';
const VerifiedIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgVerified {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
VerifiedIcon.displayName = 'VerifiedIcon';
export default VerifiedIcon;
