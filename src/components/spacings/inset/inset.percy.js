import React from 'react';
import styled from '@emotion/styled';
import { Spacings, Text } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const View = styled.div`
  display: flex;
`;

const InsetColorWrapper = styled.div`
  display: inline-block;
  background-color: #ff5b5b;
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  > * {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
  }
`;

const Square = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  text-align: center;
`;

const sizes = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
];

screenshot('Inset', () => (
  <Suite>
    <Spec label="Inset">
      <View>
        <Spacings.Inline scale="s">
          {sizes.map(size => (
            <InsetColorWrapper key={size.name}>
              <Spacings.Inset scale={size.name}>
                <Square>
                  <Text.Subheadline elementType="h4">
                    {size.name.toUpperCase()}
                    <Text.Detail>{size.pixels}</Text.Detail>
                  </Text.Subheadline>
                </Square>
              </Spacings.Inset>
            </InsetColorWrapper>
          ))}
        </Spacings.Inline>
      </View>
    </Spec>
  </Suite>
));
