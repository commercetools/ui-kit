// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/tag-multi.react.svg
import { warning, createSequentialId } from '@commercetools-uikit/utils';
import { useMemo } from 'react';
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
  title?: string;
};
export type SVGProps = Props & {
  className: string;
  titleId: string;
  title?: string;
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
const SvgTagMulti = ({ titleId, title, ...props }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m4.796 18.121-.763-.314a1.582 1.582 0 0 1-.932-1.01 1.89 1.89 0 0 1 .079-1.416l1.616-3.503v6.243Zm3.594 1.976c-.495 0-.918-.175-1.27-.527a1.732 1.732 0 0 1-.527-1.27v-5.389l2.38 6.602c.045.105.09.206.135.304.045.097.105.19.18.28H8.39Zm4.626-.09c-.48.18-.944.158-1.393-.067a1.872 1.872 0 0 1-.943-1.055L6.683 7.925a1.76 1.76 0 0 1 .045-1.403c.21-.457.554-.767 1.033-.932l6.782-2.47c.479-.18.943-.157 1.392.067.45.225.764.577.943 1.056l3.998 10.959c.18.479.164.947-.045 1.404-.21.456-.554.766-1.033.931l-6.782 2.47Zm-1.932-10.69a.87.87 0 0 0 .64-.258.868.868 0 0 0 .259-.64.871.871 0 0 0-.258-.64.871.871 0 0 0-.64-.258.869.869 0 0 0-.64.258.87.87 0 0 0-.259.64c0 .255.086.468.259.64a.867.867 0 0 0 .64.259Zm1.303 8.984 6.782-2.47L15.17 4.826 8.39 7.297 12.387 18.3ZM8.39 7.297l6.781-2.47-6.781 2.47Z" />
  </svg>
);
SvgTagMulti.displayName = 'SvgTagMulti';
const titleSequentialId = createSequentialId('tag-multi-icon-title-');
const TagMultiIcon = (props: Props) => {
  const svgTitleId = useMemo(() => titleSequentialId(), []);
  return (
    <ClassNames>
      {({ css: createClass }) => (
        <SvgTagMulti
          {...props}
          titleId={svgTitleId}
          title={props.title || 'Tag multi icon'}
          className={createClass(getIconStyles(props))}
        />
      )}
    </ClassNames>
  );
};
TagMultiIcon.displayName = 'TagMultiIcon';
export default TagMultiIcon;
