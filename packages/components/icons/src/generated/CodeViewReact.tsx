// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/code-view.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import { warning } from '@commercetools-uikit/utils';
import { css, ClassNames } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
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
      iconColor = customProperties.colorSolid;
      break;

    case 'neutral60':
      iconColor = customProperties.colorNeutral60;
      break;

    case 'surface':
      iconColor = customProperties.colorSurface;
      break;

    case 'info':
      iconColor = customProperties.colorInfo;
      break;

    case 'primary':
      iconColor = customProperties.colorPrimary;
      break;

    case 'primary40':
      iconColor = customProperties.colorPrimary40;
      break;

    case 'warning':
      iconColor = customProperties.colorWarning;
      break;

    case 'error':
      iconColor = customProperties.colorError;
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

const SvgCodeView = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.381 17.89a.317.317 0 0 1-.237.11.316.316 0 0 1-.237-.11l-4.804-5.137a.36.36 0 0 1 0-.507L7.907 7.11A.316.316 0 0 1 8.144 7c.09 0 .169.037.237.11l.516.551A.36.36 0 0 1 9 7.915a.36.36 0 0 1-.103.253L4.845 12.5l4.052 4.332a.36.36 0 0 1 .103.253.36.36 0 0 1-.103.254l-.516.551ZM15.62 7.11a.317.317 0 0 1 .237-.11c.089 0 .168.036.237.11l4.804 5.137a.36.36 0 0 1 0 .507l-4.804 5.136a.316.316 0 0 1-.237.11.316.316 0 0 1-.237-.11l-.516-.551a.36.36 0 0 1-.103-.254.36.36 0 0 1 .103-.253l4.052-4.332-4.052-4.332A.36.36 0 0 1 15 7.915a.36.36 0 0 1 .103-.254l.516-.551Zm-1.83 2.343-2.767 6.704-1.456-.072 2.767-6.705 1.456.073Z"
      fillRule="evenodd"
    />
  </svg>
);

SvgCodeView.displayName = 'SvgCodeView';

const CodeViewIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgCodeView {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

CodeViewIcon.displayName = 'CodeViewIcon';
export default CodeViewIcon;
