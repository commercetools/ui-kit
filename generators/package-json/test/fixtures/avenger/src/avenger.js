import React from 'react';
import PropTypes from 'prop-types';

const Avenger = (props) => <div>{`Avenger: ${props.name}`}</div>;
Avenger.defaultProps = {
  power: 1,
  isAlive: true,
};
Avenger.propTypes = {
  /**
   * The name of an Avenger.
   */
  name: PropTypes.string.isRequired,

  /**
   * The real identity of this Avenger, if known.
   */
  identity: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
  }),

  /**
   * A callback function, called when the component is clicked.
   * <br>
   * Signature: `(event) => void`
   */
  onClick: PropTypes.func,

  /**
   * List the abilities of this Avenger.
   */
  abilities: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The name of the ability.
       */
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      /**
       * Set this to `true` to mark this ability as new.
       *
       * @@defaultValue@@: false
       */
      isNew: PropTypes.bool,
    })
  ).isRequired,

  /**
   * The list of movies where this Avenger appears in.
   * It can either be just the name of the movie or a more detailed
   * information about the movie.
   */
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType([
      /**
       * The name of the movie.
       */
      PropTypes.string.isRequired,
      /**
       * Detailed information about the movie.
       */
      PropTypes.shape({
        /**
         * The title of the movie.
         */
        title: PropTypes.string.isRequired,
        /**
         * The release date of the movie (ISO).
         */
        releaseDate: PropTypes.string.isRequired,
      }).isRequired,
    ]).isRequired
  ).isRequired,

  /**
   * Define the power for this Avenger, from a scale of 1-10.
   */
  power: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).isRequired,

  isAlive: PropTypes.bool,
};

export default Avenger;
