/* eslint-disable react/prop-types */
import { css } from '@emotion/react';
import Card from '@commercetools-uikit/card';
import Text from '@commercetools-uikit/text';
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
  >
    <Text.Body>{props.children}</Text.Body>
  </Card>
);

export const component = () => (
  <Suite>
    <Spec label="Type - Raised, Theme - Light, InsetScale - None">
      <WrappedCard type="raised" theme="light" insetScale="none">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Dark, InsetScale - None">
      <WrappedCard type="raised" theme="dark" insetScale="none">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Light, InsetScale - None">
      <WrappedCard type="flat" theme="light" insetScale="none">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Dark, InsetScale - None">
      <WrappedCard type="flat" theme="dark" insetScale="none">
        {text}
      </WrappedCard>
    </Spec>

    <Spec label="Type - Raised, Theme - Light, InsetScale - S">
      <WrappedCard type="raised" theme="light" insetScale="s">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Dark, InsetScale - S">
      <WrappedCard type="raised" theme="dark" insetScale="s">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Light, InsetScale - S">
      <WrappedCard type="flat" theme="light" insetScale="s">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Dark, InsetScale - S">
      <WrappedCard type="flat" theme="dark" insetScale="s">
        {text}
      </WrappedCard>
    </Spec>

    <Spec label="Type - Raised, Theme - Light, InsetScale - M">
      <WrappedCard type="raised" theme="light" insetScale="m">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Dark, InsetScale - M">
      <WrappedCard type="raised" theme="dark" insetScale="m">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Light, InsetScale - M">
      <WrappedCard type="flat" theme="light" insetScale="m">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Flat, Theme - Dark, InsetScale - M">
      <WrappedCard type="flat" theme="dark" insetScale="m">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Light, InsetScale - L">
      <WrappedCard type="raised" theme="light" insetScale="l">
        {text}
      </WrappedCard>
    </Spec>
    <Spec label="Type - Raised, Theme - Light, InsetScale - XL">
      <WrappedCard type="raised" theme="light" insetScale="xl">
        {text}
      </WrappedCard>
    </Spec>
  </Suite>
);
