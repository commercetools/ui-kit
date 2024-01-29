import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { TLeadingIconProps } from './leading-icon';

const iconSizesMap = {
  10: designTokens.spacing50,
  20: `calc(${designTokens.spacing50} + ${designTokens.spacing20})`,
  30: designTokens.spacing60,
  40: designTokens.spacing70,
} as const;

type TColorStylesMapping = Record<
  string,
  {
    light: {
      background: string;
      fill: string;
      border?: string;
    };
    dark: {
      background: string;
      fill: string;
      border?: string;
    };
  }
>;
const colorStylesMapping: TColorStylesMapping = {
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
      fill: designTokens.colorTurquoise50,
    },
    dark: {
      background: designTokens.colorTurquoise50,
      fill: designTokens.colorNeutral90,
    },
  },
  accent: {
    light: {
      background: designTokens.colorAccent90,
      fill: designTokens.colorAccent40,
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
      border: `solid ${designTokens.borderWidth1} ${designTokens.colorNeutral40}`,
      fill: 'inherit',
    },
  },
};

export function getLeadingIconStyles(props: TLeadingIconProps) {
  const colorStylesMap =
    colorStylesMapping[
      Boolean(props.svg) ? 'customSvg' : props.color || 'neutral'
    ];
  const colorStyles = colorStylesMap[props.isInverted ? 'dark' : 'light'];

  return css`
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    padding: ${props.svg ? '0' : designTokens.spacing20};
    height: ${iconSizesMap[props.size || '20']};
    width: ${iconSizesMap[props.size || '20']};
    border-radius: ${designTokens.borderRadius4};
    color: ${colorStyles.fill};
    fill: ${colorStyles.fill};
    background-color: ${colorStyles.background};
    border: ${colorStyles.border};
  `;
}
