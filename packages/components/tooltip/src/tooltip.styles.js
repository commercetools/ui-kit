import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getOffsetMargin = ({ placement }) => {
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

const getMaxWidth = ({ constraint }) => {
  switch (constraint) {
    case 'xs':
      return vars.constraintXs;
    case 's':
      return vars.constraintS;
    case 'm':
      return vars.constraintM;
    case 'l':
      return vars.constraintL;
    case 'xl':
      return vars.constraintXl;
    case 'scale':
    default:
      return vars.constraintScale;
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
export const getBodyStyles = ({ constraint, placement, customStyles }) => ({
  fontFamily: 'inherit',
  margin: `${getOffsetMargin({ placement })} !important`,
  maxWidth: getMaxWidth({ constraint }),
  // so hovering over the tooltip when the tooltip overlaps the component
  pointerEvents: 'none',
  zIndex: 1,
  ...customStyles,
});
