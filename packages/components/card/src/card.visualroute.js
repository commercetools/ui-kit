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
    <Spec label="Type - Raised, Theme - Light, InsetSpace - M">
      <WrappedCard>{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Dark, InsetSpace - M">
      <WrappedCard theme="dark">{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Light, InsetSpace - M">
      <WrappedCard type="flat">{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Light, InsetSpace - S">
      <WrappedCard insetSpace="s">{text}</WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Dark, InsetSpace - S">
      <WrappedCard theme="dark" insetSpace="s">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Light, InsetSpace - S">
      <WrappedCard type="flat" insetSpace="s">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Dark, InsetSpace - M">
      <WrappedCard type="flat" theme="dark">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Dark, InsetSpace - S">
      <WrappedCard type="flat" theme="dark" insetSpace="s">
        {text}
      </WrappedCard>
    </Spec>
  </Suite>
);
