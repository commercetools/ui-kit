import React from 'react';
import styled from '@emotion/styled';
import { Constraints } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const GreenBox = styled.div`
  width: 100%;
  height: 20px;
  background-color: green;
`;

screenshot('Constraints.Horizontal', () => (
  <Suite>
    <Spec label='when constraints is "xs"'>
      <Constraints.Horizontal constraint="xs">
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label='when constraints is "s"'>
      <Constraints.Horizontal constraint="s">
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label='when constraints is "m"'>
      <Constraints.Horizontal constraint="m">
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label='when constraints is "l"'>
      <Constraints.Horizontal constraint="l">
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label='when constraints is "xl"'>
      <Constraints.Horizontal constraint="xl">
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
    <Spec label='when constraints is "scale"'>
      <Constraints.Horizontal constraint="scale">
        <GreenBox />
      </Constraints.Horizontal>
    </Spec>
  </Suite>
));
