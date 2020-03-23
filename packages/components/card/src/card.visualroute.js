import React from 'react';
import { css } from '@emotion/core';
import { Card } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/card';

const text = `
  Malis mundi eripuit eam ex, ubique admodum duo at.
  Suas verterem accusata eos cu, ius cu quodsi officiis accusata,
  illud soluta utamur ne vim. Nihil ornatus ad duo, ius cu nibh neglegentur.
`;

const WrappedCard = (props) => (
  <Card
    css={css`
      margin: 16px;
      width: 300px;
    `}
    {...props}
  />
);

export const component = () => (
  <Suite>
    <Spec label="Type - Raised, Theme - Light">
      <WrappedCard>{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Dark">
      <WrappedCard theme="dark">{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Light">
      <WrappedCard type="flat">{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Flat - Theme - Dark">
      <WrappedCard type="flat" theme="dark">
        {text}
      </WrappedCard>
    </Spec>
  </Suite>
);
