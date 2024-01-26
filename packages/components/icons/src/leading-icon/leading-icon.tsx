import { type ReactElement, type CSSProperties, cloneElement } from 'react';
import {
  filterAriaAttributes,
  filterDataAttributes,
  warning,
} from '@commercetools-uikit/utils';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import InlineSvg from '../inline-svg/inline-svg';
// https://stackoverflow.com/a/65959390
type TCustomCSS = CSSProperties & Record<`--${string}`, number | string>;

export type TLeadingIconProps = {
  /**
   * Indicates the color theme of the component
   */
  color?: 'white' | 'neutral' | 'purple' | 'turquoise' | 'accent' | 'brown';
  /**
   * Indicates the size of the component
   */
  size?: '10' | '20' | '30' | '40';
  /**
   * Indicates whether the color theme is inverted, if `true` icon fill is white over a dark background of the selected color
   */
  isInverted?: boolean;
  /**
   * An <Icon /> component, must pass either an icon prop or an svg prop
   */
  icon?: ReactElement;
  /**
   * Custom SVG to be displayed, must pass either an svg prop or an icon prop
   */
  svg?: string;
};

const iconSizes = {
  10: designTokens.spacing50, // 32px
  20: `calc(${designTokens.spacing50} + ${designTokens.spacing20}`, // 40px
  30: designTokens.spacing60, //48px
  40: designTokens.spacing70, //64px
} as const;

function getSizeStyles(size: TLeadingIconProps['size'] = '20') {
  return {
    height: iconSizes[size],
    width: iconSizes[size],
  };
}

function getColorStyles({
  color = 'neutral',
  isInverted = false,
}: {
  color: TLeadingIconProps['color'] | 'customSvg';
  isInverted: TLeadingIconProps['isInverted'];
}) {
  switch (color) {
    case 'white':
      return isInverted
        ? {
            background: designTokens.colorSolid,
            fill: designTokens.colorNeutral90,
          }
        : {
            background: designTokens.colorSurface,
            border: `solid ${designTokens.borderWidth1} ${designTokens.colorNeutral90}`,
            fill: designTokens.colorNeutral60,
          };
    case 'neutral':
    default:
      return isInverted
        ? {
            background: designTokens.colorNeutral40,
            fill: designTokens.colorNeutral90,
          }
        : {
            background: designTokens.colorNeutral90,
            fill: designTokens.colorNeutral40,
          };
    case 'purple':
      return isInverted
        ? {
            background: designTokens.colorPurple50,
            fill: designTokens.colorNeutral90,
          }
        : {
            background: designTokens.colorPurple90,
            fill: designTokens.colorPurple50,
          };
    case 'turquoise':
      return isInverted
        ? {
            background: designTokens.colorTurquoise50,
            fill: designTokens.colorNeutral90,
          }
        : {
            background: designTokens.colorTurquoise90,
            fill: designTokens.colorTurquoise50,
          };
    case 'accent':
      return isInverted
        ? {
            background: designTokens.colorAccent40,
            fill: designTokens.colorNeutral90,
          }
        : {
            fill: designTokens.colorAccent40,
            background: designTokens.colorAccent90,
          };
    case 'brown':
      return isInverted
        ? {
            background: designTokens.colorBrown50,
            fill: designTokens.colorNeutral90,
          }
        : {
            background: designTokens.colorBrown90,
            fill: designTokens.colorBrown50,
          };
    case 'customSvg':
      return {
        background: designTokens.colorSurface,
        border: `solid ${designTokens.borderWidth1} ${designTokens.colorNeutral90}`,
        fill: null,
      };
  }
}

const defaultProps: Pick<TLeadingIconProps, 'color' | 'size' | 'isInverted'> = {
  color: 'neutral',
  size: '20',
  isInverted: false,
};

const LeadingIcon = (props: TLeadingIconProps) => {
  if (!props.svg && !props.icon) {
    warning(
      !props.icon && !props.svg,
      'LeadingIcon: you must pass either an icon or svg prop to the LeadingIcon component'
    );
    return null;
  }

  const sizeStyles = getSizeStyles(props.size);
  const colorStyles = getColorStyles({
    color: props.svg ? 'customSvg' : props.color,
    isInverted: props.isInverted,
  });
  return (
    <div
      // https://emotion.sh/docs/best-practices#use-the-style-prop-for-dynamic-styles
      // https://emotion.sh/docs/best-practices#advanced-css-variables-with-style
      style={
        {
          '--leading-icon-background-color': colorStyles.background,
          '--leading-icon-fill-color': colorStyles.fill,
          '--leading-icon-height': sizeStyles.height,
          '--leading-icon-width': sizeStyles.width,
          '--leading-icon-padding': props.svg ? null : designTokens.spacing20,
          '--leading-icon-border': colorStyles.border,
        } as TCustomCSS
      }
      // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role
      role="img"
      css={css`
        display: flex;
        flex: 0 0 auto;
        justify-content: center;
        align-items: center;
        padding: var(--leading-icon-padding);
        height: var(--leading-icon-height);
        width: var(--leading-icon-width);
        border-radius: ${designTokens.borderRadius4};
        color: var(--leading-icon-fill-color);
        fill: var(--leading-icon-fill-color);
        background-color: var(--leading-icon-background-color);
        border: var(--leading-icon-border);
      `}
      {...filterDataAttributes(props)}
      {...filterAriaAttributes(props)}
    >
      {props.svg ? (
        <InlineSvg data={props.svg} size={'scale'} />
      ) : (
        props.icon &&
        cloneElement(props?.icon, {
          size: 'scale',
        })
      )}
    </div>
  );
};

LeadingIcon.displayName = 'LeadingIcon';
LeadingIcon.defaultProps = defaultProps;

export default LeadingIcon;
