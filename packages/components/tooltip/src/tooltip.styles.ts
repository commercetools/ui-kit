import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TTooltipProps } from './tooltip';

type TDesignTokenName = keyof typeof designTokens;

const getOffsetMargin = ({ placement }: { placement: string }) => {
  const position = (placement && placement.split('-')[0]) || '';
  switch (position) {
    case 'left':
    case 'right':
      return `0 ${designTokens.spacing10}`;
    case 'top':
    case 'bottom':
      return `${designTokens.spacing10} 0`;
    default:
      return '';
  }
};

export const Body = styled.div`
  font-family: inherit;
  border-radius: ${designTokens.borderRadius6};
  padding: ${designTokens.paddingForTooltip};
  border: none;
  box-shadow: ${designTokens.shadowForTooltip};
  font-size: ${designTokens.fontSize20};
  opacity: 0.95;
  color: ${designTokens.colorSurface};
  background-color: ${designTokens.backgroundColorForTooltip};
`;

// here we use object styles so we can spread these
// with the styles we get from react-popper :D
// eslint-disable-next-line import/prefer-default-export
export const getBodyStyles = ({
  constraint,
  placement,
  customStyles,
}: {
  constraint: TTooltipProps['horizontalConstraint'];
  placement: string;
  customStyles?: CSSProperties;
}): CSSProperties => {
  const constraintTokenName = `constraint${constraint}`;
  return {
    fontFamily: 'inherit',
    margin: `${getOffsetMargin({ placement })} !important`,
    maxWidth:
      constraintTokenName in designTokens
        ? designTokens[constraintTokenName as TDesignTokenName]
        : 'auto',
    // so hovering over the tooltip when the tooltip overlaps the component
    pointerEvents: 'none',
    width: constraint === 'auto' ? 'auto' : undefined,
    zIndex: 1000,
    ...customStyles,
  };
};

export const Wrapper = styled.div`
  display: inline-block;
  cursor: not-allowed;
  > :disabled {
    pointer-events: none;
  }
`;
