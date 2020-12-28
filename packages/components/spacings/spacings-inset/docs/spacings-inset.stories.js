import React from 'react';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import Text from '@commercetools-uikit/text';
import SpacingsInset from '../src';

const View = styled.div`
  display: flex;
`;

const InsetColorWrapper = styled.div`
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

export default {
  title: 'Components/Spacings/SpacingsInset',
  component: SpacingsInset,
};

const Template = () => (
  <View>
    <SpacingsInset scale="m">
      <SpacingsInline scale="s">
        {sizes.map((size) => (
          <InsetColorWrapper key={size.name}>
            <SpacingsInset scale={size.name}>
              <Square>
                <Text.Subheadline as="h4">
                  {size.name.toUpperCase()}
                  <Text.Detail>{size.pixels}</Text.Detail>
                </Text.Subheadline>
              </Square>
            </SpacingsInset>
          </InsetColorWrapper>
        ))}
      </SpacingsInline>
    </SpacingsInset>
  </View>
);

export const Default = Template.bind({});
Default.args = {};
