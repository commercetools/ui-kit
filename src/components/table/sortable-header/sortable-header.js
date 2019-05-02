import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';
import Text from '../../typography/text';
import withMouseOverState from '../../../hocs/with-mouse-over-state';
import { AngleDownIcon, AngleUpIcon } from '../../icons';

/*
Logic of arrow indicating sort order is slightly complex:

+----------+-------------+---------------+------------+----------------+
| isActive | isMouseOver | sortDirection | arrowColor | arrowDirection |
+----------+-------------+---------------+------------+----------------+
|     0    |      0      |      n/a      |         *INVISIBLE*         |
+----------+-------------+---------------+-----------------------------+
|     0    |      1      |      n/a      |    grey    |      down      |
+----------+-------------+---------------+------------+----------------+
|     1    |      0      |      ASC      |    black   |      down      |
+----------+-------------+---------------+------------+----------------+
|     1    |      0      |      DESC     |    black   |       up       |
+----------+-------------+---------------+------------+----------------+
|     1    |      1      |      ASC      |    grey    |       up       |
+----------+-------------+---------------+------------+----------------+
|     1    |      1      |      DESC     |    grey    |      down      |
+----------+-------------+---------------+------------+----------------+

*/

const SortableHeader = props => {
  const isActive = props.sortBy === props.columnKey;
  const color = props.isMouseOver ? 'neutral60' : 'surface';
  const isArrowDown =
    (!isActive && props.isMouseOver) ||
    (isActive && !props.isMouseOver && props.sortDirection === 'ASC') ||
    (isActive && props.isMouseOver && props.sortDirection === 'DESC');

  return (
    <div
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
      css={[
        css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          &:hover {
            cursor: pointer;
          }
        `,
        props.alignRight &&
          css`
            flex-direction: row-reverse;
          `,
      ]}
    >
      <Text.Body tone="inverted">{props.children}</Text.Body>
      <span
        id="arrow"
        css={[
          css`
            visibility: hidden; /* use visibility so react-virtualized can account for arrow-width on calcs */
            pointer-events: none; /* Do not unhover when on the icon */
            padding: 0 0 0 ${vars.spacingM};
          `,
          (isActive || props.isMouseOver) &&
            css`
              visibility: visible;
            `,
          props.alignRight &&
            css`
              padding: 0 ${vars.spacingM} 0 0;
            `,
        ]}
      >
        {isArrowDown ? (
          <AngleDownIcon size="medium" color={color} />
        ) : (
          <AngleUpIcon size="small" color={color} />
        )}
      </span>
    </div>
  );
};

SortableHeader.displayName = 'SortableHeader';

SortableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.oneOf(['DESC', 'ASC']),
  columnKey: PropTypes.string.isRequired,
  alignRight: PropTypes.bool,

  // withMouseOverState HoC
  isMouseOver: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
};

export default withMouseOverState(SortableHeader);
