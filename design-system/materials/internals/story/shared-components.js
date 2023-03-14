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

const BasicSample = styled.div``;

const BorderRadiusSample = styled.div`
  width: calc(${(props) => props.value} + 2 * ${(props) => props.value});
  min-width: 20px;
  height: calc(${(props) => props.value} + 2 * ${(props) => props.value});
  min-height: 20px;
  background-color: pink;
  border-radius: ${(props) => props.value};
  display: inline-block;
  margin: 0 10px;
`;

const ColorSample = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.value};
  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.1);
  display: inline-block;
`;

const FontColorSampleStyle = styled.div`
  color: ${(props) => props.color};
  font-size: 24pt;
  font-weight: bolder;
  display: inline-block;
`;
const FontColorSample = (props) => (
  <FontColorSampleStyle {...props}>Aa</FontColorSampleStyle>
);

const ShadowSample = styled.div`
  width: 50px;
  height: 50px;
  box-shadow: ${(props) => props.value};
  display: inline-block;
  margin: 0 10px;
`;

const SpacingSample = styled.div`
  width: ${(props) => props.value};
  height: ${(props) => props.value};
  background-color: lightblue;
  display: inline-block;
  margin: 0 10px;
`;

export const Samplers = {
  BasicSample,
  BorderRadiusSample,
  ColorSample,
  FontColorSample,
  ShadowSample,
  SpacingSample,
};
