import type { Meta, StoryFn } from '@storybook/react';
import styled from '@emotion/styled';
import Grid from './grid';

const meta: Meta<typeof Grid> = {
  title: 'layout/Grid',
  component: Grid,
};
export default meta;

type Story = StoryFn<typeof Grid>;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
  padding: 16px;
`;

Placeholder.displayName = 'Placeholder';

/** Use `<Grid/>` & `<Grid.Item/>` to create layouts as simple or complex as you wish: */
export const BasicExample: Story = (args) => {
  return (
    <Grid {...args}>
      <Grid.Item>
        <Placeholder>1</Placeholder>
      </Grid.Item>
      <Grid.Item>
        <Placeholder>2</Placeholder>
      </Grid.Item>
      <Grid.Item>
        <Placeholder>3</Placeholder>
      </Grid.Item>
      <Grid.Item>
        <Placeholder>4</Placeholder>
      </Grid.Item>
      <Grid.Item>
        <Placeholder>5</Placeholder>
      </Grid.Item>
      <Grid.Item>
        <Placeholder>6</Placeholder>
      </Grid.Item>
      <Grid.Item>
        <Placeholder>7</Placeholder>
      </Grid.Item>
      <Grid.Item>
        <Placeholder>8</Placeholder>
      </Grid.Item>
    </Grid>
  );
};

BasicExample.args = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(192px, 1fr))',
  gridGap: '16px',
};

/** The classic [Holy grail layout](https://en.wikipedia.org/wiki/Holy_grail_(web_design)) is easy to achieve and best of all,
 * source order independent:
 */
export const HolyGrailLayout: Story = (args) => {
  return (
    <Grid {...args}>
      <Grid.Item gridArea="nav">
        <Placeholder>nav</Placeholder>
      </Grid.Item>
      <Grid.Item gridArea="header">
        <Placeholder>Header</Placeholder>
      </Grid.Item>
      <Grid.Item gridArea="content">
        <Placeholder>content</Placeholder>
      </Grid.Item>
      <Grid.Item gridArea="side">
        <Placeholder>side</Placeholder>
      </Grid.Item>
      <Grid.Item gridArea="footer">
        <Placeholder>footer</Placeholder>
      </Grid.Item>
    </Grid>
  );
};

HolyGrailLayout.args = {
  gridTemplateAreas: `'header header header'
    'nav content side'
    'footer footer footer'`,
  gridGap: '16px',
};

/** Always display 3 items in one row, size columns equally: */
export const FixedNumberOfColumns = BasicExample.bind(this);

FixedNumberOfColumns.args = {
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '16px',
};

/**
 * 1 fixed column with `100px` width and 2 flexible columns,
 * whereas the first flexible columns uses one fraction (`1fr`), the second 2 fractions (`2fr`) of the available leftover space:
 * */
export const ColumnsWithFixedAndFlexibleSizes = BasicExample.bind({});

ColumnsWithFixedAndFlexibleSizes.args = {
  gridTemplateColumns: '100px 1fr 2fr',
  gridGap: '16px',
};

/** Auto-fit with minimum `200px` and maximum `1fr`: */
export const ResponsiveColumnsWithMinimumAndMaximumSizes = BasicExample.bind(
  {}
);

ResponsiveColumnsWithMinimumAndMaximumSizes.args = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gridGap: '16px',
};
