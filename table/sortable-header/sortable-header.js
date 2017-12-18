import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../typography/text';
import withMouseOverState from '../../hocs/with-mouse-over-state';
import { AngleDownIcon, AngleUpIcon } from '../../icons';
import styles from './sortable-header.mod.css';

const SortableHeader = props => {
  const isActive = props.sortBy === props.columnKey;
  const theme = !isActive && !props.isMouseOver ? 'grey' : 'black';

  return (
    <div
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
      className={styles.container}
    >
      <div className={styles.label}>
        <Text.Body isBold={isActive}>{props.children}</Text.Body>
      </div>
      {props.sortDirection === 'ASC' || !isActive ? (
        <AngleDownIcon size="small" theme={theme} />
      ) : (
        <AngleUpIcon size="small" theme={theme} />
      )}
    </div>
  );
};

SortableHeader.displayName = 'SortableHeader';

SortableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.oneOf(['DESC', 'ASC']),
  columnKey: PropTypes.string.isRequired,

  // withMouseOverState HoC
  isMouseOver: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
};

export default withMouseOverState(SortableHeader);
