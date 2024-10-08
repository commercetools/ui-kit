// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/list-with-search.react.svg
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
const SvgListWithSearch = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M3.92 8.759a.89.89 0 0 1-.655-.265A.89.89 0 0 1 3 7.839q0-.39.265-.656a.9.9 0 0 1 .655-.263h2.758q.391 0 .656.263a.9.9 0 0 1 .264.656q0 .39-.264.655a.9.9 0 0 1-.656.265zm0 4.597a.89.89 0 0 1-.655-.264.89.89 0 0 1-.265-.655q0-.391.265-.656a.9.9 0 0 1 .655-.264h2.758q.391 0 .656.264a.9.9 0 0 1 .264.656q0 .39-.264.655a.9.9 0 0 1-.656.264zm15.54 3.954-2.897-2.896q-.552.39-1.206.585-.656.196-1.322.196-1.91 0-3.253-1.345-1.345-1.344-1.345-3.252t1.345-3.254Q12.126 6 14.034 6t3.254 1.344q1.344 1.346 1.344 3.254 0 .666-.195 1.322a4.1 4.1 0 0 1-.586 1.206l2.896 2.897a.87.87 0 0 1 .253.644q0 .39-.253.643a.87.87 0 0 1-.644.253.87.87 0 0 1-.643-.253m-5.426-3.954a2.66 2.66 0 0 0 1.954-.804 2.66 2.66 0 0 0 .805-1.954 2.66 2.66 0 0 0-.804-1.954 2.66 2.66 0 0 0-1.955-.805 2.66 2.66 0 0 0-1.953.805 2.66 2.66 0 0 0-.805 1.954q0 1.149.805 1.954a2.66 2.66 0 0 0 1.954.804M3.92 17.954a.89.89 0 0 1-.655-.265.89.89 0 0 1-.265-.654q0-.392.265-.655a.89.89 0 0 1 .655-.265h7.356a.9.9 0 0 1 .656.265.9.9 0 0 1 .263.655.9.9 0 0 1-.264.654.9.9 0 0 1-.655.265z" />
  </svg>
);
SvgListWithSearch.displayName = 'SvgListWithSearch';
const ListWithSearchIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgListWithSearch
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
ListWithSearchIcon.displayName = 'ListWithSearchIcon';
export default ListWithSearchIcon;
