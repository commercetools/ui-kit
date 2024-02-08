import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TTooltipProps, TTooltipState } from './tooltip';

type TDesignTokenName = keyof typeof designTokens;

const growIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const growOut = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;

const getAnimation = (state: TTooltipState) => {
  switch (state) {
    case 'opened':
      return {
        animation: `${growIn} 80ms`,
      };
    case 'exiting':
      return {
        animation: `${growOut} 80ms`,
      };
    default:
      return {};
  }
};

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
  padding: ${designTokens.spacing20} ${designTokens.spacing25};
  border: none;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: ${designTokens.fontSize10};
  opacity: 0.95;
  color: ${designTokens.colorSurface};
  background-color: ${designTokens.colorAccent10};
  white-space: break-spaces;
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

export const getTooltipStyles = (tooltipState: TTooltipState) =>
  getAnimation(tooltipState);

export const Wrapper = styled.div`
  display: inline-block;
  > :disabled {
    pointer-events: none;
  }
`;
