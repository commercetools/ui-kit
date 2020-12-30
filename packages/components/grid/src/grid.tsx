import React, { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

type GridItemProps = {
  children?: ReactNode;
  // List based on https://css-tricks.com/snippets/css/complete-guide-grid
  gridArea?: string;
  gridColumn?: string;
  gridColumnStart?: string;
  gridColumnEnd?: string;
  gridRow?: string;
  gridRowStart?: string;
  gridRowEnd?: string;
  justifySelf?: 'start' | 'end' | 'center' | 'stretch';
  alignSelf?: 'start' | 'end' | 'center' | 'stretch';
  placeSelf?: 'start' | 'end' | 'center' | 'stretch';
};
type GridProps = {
  children: ReactNode;
  // List based on https://css-tricks.com/snippets/css/complete-guide-grid
  display?: 'grid' | 'inline-grid';
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  gridTemplate?: string;
  gridColumnGap?: string;
  gridRowGap?: string;
  gridGap?: string;
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  placeItems?: 'start' | 'end' | 'center' | 'stretch';
  justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  alignContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  placeContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  gridAutoColumns?: string;
  gridAutoRows?: string;
  gridAutoFlow?: string;
  grid?: string;
};
type GridStaticProps = {
  Item: FC<GridItemProps>;
};

const GridItem = styled.div<GridItemProps>((props) => ({
  gridArea: props.gridArea,
  gridColumn: props.gridColumn,
  gridColumnStart: props.gridColumnStart,
  gridColumnEnd: props.gridColumnEnd,
  gridRow: props.gridRow,
  gridRowStart: props.gridRowStart,
  gridRowEnd: props.gridRowEnd,
  justifySelf: props.justifySelf,
  alignSelf: props.alignSelf,
  placeSelf: props.placeSelf,
}));
GridItem.displayName = 'GridItem';

const GridContainer = styled.div<GridProps>((props) => ({
  display: props.display,
  grid: props.grid,
  gridTemplate: props.gridTemplate,
  gridTemplateColumns: props.gridTemplateColumns,
  gridTemplateRows: props.gridTemplateRows,
  gridTemplateAreas: props.gridTemplateAreas,
  gridGap: props.gridGap,
  gridColumnGap: props.gridColumnGap,
  gridRowGap: props.gridRowGap,
  justifyItems: props.justifyItems,
  alignItems: props.alignItems,
  placeItems: props.placeItems,
  justifyContent: props.justifyContent,
  alignContent: props.alignContent,
  placeContent: props.placeContent,
  gridAutoColumns: props.gridAutoColumns,
  gridAutoRows: props.gridAutoRows,
  gridAutoFlow: props.gridAutoFlow,
}));
const Grid: FC<GridProps> & GridStaticProps = (props) => (
  <GridContainer {...props} />
);
Grid.displayName = 'Grid';
Grid.defaultProps = {
  display: 'grid',
};
// Assign GridItem as a static property of Grid
Grid.Item = GridItem;

export default Grid;
