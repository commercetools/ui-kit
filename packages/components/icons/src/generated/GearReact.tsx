// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/gear.react.svg
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
const SvgGear = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M13.732 21.47h-3.464a.863.863 0 0 1-.6-.23.92.92 0 0 1-.3-.578l-.277-2.147c-.2-.077-.389-.17-.565-.277a7.58 7.58 0 0 1-.52-.346l-2.009.83a1.033 1.033 0 0 1-.646.024.858.858 0 0 1-.508-.393l-1.709-2.978a.868.868 0 0 1-.115-.646.887.887 0 0 1 .346-.555l1.732-1.316a2.206 2.206 0 0 1-.023-.312v-.623c0-.1.007-.204.023-.311l-1.732-1.316a.886.886 0 0 1-.346-.554.868.868 0 0 1 .115-.647l1.709-2.978a.727.727 0 0 1 .496-.405c.223-.053.443-.042.658.035l2.009.832c.17-.124.346-.239.53-.347.186-.107.37-.2.555-.277l.277-2.147a.92.92 0 0 1 .3-.577c.17-.154.37-.231.6-.231h3.464c.23 0 .43.077.6.23a.92.92 0 0 1 .3.578l.277 2.147c.2.077.389.17.566.277.177.108.35.223.52.347l2.008-.832c.215-.077.43-.084.646-.023a.858.858 0 0 1 .508.393l1.709 2.978c.123.2.161.416.115.647a.886.886 0 0 1-.346.554l-1.732 1.316a2.2 2.2 0 0 1 .023.31v.624c0 .1-.015.205-.046.312l1.732 1.316c.184.139.3.324.346.555a.868.868 0 0 1-.115.646l-1.709 2.955a.91.91 0 0 1-.519.405 1.017 1.017 0 0 1-.658-.012l-1.963-.831c-.17.123-.346.238-.53.346-.186.108-.37.2-.555.277l-.277 2.147a.92.92 0 0 1-.3.577.863.863 0 0 1-.6.231Zm-1.686-6.003c.893 0 1.655-.315 2.286-.946a3.115 3.115 0 0 0 .946-2.286c0-.893-.315-1.654-.946-2.286a3.115 3.115 0 0 0-2.286-.946c-.908 0-1.674.315-2.298.946a3.135 3.135 0 0 0-.934 2.286c0 .893.311 1.655.934 2.286.624.63 1.39.946 2.298.946Zm0-1.847c-.385 0-.711-.134-.98-.404a1.333 1.333 0 0 1-.405-.98c0-.386.135-.713.404-.982.27-.27.596-.404.981-.404s.712.135.982.404c.269.27.403.596.403.981s-.134.712-.403.98c-.27.27-.597.405-.982.405Zm-.97 6.003H12.9l.324-2.447c.477-.123.92-.304 1.328-.543a5.51 5.51 0 0 0 1.119-.865l2.286.946.9-1.57-1.985-1.5c.076-.216.13-.443.161-.682a5.665 5.665 0 0 0 0-1.455 3.258 3.258 0 0 0-.162-.68l1.986-1.501-.9-1.57-2.286.97a5.146 5.146 0 0 0-1.12-.89 5.194 5.194 0 0 0-1.327-.542l-.3-2.447H11.1l-.324 2.447c-.477.123-.92.304-1.327.542a5.526 5.526 0 0 0-1.12.867l-2.286-.947-.9 1.57 1.986 1.478c-.077.23-.131.461-.162.692a5.596 5.596 0 0 0 0 1.455c.03.23.085.461.162.692l-1.986 1.501.9 1.57 2.286-.97a5.111 5.111 0 0 0 2.447 1.432l.3 2.447Z" />
  </svg>
);
SvgGear.displayName = 'SvgGear';
const GearIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgGear {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
GearIcon.displayName = 'GearIcon';
export default GearIcon;
