// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/paid.react.svg
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
  /**
   * The size of the icon. 'small', 'medium', 'big' have been deprecated in favor of '10', '20', '30', '40'.
   */
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
        width: `${iconSizes['40']}px`,
        height: `${iconSizes['40']}px`,
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
const SvgPaid = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <mask
      id="paid_react_svg__a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </mask>
    <g mask="url(#paid_react_svg__a)">
      <path
        fill="#1A1A1A"
        d="M12 21a8.8 8.8 0 0 1-3.51-.709 9.1 9.1 0 0 1-2.857-1.924 9.1 9.1 0 0 1-1.924-2.857A8.8 8.8 0 0 1 3 12q0-1.867.709-3.51a9.1 9.1 0 0 1 1.924-2.857A9.1 9.1 0 0 1 8.49 3.709 8.8 8.8 0 0 1 12 3q1.867 0 3.51.709a9.1 9.1 0 0 1 2.858 1.924A9.1 9.1 0 0 1 20.29 8.49 8.8 8.8 0 0 1 21 12a8.8 8.8 0 0 1-.709 3.51 9.1 9.1 0 0 1-1.924 2.858 9.1 9.1 0 0 1-2.857 1.923A8.8 8.8 0 0 1 12 21m0-1.8q3.015 0 5.108-2.092T19.2 12t-2.092-5.107Q15.015 4.799 12 4.8q-3.016 0-5.107 2.093Q4.799 8.984 4.8 12t2.093 5.108T12 19.2m-.023-.9q.315 0 .552-.236a.76.76 0 0 0 .236-.552v-.337q1.125-.203 1.935-.878t.81-2.002q0-.945-.54-1.732-.54-.789-2.16-1.373-1.35-.45-1.867-.787-.518-.338-.518-.923t.416-.923q.417-.337 1.204-.337.45 0 .787.157.338.158.563.428t.506.371a.68.68 0 0 0 .529-.011.78.78 0 0 0 .461-.461.62.62 0 0 0-.056-.597 3.4 3.4 0 0 0-.889-.877 2.3 2.3 0 0 0-1.136-.405v-.338a.76.76 0 0 0-.236-.55.76.76 0 0 0-.551-.237.76.76 0 0 0-.552.236.76.76 0 0 0-.236.551v.338q-1.125.247-1.755.99-.63.742-.63 1.665 0 1.057.619 1.71.618.653 1.946 1.125 1.417.517 1.969.923.55.405.551 1.057 0 .743-.529 1.091-.528.35-1.271.349-.585 0-1.057-.281-.473-.282-.788-.844a.93.93 0 0 0-.472-.428.8.8 0 0 0-.585 0 .78.78 0 0 0-.462.428.7.7 0 0 0-.011.607q.36.765.967 1.25.609.483 1.463.663v.383q0 .315.236.55a.76.76 0 0 0 .551.237"
      />
    </g>
  </svg>
);
SvgPaid.displayName = 'SvgPaid';
const PaidIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgPaid {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
PaidIcon.displayName = 'PaidIcon';
export default PaidIcon;