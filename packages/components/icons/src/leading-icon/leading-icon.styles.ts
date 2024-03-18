import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import { type TLeadingIconProps } from './leading-icon';

type TColorThemeConfiguration = {
  background: string;
  fill?: string;
  border?: string;
};

const sizeMap = {
  10: designTokens.spacing50,
  20: `calc(${designTokens.spacing50} + ${designTokens.spacing20})`,
  30: designTokens.spacing60,
  40: designTokens.spacing70,
};

const colorThemeMap = {
  accent: {
    light: {
      fill: designTokens.colorAccent40,
      background: designTokens.colorAccent90,
    },
    dark: {
      background: designTokens.colorAccent40,
      fill: designTokens.colorNeutral90,
    },
  },
  brown: {
    light: {
      background: designTokens.colorBrown90,
      fill: designTokens.colorBrown50,
    },
    dark: {
      background: designTokens.colorBrown50,
      fill: designTokens.colorNeutral90,
    },
  },
  customSvg: {
    light: {
      background: designTokens.colorSurface,
      border: `solid ${designTokens.borderWidth1} ${designTokens.colorNeutral90}`,
      fill: 'inherit',
    },
    dark: {
      background: designTokens.colorSolid,
      fill: 'inherit',
    },
  },
  neutral: {
    light: {
      background: designTokens.colorNeutral90,
      fill: designTokens.colorNeutral40,
    },
    dark: {
      background: designTokens.colorNeutral40,
      fill: designTokens.colorNeutral90,
    },
  },
  purple: {
    light: {
      background: designTokens.colorPurple90,
      fill: designTokens.colorPurple50,
    },
    dark: {
      background: designTokens.colorPurple50,
      fill: designTokens.colorNeutral90,
    },
  },
  turquoise: {
    light: {
      background: designTokens.colorTurquoise90,
      fill: designTokens.fontColorForLeadingIconAsTurquoise,
    },
    dark: {
      background: designTokens.colorTurquoise50,
      fill: designTokens.colorNeutral90,
    },
  },
  white: {
    light: {
      background: designTokens.colorSurface,
      border: `solid ${designTokens.borderWidth1} ${designTokens.colorNeutral90}`,
      fill: designTokens.colorNeutral60,
    },
    dark: {
      background: designTokens.colorSolid,
      fill: designTokens.colorNeutral90,
    },
  },
};

function getPaddingStyles({
  size,
  hasBorder,
}: {
  size: TLeadingIconProps['size'] | 'customSvg';
  hasBorder: boolean;
}): string | null {
  switch (size) {
    case 'customSvg':
      return null;
    case '10':
      // https://github.com/commercetools/ui-kit/pull/2701#issuecomment-1914413390
      return `calc(${designTokens.spacing10} + ${hasBorder ? '0px' : '1px'})`;
    default:
      // https://github.com/commercetools/ui-kit/pull/2701#issuecomment-1914413390
      return `calc(${designTokens.spacing20} + ${hasBorder ? '0px' : '1px'})`;
  }
}

export const getLeadingIconStyles = (props: TLeadingIconProps) => {
  const sizeStyles = {
    height: sizeMap[props.size!],
    width: sizeMap[props.size!],
  };

  const colorThemeStyles = colorThemeMap[
    props.svg ? 'customSvg' : props.color!
  ][props.isInverted ? 'dark' : 'light'] as TColorThemeConfiguration;

  const paddingStyle = getPaddingStyles({
    size: props.svg ? 'customSvg' : props.size,
    hasBorder: Boolean(
      props.svg || (props.color === 'white' && !props.isInverted)
    ),
  });

  return css`
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    padding: ${paddingStyle};
    height: ${sizeStyles.height};
    width: ${sizeStyles.width};
    border-radius: ${designTokens.borderRadius4};
    color: ${colorThemeStyles.fill};
    fill: ${colorThemeStyles.fill};
    background-color: ${colorThemeStyles.background};
    box-sizing: border-box;
    border: ${colorThemeStyles.border};
  `;
};
