import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Text from '../../typography/text';
import colorGroups from './colors-for-story.json';

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  > * + * {
    margin: 16px 0 0;
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 8px;
  grid-column-gap: 8px;
  padding: 8px;
  max-width: 800px;
  margin: 0 auto;
`;

const ColorSample = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${props => props.color};
`;

const ColorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const ColorDescription = styled.div`
  word-break: break-all;
  padding: 8px;
`;

const FileName = styled.div`
  > small {
    color: rgba(0, 0, 0, 0.4);
    font-family: Courier;
  }
`;

storiesOf('Colors', module).add('All Colors', () => (
  <Background>
    {colorGroups.map((colorGroup, index) => (
      <ColorGrid key={index}>
        {colorGroup.map(color => (
          <ColorBox key={color.key}>
            <ColorSample color={color.value} />
            <ColorDescription>
              <Text.Subheadline elementType="h4">{color.name}</Text.Subheadline>
              <FileName>
                <Text.Detail>{color.value}</Text.Detail>
              </FileName>
            </ColorDescription>
          </ColorBox>
        ))}
      </ColorGrid>
    ))}
  </Background>
));
