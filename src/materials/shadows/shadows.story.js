import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { flatMap } from 'lodash';
import Text from '../../components/typography/text';
import shadowGroups from './decisions/base-shadows.json';

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  > * + * {
    margin: 16px 0 0;
  }
  padding: 16px;
`;

const ShadowTitle = styled.div`
  display: flex;
  padding: 8px;
  flex-grow: 1;
  font-size: 1.5em;
  text-transform: capitalize;
  margin-bottom: 16px;
`;

const ShadowSample = styled.div`
  box-shadow: ${props => props.shadow};
  width: 50px;
  height: 50px;
  background-color: white;
`;

const ShadowBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  transition: all 0.2s ease;
  left: 0;
  padding: 8px;
`;

const ShadowContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  height: 100px;
`;

const HiddenShadowContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  position: relative;
  height: 0;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
`;

const ShadowDescription = styled.div`
  word-break: break-all;
  padding: 8px;
`;

const Detail = styled.div`
  > small {
    color: rgba(0, 0, 0, 0.4);
    font-family: Courier;
  }
`;

const Wrapper = styled.div`
  border-bottom: 1px #ccc solid;
  ${HiddenShadowContainer} {
    ${ShadowBox} {
      opacity: 0;
      visibility: hidden;
    }
  }
  &:hover ${HiddenShadowContainer} {
    height: 100px;
  }
  &:hover ${ShadowBox} {
    opacity: 1;
    visibility: visible;
  }
`;

const variablePrefix = '--shadow';

const getAllShadowsValues = ordinals =>
  // eslint-disable-next-line no-unused-vars
  flatMap(ordinals, ([ordinal, value]) => value);

const getAllShadowsNames = (ordinals, shadowGroup) => {
  const shadowNames = flatMap(
    ordinals,
    ([ordinal]) => `${variablePrefix}-${shadowGroup}-${ordinal}`
  );

  return shadowNames.join(' + ');
};

storiesOf('Shadows', module).add('All Shadows', () => (
  <Background>
    {Object.entries(shadowGroups).map(([shadowGroup, ordinals]) => (
      <Wrapper key={shadowGroup}>
        <ShadowTitle>Shadow {shadowGroup}</ShadowTitle>
        <ShadowContainer>
          <ShadowBox key={shadowGroup}>
            <ShadowSample
              shadow={getAllShadowsValues(Object.entries(ordinals)).toString()}
            />
            <ShadowDescription>
              <Text.Body isBold={true}>
                {getAllShadowsNames(Object.entries(ordinals), shadowGroup)}
              </Text.Body>
            </ShadowDescription>
          </ShadowBox>
        </ShadowContainer>
        <HiddenShadowContainer key={`grid-${shadowGroup}`}>
          {Object.entries(ordinals).map(([order, value]) => (
            <ShadowBox key={order}>
              <ShadowSample shadow={`${value}`} />
              <ShadowDescription>
                <Text.Body isBold={true}>
                  {`${variablePrefix}-${shadowGroup}-${order}`}
                </Text.Body>
                <Detail>
                  <Text.Detail>{`${value}`}</Text.Detail>
                </Detail>
              </ShadowDescription>
            </ShadowBox>
          ))}
        </HiddenShadowContainer>
      </Wrapper>
    ))}
  </Background>
));
