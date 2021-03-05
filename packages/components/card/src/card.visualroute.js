import React from 'react';
import { css } from '@emotion/react';
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
    <Spec label="Type - Raised, Theme - Light, Padding - M">
      <WrappedCard>{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Dark, Padding - M">
      <WrappedCard theme="dark">{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Light, Padding - M">
      <WrappedCard type="flat">{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Light, Padding - S">
      <WrappedCard padding="s">{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Dark, Padding - S">
      <WrappedCard theme="dark" padding="s">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Light, Padding - S">
      <WrappedCard type="flat" padding="s">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Dark, Padding - M">
      <WrappedCard type="flat" theme="dark">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Dark, Padding - S">
      <WrappedCard type="flat" theme="dark" padding="s">
        {text}
      </WrappedCard>
    </Spec>
  </Suite>
);
