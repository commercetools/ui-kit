import React from 'react';
import styled from '@emotion/styled';
import { Constraints } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const GreenBox = styled.div`
  width: 100%;
  height: 20px;
  background-color: green;
`;

export const routePath = '/constraints-horizontal';

export const component = () => (
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
);
