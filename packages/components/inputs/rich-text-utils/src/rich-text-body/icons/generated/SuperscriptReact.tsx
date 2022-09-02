// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/rich-text-body/icons/svg/superscript.react.svg

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

const SvgSuperscript = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fillRule="evenodd">
      <path
        fill="#333"
        fillRule="nonzero"
        d="M7.067 14.063 3.64 8.855h3.295L9 12.245l2.085-3.39h3.295l-3.466 5.208 3.628 5.437h-3.304L9 15.853 6.753 19.5H3.458zM21.044 13.5h-5.988v-1.26l2.15-2.174c.637-.652 1.053-1.104 1.248-1.356.195-.252.336-.485.422-.7.086-.215.129-.438.129-.668 0-.344-.095-.6-.284-.768-.19-.168-.443-.252-.76-.252-.331 0-.653.076-.966.229a4.99 4.99 0 0 0-.978.65l-.985-1.166c.422-.36.772-.613 1.05-.762a3.85 3.85 0 0 1 .907-.342c.328-.08.696-.12 1.102-.12.535 0 1.008.097 1.418.293.41.195.728.468.955.82.226.351.34.754.34 1.207 0 .394-.07.765-.208 1.11-.139.346-.354.7-.645 1.064-.29.363-.804.88-1.538 1.552l-1.101 1.038v.082h3.732V13.5Z"
      />
    </g>
  </svg>
);

SvgSuperscript.displayName = 'SvgSuperscript';

const SuperscriptIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgSuperscript
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);

SuperscriptIcon.displayName = 'SuperscriptIcon';
export default SuperscriptIcon;
