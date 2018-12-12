import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Spacings, Text } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

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

const StackExample = ({ alignItems }) => (
  <Spacings.Inline scale="s">
    {sizes.map(size => (
      <StackColorWrapper key={size.name}>
        <Spacings.Inset scale="m">
          <Text.Subheadline elementType="h4">
            {size.name.toUpperCase()}
            <Text.Detail>{size.pixels}</Text.Detail>
          </Text.Subheadline>
        </Spacings.Inset>
        <Spacings.Stack scale={size.name} alignItems={alignItems}>
          <StackItem alignItems={alignItems} />
          <StackItem alignItems={alignItems} />
          <StackItem alignItems={alignItems} />
          <StackItem alignItems={alignItems} />
          <StackItem alignItems={alignItems} />
        </Spacings.Stack>
      </StackColorWrapper>
    ))}
  </Spacings.Inline>
);

StackExample.displayName = 'StackExample';
StackExample.propTypes = {
  alignItems: PropTypes.oneOf(['stretch', 'flexStart', 'flexEnd', 'center']),
};

screenshot('Stack', () => (
  <Suite>
    <Spec label="when alignItems is flexStart ">
      <StackExample alignItems="flexStart" />
    </Spec>
    <Spec label="when alignItems is stretch ">
      <StackExample alignItems="stretch" />
    </Spec>
    <Spec label="when alignItems is flexEnd ">
      <StackExample alignItems="flexEnd" />
    </Spec>
    <Spec label="when alignItems is center ">
      <StackExample alignItems="center" />
    </Spec>
  </Suite>
));
