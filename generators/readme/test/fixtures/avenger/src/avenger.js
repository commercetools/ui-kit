import React from 'react';
import PropTypes from 'prop-types';

const Avenger = (props) => <div>{`Avenger: ${props.name}`}</div>;
Avenger.defaultProps = {
  power: 1,
};
Avenger.propTypes = {
  /**
   * The name of an Avenger
   */
  name: PropTypes.string.isRequired,

  onClick: PropTypes.func,

  /**
   * List the abilities of this Avenger
   */
  abilities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,

  /**
   * Define the power for this Avenger, from a scale of 1-10.
   */
  power: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).isRequired,

  isAlive: PropTypes.bool.isRequired
};

export default Avenger;
