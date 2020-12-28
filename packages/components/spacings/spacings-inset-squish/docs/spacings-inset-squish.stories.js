import React from 'react';
import styled from '@emotion/styled';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsInset from '@commercetools-uikit/spacings-inset';
import Text from '@commercetools-uikit/text';
import SpacingsInsetSquish from '../src';

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

export default {
  title: 'Components/Spacings/SpacingsInsetSquish',
  component: SpacingsInsetSquish,
};

const Template = () => (
  <View>
    <SpacingsInset scale="m">
      <SpacingsInline scale="s" alignItems="center">
        {sizes.map((size) => (
          <InsetColorWrapper key={size.name}>
            <SpacingsInsetSquish scale={size.name}>
              <Button>
                <Text.Subheadline as="h4">
                  {size.name.toUpperCase()}
                  <Text.Detail>{size.pixels}</Text.Detail>
                </Text.Subheadline>
              </Button>
            </SpacingsInsetSquish>
          </InsetColorWrapper>
        ))}
      </SpacingsInline>
    </SpacingsInset>
  </View>
);

export const Default = Template.bind({});
Default.args = {};
