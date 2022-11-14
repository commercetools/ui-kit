// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
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

const SvgClockWithArrow = (props: SVGProps) => (
  <svg
    width={33}
    height={32}
    viewBox="0 0 33 32"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path
      d="m21.198 23.465 1.175 2.403a11.676 11.676 0 0 1-4.209 1.11l-.4.022-.102-2.667a8.962 8.962 0 0 0 3.536-.868Zm-8.517-.398c.907.54 1.9.916 2.952 1.114l.245.043.245.036-.362 2.644a11.738 11.738 0 0 1-4.081-1.326l-.399-.227 1.4-2.284Zm-3.06-3.04a8.885 8.885 0 0 0 1.552 1.91l.264.235-1.777 2.012a11.567 11.567 0 0 1-2.146-2.444l-.217-.346 2.323-1.367Zm8.45-11.84c4.136.285 7.203 3.824 6.914 7.904-.289 4.08-3.877 7.156-8.014 6.87-4.136-.284-7.255-3.823-6.966-7.903.018-.247.024-.418.065-.648.01-.058.02-.07.028-.1a.482.482 0 0 1 .034-.09c.014-.028.03-.05.051-.086.112-.182.51-.702 1.194-1.56l-.726-.05c1.257-2.743 4.198-4.56 7.42-4.337Zm-1.077 2.188a.771.771 0 0 0-.763.67l-.007.104v5.857c0 .392.29.716.665.768l.105.007h4.968c.425 0 .77-.347.77-.775a.773.773 0 0 0-.665-.767l-.105-.007h-4.199v-5.083a.773.773 0 0 0-.665-.767l-.104-.007Zm4.253-2.812-.115-.055.101.049-.227-.105a9.037 9.037 0 0 0-.247-.105l-.251-.099a8.542 8.542 0 0 0-1.492-.423l-.002.005-.019-.004a9.095 9.095 0 0 0-3.22-.028l-.078.015-.354.072c-.37.084-.721.19-1.076.319l-.357.135c-.132.052-.262.106-.391.162a8.948 8.948 0 0 0-2.631 1.847l.016-.017a8.823 8.823 0 0 0-1.301 1.703l-.074.125-.166.303c-.162.31-.305.628-.429.954l-.117.33 1.862-.001-3.396 5.397-3.303-5.395h2.021a11.316 11.316 0 0 1 1.17-2.889 11.348 11.348 0 0 1 1.777-2.372 11.455 11.455 0 0 1 .987-.9l.341-.267a12.11 12.11 0 0 1 2.603-1.456c.615-.252 1.25-.45 1.914-.591a11.759 11.759 0 0 1 3.633-.219c.357.028.71.08 1.057.146l.019.006.024.003c.663.13 1.311.317 1.94.559a11.446 11.446 0 0 1 3.712 2.24l.292.273c.477.466.913.967 1.303 1.503a11.306 11.306 0 0 1 1.846 3.888l.092.385-.009.002a11.476 11.476 0 0 1 .27 2.071l.008.318-.001.317a11.93 11.93 0 0 1-.21 1.898c-.064.331-.143.66-.237.985l-.033.116-.055.178a10.8 10.8 0 0 1-.246.698c-.243.616-.538 1.21-.884 1.776a11.361 11.361 0 0 1-2.893 3.209l-.323.236-1.574-2.171a8.898 8.898 0 0 0 1.717-1.581 8.97 8.97 0 0 0 1.454-2.488l.063-.17.018-.056.085-.248a8.857 8.857 0 0 0 .411-2.654l-.002-.181v-.061l-.003-.025-.02-.346a8.842 8.842 0 0 0-.516-2.362l-.065-.17-.068-.168c-.042-.109-.075-.215-.124-.32a8.712 8.712 0 0 0-.158-.327l-.01.004a8.744 8.744 0 0 0-1.983-2.58l-.278-.238a8.454 8.454 0 0 0-1.413-.958l-.283-.146a2.904 2.904 0 0 0-.1-.05l.05.025-.059-.029.007.003Z"
      fill="#FFF"
      fillRule="evenodd"
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
