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
    <path d="M5.848 21.8a2.747 2.747 0 0 1-2.017-.83A2.747 2.747 0 0 1 3 18.951v-1.9c0-.268.091-.494.273-.675a.916.916 0 0 1 .676-.274h1.9V3.498c0-.142.063-.229.19-.26.126-.032.253.015.38.142l.854.854 1.092-1.092a.455.455 0 0 1 .664 0l1.092 1.092 1.092-1.092a.456.456 0 0 1 .665 0l1.092 1.092 1.092-1.092a.455.455 0 0 1 .664 0l1.092 1.092 1.092-1.092a.455.455 0 0 1 .665 0l1.092 1.092.854-.854c.127-.127.253-.178.38-.155.127.024.19.115.19.273v15.453c0 .792-.277 1.464-.83 2.018a2.747 2.747 0 0 1-2.019.831H5.848Zm11.394-1.899a.917.917 0 0 0 .677-.273.917.917 0 0 0 .273-.677V5.66H7.747v10.444h7.596c.27 0 .495.091.677.273a.916.916 0 0 1 .273.676v1.9c0 .268.091.494.273.676a.916.916 0 0 0 .676.273ZM9.622 9.457a.88.88 0 0 1-.664-.274.94.94 0 0 1-.261-.676.92.92 0 0 1 .273-.677.918.918 0 0 1 .676-.272h3.798c.27 0 .495.09.677.272a.921.921 0 0 1 .273.677c0 .27-.09.494-.273.676a.92.92 0 0 1-.677.274H9.623Zm0 2.848a.88.88 0 0 1-.664-.273.94.94 0 0 1-.261-.676.92.92 0 0 1 .273-.677.918.918 0 0 1 .676-.273h3.798c.27 0 .495.09.677.273a.92.92 0 0 1 .273.677c0 .269-.09.494-.273.676a.92.92 0 0 1-.677.273H9.623Zm6.67-2.848a.916.916 0 0 1-.675-.274.916.916 0 0 1-.274-.676.92.92 0 0 1 .274-.677.918.918 0 0 1 .676-.272c.269 0 .494.09.676.272a.92.92 0 0 1 .273.677.916.916 0 0 1-.273.676.916.916 0 0 1-.676.274Zm0 2.848a.916.916 0 0 1-.675-.273.916.916 0 0 1-.274-.676.92.92 0 0 1 .274-.677.918.918 0 0 1 .676-.273c.269 0 .494.09.676.273a.92.92 0 0 1 .273.677.916.916 0 0 1-.273.676.916.916 0 0 1-.676.273ZM5.849 19.901h8.546v-1.899H4.899v.95c0 .268.09.494.272.676a.92.92 0 0 0 .677.273Zm-.949 0v-1.899 1.899Z" />
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
