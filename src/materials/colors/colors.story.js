import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import isVariation from '../../utils/is-variation';
import Text from '../../components/typography/text';
import colorGroups from './decisions/base-colors.json';
import styles from './colors-for-story.mod.css';

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  > * + * {
    margin: 16px 0 0;
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-row-gap: 8px;
  grid-column-gap: 8px;
  padding: 8px;
  max-width: 800px;
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
    font-family: 'Courier';
  }
`;

storiesOf('Colors', module).add('All Colors', () => (
  <Background>
    {Object.entries(colorGroups).map(([colorName, variations]) => (
      <React.Fragment key={`fragment-${colorName}`}>
        <ColorTitle key={`title-${colorName}`}>{`${colorName}s`}</ColorTitle>
        <ColorGrid key={`grid-${colorName}`}>
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
                  <Text.Body isBold={true}>
                    {isVariation(variation)
                      ? `--color-${colorName}-${variation}`
                      : `--color-${colorName}`}
                  </Text.Body>
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
