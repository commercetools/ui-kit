// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/paper-bill-inverted.react.svg
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
const SvgPaperBillInverted = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M5.848 21.8a2.75 2.75 0 0 1-2.017-.83A2.75 2.75 0 0 1 3 18.951v-1.9q0-.403.273-.675a.92.92 0 0 1 .676-.274h1.9V3.498q0-.213.19-.26t.38.142l.854.854 1.092-1.092a.455.455 0 0 1 .664 0l1.092 1.092 1.092-1.092a.456.456 0 0 1 .665 0l1.092 1.092 1.092-1.092a.455.455 0 0 1 .664 0l1.092 1.092 1.092-1.092a.455.455 0 0 1 .665 0l1.092 1.092.854-.854q.19-.19.38-.155t.19.273v15.453q0 1.188-.83 2.018a2.75 2.75 0 0 1-2.019.831zm11.394-1.899a.92.92 0 0 0 .677-.273.92.92 0 0 0 .273-.677V5.66H7.747v10.444h7.596q.404 0 .677.273a.92.92 0 0 1 .273.676v1.9q0 .403.273.676a.92.92 0 0 0 .676.273M9.622 9.457a.88.88 0 0 1-.664-.274.94.94 0 0 1-.261-.676.92.92 0 0 1 .273-.677.92.92 0 0 1 .676-.272h3.798q.404 0 .677.272a.92.92 0 0 1 .273.677q0 .404-.273.676a.92.92 0 0 1-.677.274zm0 2.848a.88.88 0 0 1-.664-.273.94.94 0 0 1-.261-.676.92.92 0 0 1 .273-.677.92.92 0 0 1 .676-.273h3.798q.404 0 .677.273a.92.92 0 0 1 .273.677q0 .403-.273.676a.92.92 0 0 1-.677.273zm6.67-2.848a.92.92 0 0 1-.675-.274.92.92 0 0 1-.274-.676.92.92 0 0 1 .274-.677.92.92 0 0 1 .676-.272q.403 0 .676.272a.92.92 0 0 1 .273.677.92.92 0 0 1-.273.676.92.92 0 0 1-.676.274m0 2.848a.92.92 0 0 1-.675-.273.92.92 0 0 1-.274-.676.92.92 0 0 1 .274-.677.92.92 0 0 1 .676-.273q.403 0 .676.273a.92.92 0 0 1 .273.677.92.92 0 0 1-.273.676.92.92 0 0 1-.676.273M5.849 19.901h8.546v-1.899H4.899v.95q0 .403.272.676a.92.92 0 0 0 .677.273m-.949 0v-1.899z" />
  </svg>
);
SvgPaperBillInverted.displayName = 'SvgPaperBillInverted';
const PaperBillInvertedIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgPaperBillInverted
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
PaperBillInvertedIcon.displayName = 'PaperBillInvertedIcon';
export default PaperBillInvertedIcon;
