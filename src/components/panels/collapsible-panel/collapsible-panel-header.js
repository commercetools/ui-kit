import PropTypes from 'prop-types';
import React from 'react';
import Text from '../../typography/text';

const CollapsiblePanelHeader = props => (
  <Text.Subheadline elementType="h4" isBold={true} truncate={true}>
    {props.children}
  </Text.Subheadline>
);

CollapsiblePanelHeader.displayName = 'CollapsiblePanelHeader';
CollapsiblePanelHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CollapsiblePanelHeader;
