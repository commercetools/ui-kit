import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import styled from '@emotion/styled';
import Spacings from '@commercetools-uikit/spacings';
import { MultilineTextInput, RadioInput } from '@commercetools-uikit/inputs';
import Section from '../../../../docs/.storybook/decorators/section';
import Text from '../../text';
import Readme from '../README.md';
import * as icons from '.';
import InlineSvg from './inline-svg';

const IconList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const IconItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const IconContainer = styled.div`
  margin: 16px 0;
`;

const iconNames = Object.keys(icons);

const inlineSvgType = ['image', 'iframe'];
const sizeValues = ['small', 'medium', 'big', 'scale'];
const svgExamples = {
  noScripts: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M13.7324356,13 C13.3866262,13.5978014 12.7402824,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,11.2597176 10.4021986,10.6133738 11,10.2675644 L11,7 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,10.2675644 C13.303628,10.4432037 13.5567963,10.696372 13.7324356,11 L15,11 C15.5522847,11 16,11.4477153 16,12 C16,12.5522847 15.5522847,13 15,13 L13.7324356,13 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z"/></svg>`,
  withScript: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M17.5241522,14.7917702 C17.5250868,14.7933821 17.5258974,14.7948931 17.5265796,14.7962995 C18.1163241,15.439559 18.1711714,16.1562212 17.6002726,16.7110054 C15.4031129,19.0424704 14.1518875,20.3492617 13.8180896,20.6600723 C13.3301657,21.1143948 12.7463072,21.1143948 12.1743088,20.6535238 L7,15.6329213 L7,13.3164606 L7,10.4777222 L7.90085931,11.3651998 L7.90085931,13.2052772 L12.7465512,17.9098071 C12.9567262,18.0781744 13.070066,18.0781744 13.2269955,17.932052 C13.5380509,17.6424177 14.7939534,16.3307416 16.9803712,14.011314 C17.157882,13.838633 17.166344,13.7019382 16.8397179,13.3821106 L16.1616732,12.6157684 L16.7581584,11.9483032 C16.9087894,12.0956202 17.4966522,12.7346021 17.5265796,12.7962995 C18.1163241,13.439559 18.1711714,14.1562212 17.6002726,14.7110054 C17.5747717,14.738065 17.5493983,14.7649866 17.5241522,14.7917702 Z M16.9048605,15.4481535 C15.137152,17.3197783 14.1149097,18.383693 13.8180896,18.6600723 C13.3301657,19.1143948 12.7463072,19.1143948 12.1743088,18.6535238 L7.90085931,14.50702 L7.90085931,15.2052772 L12.7465512,19.9098071 C12.9567262,20.0781744 13.070066,20.0781744 13.2269955,19.932052 C13.5380509,19.6424177 14.7939534,18.3307416 16.9803712,16.011314 C17.1451562,15.8510126 17.1642619,15.7217226 16.9048605,15.4481535 Z M11.4901667,3.00063281 L17.3424072,9.44269003 C17.6458039,9.73868681 17.6459661,10.2175656 17.3424072,10.5138788 L13.3195662,14.657959 C13.0160073,14.9539558 12.5249944,14.9539558 12.2214355,14.657959 L6,8.35673477 L6.00016216,4.01043901 C6.00016216,3.45245899 6.46409478,3 7.03586215,3 L11.4901667,3.00063281 Z M7.0282724,6.07070945 C7.33150693,6.36686442 7.82316849,6.36686442 8.12640303,6.07070945 C8.42979972,5.77471267 8.42979972,5.29520106 8.12640303,4.9996789 C7.82333065,4.70384033 7.33150693,4.70384033 7.0282724,4.9998371 C6.72503786,5.29567567 6.72536218,5.77487088 7.0282724,6.07070945 Z"/> <script>alert(1)</script> </svg>`,
};

const InlineSvgPage = (props) => {
  const [activeExample, setActiveExample] = useState('noScripts');
  const [customSvgData, setCustomSvg] = useState('');
  return (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="s">
        <Text.Headline as="h2">Select the SVG to render:</Text.Headline>
        <RadioInput.Group
          onChange={(event) => {
            setActiveExample(event.target.value);
          }}
          value={activeExample}
        >
          <RadioInput.Option value="noScripts">
            <Spacings.Inline alignItems="center">
              SVG without scripts
            </Spacings.Inline>
          </RadioInput.Option>
          <RadioInput.Option value="withScript">
            <Spacings.Inline alignItems="center">
              {`SVG with embedded scripts (no "alert" expected to pop up)`}
            </Spacings.Inline>
          </RadioInput.Option>
          <RadioInput.Option value="custom">
            <Spacings.Inline alignItems="center">Custom SVG</Spacings.Inline>
          </RadioInput.Option>
          {activeExample === 'custom' && (
            <MultilineTextInput
              value={customSvgData}
              onChange={(event) => {
                setCustomSvg(event.target.value);
              }}
            />
          )}
        </RadioInput.Group>
      </Spacings.Stack>
      {inlineSvgType.map((svgType) => (
        <Spacings.Stack key={svgType}>
          <Text.Headline as="h2">
            <code>as: {svgType}</code>
          </Text.Headline>

          <Spacings.Stack scale="xs">
            {sizeValues.map((size) => (
              <Spacings.Stack key={size} scale="s">
                <Text.Body isBold>
                  <code>size: {size}</code>
                </Text.Body>
                <InlineSvg
                  as={svgType}
                  data={
                    activeExample === 'custom'
                      ? customSvgData
                      : svgExamples[activeExample]
                  }
                  size={size}
                />
              </Spacings.Stack>
            ))}
          </Spacings.Stack>
        </Spacings.Stack>
      ))}
    </Spacings.Stack>
  );
};

storiesOf('Components|Icons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('All Icons', () => (
    <IconList>
      {Object.values(icons).map((Icon, index) => {
        const sizeValue = select(
          'size',
          ['small', 'medium', 'big', 'scale'],
          'big'
        );
        const containerWidth =
          sizeValue === 'scale'
            ? {
                width: `${select(
                  'container width',
                  ['100', '200', '300', '400'],
                  '100'
                )}px`,
              }
            : {};
        return (
          <IconItem key={index}>
            <IconContainer style={containerWidth}>
              <Icon
                size={sizeValue}
                color={select(
                  'color',
                  [
                    'solid',
                    'neutral60',
                    'surface',
                    'info',
                    'primary',
                    'primary40',
                    'warning',
                    'error',
                  ],
                  'solid'
                )}
              />
            </IconContainer>
            <Text.Body>{iconNames[index]}</Text.Body>
          </IconItem>
        );
      })}
    </IconList>
  ))
  .add('Inline SVG', () => (
    <Section>
      <InlineSvgPage />
    </Section>
  ));
