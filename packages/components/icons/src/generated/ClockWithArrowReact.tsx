// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'pnpm generate-icons'.
// Original SVG file: src/svg/clock-with-arrow.react.svg
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
const SvgClockWithArrow = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    viewBox="0 0 33 32"
    role="img"
    {...props}
  >
    <path
      fill="#FFF"
      fillRule="evenodd"
      d="m21.198 23.465 1.175 2.403a11.7 11.7 0 0 1-4.209 1.11l-.4.022-.102-2.667a9 9 0 0 0 3.536-.868m-8.517-.398c.907.54 1.9.916 2.952 1.114l.245.043.245.036-.362 2.644q-.318-.042-.635-.102a11.7 11.7 0 0 1-3.446-1.224l-.399-.227zm-3.06-3.04a8.9 8.9 0 0 0 1.552 1.91l.264.235-1.777 2.012a11.6 11.6 0 0 1-2.146-2.444l-.217-.346zm8.45-11.84c4.136.285 7.203 3.824 6.914 7.904s-3.877 7.156-8.014 6.87c-4.136-.284-7.255-3.823-6.966-7.903.018-.247.024-.418.065-.648.01-.058.02-.07.028-.1a.5.5 0 0 1 .034-.09c.014-.028.03-.05.051-.086q.168-.273 1.194-1.56l-.726-.05c1.257-2.743 4.198-4.56 7.42-4.337m-1.077 2.188a.77.77 0 0 0-.763.67l-.007.104v5.857c0 .392.29.716.665.768l.105.007h4.968c.425 0 .77-.347.77-.775a.77.77 0 0 0-.665-.767l-.105-.007h-4.199v-5.083a.77.77 0 0 0-.665-.767zm4.253-2.812-.115-.055.101.049-.227-.105-.247-.105-.251-.099a8.5 8.5 0 0 0-1.492-.423l-.002.005-.019-.004a9.1 9.1 0 0 0-3.22-.028l-.078.015-.354.072c-.37.084-.721.19-1.076.319l-.357.135q-.198.078-.391.162a9 9 0 0 0-2.631 1.847l.016-.017a8.8 8.8 0 0 0-1.301 1.703l-.074.125-.166.303q-.243.465-.429.954l-.117.33 1.862-.001-3.396 5.397-3.303-5.395h2.021a11.3 11.3 0 0 1 1.17-2.889 11.4 11.4 0 0 1 1.777-2.372q.018-.016.035-.034.45-.457.953-.867l.34-.266a12 12 0 0 1 2.603-1.456c.615-.252 1.25-.45 1.914-.591a11.8 11.8 0 0 1 3.633-.219c.357.028.71.08 1.057.146l.019.006.024.003q.995.196 1.94.559a11.5 11.5 0 0 1 3.712 2.24l.292.273q.717.699 1.303 1.503a11.3 11.3 0 0 1 1.846 3.888l.092.385-.009.002a11.5 11.5 0 0 1 .27 2.071l.008.318-.001.317a12 12 0 0 1-.21 1.898q-.096.497-.237.985l-.033.116-.055.178-.065.197a11 11 0 0 1-.18.501q-.366.925-.885 1.776a11.4 11.4 0 0 1-2.893 3.209l-.323.236-1.574-2.171a9 9 0 0 0 1.717-1.581 9 9 0 0 0 1.454-2.488l.063-.17.018-.056.085-.248a8.9 8.9 0 0 0 .411-2.654l-.002-.181v-.061l-.003-.025-.02-.346a8.8 8.8 0 0 0-.516-2.362l-.065-.17-.068-.168c-.042-.109-.075-.215-.124-.32a9 9 0 0 0-.158-.327l-.01.004a8.7 8.7 0 0 0-1.983-2.58l-.278-.238a8.5 8.5 0 0 0-1.413-.958l-.283-.146-.1-.05.05.025-.059-.029z"
    />
  </svg>
);
SvgClockWithArrow.displayName = 'SvgClockWithArrow';
const ClockWithArrowIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgClockWithArrow
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
ClockWithArrowIcon.displayName = 'ClockWithArrowIcon';
export default ClockWithArrowIcon;
