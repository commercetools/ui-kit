import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const GridItem = styled.div(props => ({
  gridColumnStart: props.gridColumnStart,
  gridColumnEnd: props.gridColumnEnd,
  gridRowStart: props.gridRowStart,
  gridRowEnd: props.gridRowEnd,
  gridColumn: props.gridColumn,
  gridRow: props.gridRow,
  gridArea: props.gridArea,
  justifySelf: props.justifySelf,
  alignSelf: props.alignSelf,
  placeSelf: props.placeSelf,
}));
GridItem.displayName = 'GridItem';
GridItem.propTypes = {
  children: PropTypes.node,
  // List based on https://css-tricks.com/snippets/css/complete-guide-grid
  gridColumnStart: PropTypes.string,
  gridColumnEnd: PropTypes.string,
  gridRowStart: PropTypes.string,
  gridRowEnd: PropTypes.string,
  gridColumn: PropTypes.string,
  gridRow: PropTypes.string,
  gridArea: PropTypes.string,
  justifySelf: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  alignSelf: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  placeSelf: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
};

const Grid = styled.div(props => ({
  display: props.display,
  gridTemplateColumns: props.gridTemplateColumns,
  gridTemplateRows: props.gridTemplateRows,
  gridTemplateAreas: props.gridTemplateAreas,
  gridTemplate: props.gridTemplate,
  gridColumnGap: props.gridColumnGap,
  gridRowGap: props.gridRowGap,
  gridGap: props.gridGap,
  justifyItems: props.justifyItems,
  alignItems: props.alignItems,
  placeItems: props.placeItems,
  justifyContent: props.justifyContent,
  alignContent: props.alignContent,
  placeContent: props.placeContent,
  gridAutoColumns: props.gridAutoColumns,
  gridAutoRows: props.gridAutoRows,
  gridAutoFlow: props.gridAutoFlow,
  grid: props.grid,
}));
Grid.displayName = 'Grid';
Grid.propTypes = {
  children: PropTypes.node.isRequired,
  // List based on https://css-tricks.com/snippets/css/complete-guide-grid
  display: PropTypes.oneOf(['grid', 'inline-grid']).isRequired,
  gridTemplateColumns: PropTypes.string,
  gridTemplateRows: PropTypes.string,
  gridTemplateAreas: PropTypes.string,
  gridTemplate: PropTypes.string,
  gridColumnGap: PropTypes.string,
  gridRowGap: PropTypes.string,
  gridGap: PropTypes.string,
  justifyItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  alignItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  placeItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  justifyContent: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'stretch',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  alignContent: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'stretch',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  placeContent: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'stretch',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  gridAutoColumns: PropTypes.string,
  gridAutoRows: PropTypes.string,
  gridAutoFlow: PropTypes.string,
  grid: PropTypes.string,
};
Grid.defaultProps = {
  display: 'grid',
};
// Assign GridItem as a static property of Grid
Grid.Item = GridItem;

export default Grid;
