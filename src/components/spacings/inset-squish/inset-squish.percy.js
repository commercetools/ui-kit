import React from 'react';
import styled from '@emotion/styled';
import { Spacings, Text } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const View = styled.div`
  display: flex;
`;

const InsetColorWrapper = styled.div`
  background-color: #ffb15c;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 4px;
  > * {
    flex-grow: 1;
    display: flex;
    align-items: stretch;
  }
`;

const Button = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  text-align: center;
`;

const sizes = [
  { name: 's', pixels: '4px x 8px' },
  { name: 'm', pixels: '8px x 16px' },
  { name: 'l', pixels: '16px x 32px' },
];

screenshot('InsetSquish', () => (
  <Suite>
    <Spec label="InsetSquish">
      <View>
        <Spacings.Inline scale="s" alignItems="center">
          {sizes.map(size => (
            <InsetColorWrapper key={size.name}>
              <Spacings.InsetSquish scale={size.name}>
                <Button>
                  <Text.Subheadline elementType="h4">
                    {size.name.toUpperCase()}
                    <Text.Detail>{size.pixels}</Text.Detail>
                  </Text.Subheadline>
                </Button>
              </Spacings.InsetSquish>
            </InsetColorWrapper>
          ))}
        </Spacings.Inline>
      </View>
    </Spec>
  </Suite>
));
