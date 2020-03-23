import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const GridItem = styled.div((props) => ({
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
GridItem.propTypes = {
  children: PropTypes.node,
  // List based on https://css-tricks.com/snippets/css/complete-guide-grid
  gridArea: PropTypes.string,
  gridColumn: PropTypes.string,
  gridColumnStart: PropTypes.string,
  gridColumnEnd: PropTypes.string,
  gridRow: PropTypes.string,
  gridRowStart: PropTypes.string,
  gridRowEnd: PropTypes.string,
  justifySelf: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  alignSelf: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  placeSelf: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
};

const Grid = styled.div((props) => ({
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
