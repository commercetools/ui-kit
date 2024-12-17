import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { getPaddingStyle, getHorizontalAlignmentStyle } from './cell.styles';

type TFooter = {
  children: ReactNode;
  isCondensed?: boolean;
  horizontalCellAlignment?: 'left' | 'center' | 'right';
  resizedTotalWidth?: number;
};

const Footer = styled.div<TFooter>`
  box-sizing: border-box;
  display: block;
  ${getPaddingStyle}
  ${getHorizontalAlignmentStyle}
  background-color: ${designTokens.colorSurface};
  border-top: 1px solid ${designTokens.colorNeutral90};
  border-bottom: 1px solid ${designTokens.colorNeutral90};
  width: 100%;
  ${(props) =>
    props.resizedTotalWidth ? `max-width: ${props.resizedTotalWidth}px;` : ''}
`;
Footer.displayName = 'Footer';

export default Footer;
