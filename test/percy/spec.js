import React from 'react';
import PropTypes from 'prop-types';

const Spec = props => (
  <div>
    <div>{props.label}</div>
    {props.children}
  </div>
);

Spec.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Spec.displayName = 'Spec';

export default Spec;
