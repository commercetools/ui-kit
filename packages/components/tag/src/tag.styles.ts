import { css } from '@emotion/react';
import { TTagProps } from './tag';
import { designTokens } from '@commercetools-uikit/design-system';

type visualVariantType = Exclude<
  'disabled' | TTagProps['type'] | TTagProps['tone'],
  undefined
>;

type TToneStylesProps = Omit<TTagProps, 'tone'> & {
  tone: NonNullable<TTagProps['tone']>;
};

/**
 * Returns the required tone styles for the tag based on the props.
 */
export const getToneStyles = ({
  isDisabled,
  type,
  tone,
  onClick,
}: TToneStylesProps) => {
  let variant: visualVariantType = isDisabled ? 'disabled' : type || tone;

  // map deprecated 'normal' type to 'primary' tone
  if (variant === 'normal') variant = 'primary';

  const variants: Record<
    Exclude<visualVariantType, 'normal'>,
    {
      textColor: string;
      borderColor: string;
      bgColor: string;
      bgColorHover: string;
    }
  > = {
    primary: {
      textColor: designTokens.colorPrimary20,
      borderColor: designTokens.colorPrimary90,
      bgColor: designTokens.colorPrimary95,
      bgColorHover: designTokens.colorPrimary90,
    },
    warning: {
      textColor: designTokens.colorSolid,
      borderColor: designTokens.colorWarning85,
      bgColor: designTokens.colorWarning95,
      bgColorHover: designTokens.colorWarning85,
    },
    surface: {
      textColor: designTokens.colorNeutral40,
      borderColor: designTokens.colorNeutral85,
      bgColor: designTokens.colorSurface,
      bgColorHover: designTokens.colorNeutral98,
    },
    disabled: {
      textColor: designTokens.colorNeutral60,
      borderColor: designTokens.colorNeutral,
      bgColor: designTokens.colorNeutral95,
      bgColorHover: designTokens.colorNeutral95,
    },
  };

  const { textColor, borderColor, bgColor, bgColorHover } = variants[variant];

  return css(`
    color: ${textColor};
    background-color: ${bgColor};
    border-color: ${borderColor};

    ${
      onClick &&
      `
      &:hover {
        background-color: ${bgColorHover};
      }
    `
    }
  `);
};
