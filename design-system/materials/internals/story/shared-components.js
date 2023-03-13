import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

export const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  & tr td {
    border: 1px solid #ccc;
    padding: 15px;
    text-align: left;
  }
  & thead td {
    background-color: gray;
    color: white;
    font-weight: bold;
  }
`;

export const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  font-family: ${designTokens.fontFamilyDefault};
  color: ${designTokens.colorSolid}
  margin: 10px;
  > * + * {
    margin: 16px 0 0 0;
  }
`;

export const GroupStyle = styled.div`
  padding: 10px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
`;

export const Token = styled.p`
  font-family: monospace;
`;

export const TokenNameHeaderCell = styled.td`
  min-width: 400px;
`;

export const Description = styled.p`
  font-size: 10pt;
  margin: 10px 0;
`;

export const DeprecationBadge = () => (
  <b style={{ color: 'orange' }}>DEPRECATED</b>
);
DeprecationBadge.displayName = 'DeprecationBadge';
