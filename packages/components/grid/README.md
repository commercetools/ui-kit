# Grid

## Description

The Grid component can be used to implement layouts using CSS-Grid.

> [CSS Grid Layout](https://css-tricks.com/snippets/css/complete-guide-grid) is the most powerful layout system available in CSS. It is a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a 1-dimensional system. You work with Grid Layout by applying CSS rules both to a parent element (which becomes the Grid Container) and to that elements children (which become Grid Items).

The component accepts all the supported properties of CSS Grid, both for the parent container and the children elements (`<Grid.Item>`).

## Usage

> We recommend having a look at the [`grid.example.story.js`](./grid.example.story.js) to see some simple usages of the CSS Grid layout.

```js
import Grid from '@commercetools-uikit/grid';

<Grid gridGap="16px" gridAutoColumns="1fr" gridTemplateColumns="repeat(3, 1fr)">
  <Grid.Item>{'1'}</Grid.Item>
  <Grid.Item>{'2'}</Grid.Item>
  <Grid.Item>{'3'}</Grid.Item>
  <Grid.Item>{'4'}</Grid.Item>
  <Grid.Item>{'5'}</Grid.Item>
</Grid>;
```

## Properties

| Props      | Type     | Required | Values | Default | Description                                 |
| ---------- | -------- | :------: | ------ | ------- | ------------------------------------------- |
| `children` | `node`   |    ✅    | -      | -       | The elements to be rendered inside the grid |
| `data-*`   | `string` |    -     | -      | -       | Data attributes                             |

> The component accepts all supported CSS Grid properties, [as listed here](https://css-tricks.com/snippets/css/complete-guide-grid), in **camelCase** format.
