import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { getPaddingStyle, getHorizontalAlignmentStyle } from './cell.styles';

const Footer = styled.div`
  display: block;
  ${getPaddingStyle}
  ${getHorizontalAlignmentStyle}
  background-color: ${vars.colorSurface};
  border-top: 1px solid ${vars.colorNeutral90};
  border-bottom: 1px solid ${vars.colorNeutral90};
`;
Footer.displayName = 'Footer';
Footer.propTypes = {
  children: PropTypes.node.isRequired,
  isCondensed: PropTypes.bool,
  horizontalCellAlignment: PropTypes.oneOf(['left', 'center', 'right']),
};
Footer.defaultProps = {
  horizontalCellAlignment: 'left',
};

export default Footer;
