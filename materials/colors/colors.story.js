import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Text from '../../typography/text';
import colorGroups from './decisions/base-colors.json';
import { isVariation } from '../../scripts/utility.js'
import styles from './colors-for-story.mod.css';

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

const ColorTitle = styled.div`
  display: flex;
  padding: 8px;
  flex-grow: 1;
  font-size: 1.5em;
  text-transform: capitalize;
`;

const ColorSample = styled.div`
  width: 100%;
  height: 150px;
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
    {Object.entries(colorGroups).map(([colorName, variations], index) => (
      <React.Fragment>
        <ColorTitle>{`${colorName}s`}</ColorTitle>
        <ColorGrid key={index}>
          {Object.keys(variations)
            .reverse()
            .map((variation, variationIndex) => (
              <ColorBox key={`${variation}-${variationIndex}`}>
                <ColorSample
                  className={
                    styles[
                      isVariation(variation)
                        ? `${colorName}-${variation}`
                        : `${colorName}`
                    ]
                  }
                  variation={`${colorName}`}
                />
                <ColorDescription>
                  <Text.Subheadline elementType="h4">
                    {isVariation(variation)
                      ? `--color-${colorName}-${variation}`
                      : `--color-${colorName}`}
                  </Text.Subheadline>
                  <FileName>
                    <Text.Detail>
                      {isVariation(variation) ? `${variation}%` : `Main`}
                    </Text.Detail>
                  </FileName>
                </ColorDescription>
              </ColorBox>
              ))}
          </ColorGrid>
        </React.Fragment>
    ))}
  </Background>
));
