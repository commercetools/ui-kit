import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Spacings, Text } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const Stack = styled.div`
  > * + * {
    margin: 8px 0 0;
  }
`;

const Row = styled.div`
  display: block;
`;

const InlineColorWrapper = styled.div`
  background-color: #e1ffdd;
  display: inline-flex;
  align-items: stretch;
  height: 100px;
`;

const InlineItem = styled.div`
  background-color: #65ff4f;
  height: ${props =>
    props.alignItems === 'stretch'
      ? 'auto'
      : `${Math.round(Math.random() * 50) + 50}px`};
  width: 100px;
`;

const Scale = styled.div`
  align-self: center;
  width: 75px;
  text-align: center;
`;

const sizes = [
  { name: 'xs', pixels: '4px' },
  { name: 's', pixels: '8px' },
  { name: 'm', pixels: '16px' },
  { name: 'l', pixels: '24px' },
  { name: 'xl', pixels: '32px' },
];

const InlineExample = ({ alignItems }) => (
  <Stack>
    {sizes.map(size => (
      <Row key={size.name}>
        <InlineColorWrapper>
          <Scale>
            <Spacings.Inset scale="s" alignItems="center">
              <Text.Subheadline elementType="h4">
                {size.name.toUpperCase()}
                <Text.Detail>{size.pixels}</Text.Detail>
              </Text.Subheadline>
            </Spacings.Inset>
          </Scale>
          <Spacings.Inline scale={size.name} alignItems={alignItems}>
            <InlineItem alignItems={alignItems} />
            <InlineItem alignItems={alignItems} />
            <InlineItem alignItems={alignItems} />
            <InlineItem alignItems={alignItems} />
            <InlineItem alignItems={alignItems} />
          </Spacings.Inline>
        </InlineColorWrapper>
      </Row>
    ))}
  </Stack>
);

InlineExample.displayName = 'InlineExample';
InlineExample.propTypes = {
  alignItems: PropTypes.oneOf(['stretch', 'flexStart', 'flexEnd', 'center']),
};

screenshot('Inline', () => (
  <Suite>
    <Spec label="when alignItems is flexStart ">
      <InlineExample alignItems="flexStart" />
    </Spec>
    <Spec label="when alignItems is stretch ">
      <InlineExample alignItems="stretch" />
    </Spec>
    <Spec label="when alignItems is flexEnd ">
      <InlineExample alignItems="flexEnd" />
    </Spec>
    <Spec label="when alignItems is center ">
      <InlineExample alignItems="center" />
    </Spec>
  </Suite>
));
