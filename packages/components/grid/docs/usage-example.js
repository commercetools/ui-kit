import Grid from '@commercetools-uikit/grid';

/**
 * We also recommend having a look at the [Grid story examples](https://uikit.commercetools.com/?path=/story/examples-components-grid--with-fixed-columns)
 * to see more detailed examples of common use cases of the CSS Grid layout.
 **/
const Example = () => (
  <Grid
    gridGap="16px"
    gridAutoColumns="1fr"
    gridTemplateColumns="repeat(3, 1fr)"
  >
    <Grid.Item>{'1'}</Grid.Item>
    <Grid.Item>{'2'}</Grid.Item>
    <Grid.Item>{'3'}</Grid.Item>
    <Grid.Item>{'4'}</Grid.Item>
    <Grid.Item>{'5'}</Grid.Item>
  </Grid>
);

export default Example;
