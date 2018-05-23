import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Text from '../../typography/text';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import { AngleDownIcon, AngleUpIcon } from '../../icons';
import styles from './sortable-header.mod.css';

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
  const theme = props.isMouseOver ? 'grey' : 'black';
  const isArrowDown =
    (!isActive && props.isMouseOver) ||
    (isActive && !props.isMouseOver && props.sortDirection === 'ASC') ||
    (isActive && props.isMouseOver && props.sortDirection === 'DESC');

  return (
    <div
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
      className={classnames(styles.container, {
        [styles.active]: isActive,
        [styles.reversed]: props.alignRight,
      })}
    >
      <Text.Body>{props.children}</Text.Body>
      <span className={styles.arrow}>
        {isArrowDown ? (
          <AngleDownIcon size="small" theme={theme} />
        ) : (
          <AngleUpIcon className={styles.arrow} size="small" theme={theme} />
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
