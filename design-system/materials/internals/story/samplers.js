import styled from '@emotion/styled';

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
  color: ${(props) => props.value};
  font-size: 24pt;
  font-weight: bolder;
  display: inline-block;
`;
const FontColorSample = (props) => (
  <FontColorSampleStyle {...props}>Aa</FontColorSampleStyle>
);

const FontSizeSampleStyle = styled.div`
  font-size: ${(props) => props.value};
  font-weight: bolder;
  display: inline-block;
`;
const FontSizeSample = (props) => (
  <FontSizeSampleStyle {...props}>Aa</FontSizeSampleStyle>
);

const FontWeightSampleStyle = styled.div`
  font-weight: ${(props) => props.value};
  font-size: 2rem;
  display: inline-block;
`;
const FontWeightSample = (props) => (
  <FontWeightSampleStyle {...props}>Aa</FontWeightSampleStyle>
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

const samplersMap = {
  'background-color': ColorSample,
  'border-color': ColorSample,
  'border-radius': BorderRadiusSample,
  color: ColorSample,
  'font-color': FontColorSample,
  'font-size': FontSizeSample,
  'font-weight': FontWeightSample,
  'icon-color': ColorSample,
  shadow: ShadowSample,
  spacing: SpacingSample,
};

export const getSampleComponent = (cssRuleName) =>
  samplersMap[cssRuleName] || BasicSample;
