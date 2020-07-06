import React from 'react';
import PropTypes from 'prop-types';
import { CellInner } from './cell.styles';
import BaseFooterCell from './footer.styles';

const FooterCell = (props) => (
  <BaseFooterCell
    numberOfColumns={props.numberOfColumns}
    disableFooterStickiness={props.disableFooterStickiness}
  >
    <CellInner
      isCondensed={props.isCondensed}
      horizontalCellAlignment={props.horizontalCellAlignment}
    >
      {props.children}
    </CellInner>
  </BaseFooterCell>
);
FooterCell.displayName = 'FooterCell';
FooterCell.propTypes = {
  children: PropTypes.node.isRequired,
  isCondensed: PropTypes.bool,
  numberOfColumns: PropTypes.number.isRequired,
  disableFooterStickiness: PropTypes.bool.isRequired,
  horizontalCellAlignment: PropTypes.oneOf(['left', 'center', 'right']),
};
FooterCell.defaultProps = {
  disableFooterStickiness: false,
  horizontalCellAlignment: 'left',
};

export default FooterCell;
