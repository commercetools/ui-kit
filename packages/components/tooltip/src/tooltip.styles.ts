import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import type { TTooltipProps } from './tooltip';

const getOffsetMargin = ({ placement }: { placement: string }) => {
  const position = (placement && placement.split('-')[0]) || '';
  switch (position) {
    case 'left':
    case 'right':
      return `0 ${vars.spacingXs}`;
    case 'top':
    case 'bottom':
      return `${vars.spacingXs} 0`;
    default:
      return '';
  }
};

export const Body = styled.div`
  font-family: inherit;
  border-radius: ${vars.borderRadius6};
  padding: ${vars.spacingXs} ${vars.spacingS};
  border: 'none';
  box-shadow: ${vars.shadow15};
  font-size: 0.857rem;
  opacity: 0.95;
  color: ${vars.colorSurface};
  background-color: ${vars.colorAccent};
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
  customStyles: SerializedStyles;
}) => {
  return {
    fontFamily: 'inherit',
    margin: `${getOffsetMargin({ placement })} !important`,
    maxWidth: (vars as Record<string, string>)[`constraint${constraint}`],
    // so hovering over the tooltip when the tooltip overlaps the component
    pointerEvents: 'none',
    width: constraint === 'auto' ? 'auto' : undefined,
    zIndex: 1,
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
