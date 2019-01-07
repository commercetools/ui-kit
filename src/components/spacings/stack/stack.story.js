import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import styled from '@emotion/styled';
import { Text } from '../../../index';
import Inline from '../inline';
import Inset from '../inset';
import Stack from './stack';
import Readme from './README.md';

const StackColorWrapper = styled.div`
  background-color: #d4e0ec;
  width: 100px;
  text-align: center;
`;

const StackItem = styled.div`
  background-color: #2d68a0;
  height: 100px;
  width: ${props =>
    props.alignItems === 'stretch'
      ? 'auto'
      : `${Math.round(Math.random() * 50) + 50}px`};
`;

const sizes = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
];

storiesOf('Components|Spacings', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Stack', () => {
    const alignItems = select(
      'Align items',
      ['flexStart', 'center', 'flexEnd', 'stretch'],
      'stretch'
    );
    return (
      <Inline scale="s">
        {sizes.map(size => (
          <StackColorWrapper key={size.name}>
            <Inset scale="m">
              <Text.Subheadline elementType="h4">
                {size.name.toUpperCase()}
                <Text.Detail>{size.pixels}</Text.Detail>
              </Text.Subheadline>
            </Inset>
            <Stack scale={size.name} alignItems={alignItems}>
              <StackItem alignItems={alignItems} />
              <StackItem alignItems={alignItems} />
              <StackItem alignItems={alignItems} />
              <StackItem alignItems={alignItems} />
              <StackItem alignItems={alignItems} />
            </Stack>
          </StackColorWrapper>
        ))}
      </Inline>
    );
  });
