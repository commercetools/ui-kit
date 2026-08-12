import type { ComponentProps } from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { css } from '@emotion/react';
import Text from '@commercetools-uikit/text';

import Card from './card';
import { VisualSpec } from '@/storybook-helpers';
import { BrowserRouter as Router } from 'react-router-dom';

type CardProps = ComponentProps<typeof Card>;

const meta: Meta<CardProps> = {
  title: 'components/Card',
  component: Card,
  argTypes: {
    to: {
      control: 'text',
    },
  },
};

export default meta;

export const BasicExample: StoryFn<CardProps> = (args) => {
  return (
    <Router>
      <Card {...args} />
    </Router>
  );
};

BasicExample.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  onClick: undefined,
};

const text = `
  Malis mundi eripuit eam ex, ubique admodum duo at.
  Suas verterem accusata eos cu, ius cu quodsi officiis accusata,
  illud soluta utamur ne vim. Nihil ornatus ad duo, ius cu nibh neglegentur.
`;

const WrappedCard = (props: CardProps & { height?: string }) => (
  <Card
    css={css`
      margin: 16px;
      width: 300px;
      height: ${props.height || 'auto'};
    `}
    {...props}
  >
    {props.children}
  </Card>
);

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  render: () => (
    <>
      <VisualSpec label="Type - Raised, Theme - Light, InsetScale - None">
        <WrappedCard type="raised" theme="light" insetScale="none">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Raised, Theme - Dark, InsetScale - None">
        <WrappedCard type="raised" theme="dark" insetScale="none">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Flat, Theme - Light, InsetScale - None">
        <WrappedCard type="flat" theme="light" insetScale="none">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Flat, Theme - Dark, InsetScale - None">
        <WrappedCard type="flat" theme="dark" insetScale="none">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>

      <VisualSpec label="Type - Raised, Theme - Light, InsetScale - S">
        <WrappedCard type="raised" theme="light" insetScale="s">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Raised, Theme - Dark, InsetScale - S">
        <WrappedCard type="raised" theme="dark" insetScale="s">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Flat, Theme - Light, InsetScale - S">
        <WrappedCard type="flat" theme="light" insetScale="s">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Flat, Theme - Dark, InsetScale - S">
        <WrappedCard type="flat" theme="dark" insetScale="s">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>

      <VisualSpec label="Type - Raised, Theme - Light, InsetScale - M">
        <WrappedCard type="raised" theme="light" insetScale="m">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Raised, Theme - Dark, InsetScale - M">
        <WrappedCard type="raised" theme="dark" insetScale="m">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Flat, Theme - Light, InsetScale - M">
        <WrappedCard type="flat" theme="light" insetScale="m">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Flat, Theme - Dark, InsetScale - M">
        <WrappedCard type="flat" theme="dark" insetScale="m">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Raised, Theme - Light, InsetScale - L">
        <WrappedCard type="raised" theme="light" insetScale="l">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Raised, Theme - Light, InsetScale - XL">
        <WrappedCard type="raised" theme="light" insetScale="xl">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>

      <VisualSpec label="Type - Flat, Theme - Dark, Disabled: true">
        <WrappedCard
          type="flat"
          theme="dark"
          insetScale="s"
          isDisabled
          to="http://www.commercetools.com"
        >
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Flat, Theme - Light, Disabled: true">
        <WrappedCard
          type="flat"
          theme="light"
          insetScale="s"
          isDisabled
          to="http://www.commercetools.com"
        >
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Raised, Theme - Dark, Disabled: false">
        <WrappedCard type="raised" theme="dark" insetScale="s">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>
      <VisualSpec label="Type - Raised, Theme - Light, Disabled: false">
        <WrappedCard type="raised" theme="light" insetScale="s">
          <Text.Body>{text}</Text.Body>
        </WrappedCard>
      </VisualSpec>

      <VisualSpec label="Content using all vertical space from the parent">
        <WrappedCard type="raised" theme="light" insetScale="m" height="400px">
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
            `}
          >
            <div>{text}</div>
            <div>{text}</div>
          </div>
        </WrappedCard>
      </VisualSpec>
    </>
  ),
};
