import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import LinkTo from '@storybook/addon-links/react';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

import Grid from './grid';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  tags: ['autodocs'],
  args: {
    display: 'grid',
    children: '',
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
  padding: 16px;
`;

const renderGridElements = () => {
  return Array.from({ length: 6 }).map((_, index) => (
    <Grid.Item key={index}>
      <Placeholder>{index + 1}</Placeholder>
    </Grid.Item>
  ));
};

export const Default: Story = {
  render: (args) => (
    <Spacings.Stack scale="m">
      <Spacings.Stack scale="s">
        <Text.Body isItalic={true} tone="secondary">
          <a
            href="https://css-tricks.com/snippets/css/complete-guide-grid"
            target="_blank"
            rel="noreferrer"
          >
            {'CSS Grid Layout'}
          </a>
          {
            ' is the most powerful layout system available in CSS. It is a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a 1-dimensional system. You work with Grid Layout by applying CSS rules both to a parent element (which becomes the Grid Container) and to that elements children (which become Grid Items).'
          }
        </Text.Body>
        <Text.Headline as="h3">{'Getting started'}</Text.Headline>
        <Text.Body>
          {
            'In the Knobs section on the right panel, you can see all the supported CSS Grid properties, both for the parent container and for the children elements (items).'
          }
        </Text.Body>
        <LinkTo kind="Components/Grid" story="with-fixed-columns">
          <Text.Body tone="primary">
            {'Check out the Grid examples to build some basic grid layouts!'}
          </Text.Body>
        </LinkTo>
      </Spacings.Stack>
      <Grid {...args}>{renderGridElements()}</Grid>
    </Spacings.Stack>
  ),
};

export const WithFixedColumns: Story = {
  render() {
    return (
      <Spacings.Stack scale="l">
        <Text.Body tone="information">
          {'💁 Try resizing the window to see how the grid layout behaves.'}
        </Text.Body>
        <Grid
          gridGap="16px"
          gridAutoColumns="1fr"
          gridTemplateColumns="repeat(3, 1fr)"
        >
          {renderGridElements()}
        </Grid>
      </Spacings.Stack>
    );
  },
};

export const WithAutoSizingColumns: Story = {
  render() {
    return (
      <Spacings.Stack scale="l">
        <Text.Body tone="information">
          {'💁 Try resizing the window to see how the grid layout behaves.'}
        </Text.Body>
        <Grid
          gridGap="16px"
          gridAutoColumns="1fr"
          gridTemplateColumns={`repeat(auto-fill, minmax(150px, 1fr))`}
        >
          {renderGridElements()}
        </Grid>
      </Spacings.Stack>
    );
  },
};
