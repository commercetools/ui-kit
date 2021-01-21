import React from 'react';

type Identity = {
  /**
   * The name of the Avenger.
   */
  firstName?: string;
  lastName?: string;
  age?: number;
};
type Ability = {
  /**
   * The name of the ability.
   */
  name: string;
  description?: string;
  /**
   * Set this to `true` to mark this ability as new.
   *
   * @@defaultValue@@: false
   */
  isNew?: boolean;
};
/**
 * Detailed information about the movie.
 */
type Movie = {
  /**
   * The title of the movie.
   */
  title: string;
  /**
   * The release date of the movie (ISO).
   */
  releaseDate: string;
};
type Props = {
  /**
   * The name of an Avenger.
   */
  name: string;

  /**
   * The real identity of this Avenger, if known.
   */
  identity: Identity;

  /**
   * A callback function, called when the component is clicked.
   */
  onClick?: (event: Event) => void;

  /**
   * List the abilities of this Avenger.
   */
  abilities: Ability[];

  /**
   * The list of movies where this Avenger appears in.
   * It can either be just the name of the movie or a more detailed
   * information about the movie.
   */
  movies: string | Movie;

  /**
   * Define the power for this Avenger, from a scale of 1-10.
   */
  power: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  isAlive: boolean;
};
const defaultProps: Pick<Props, 'power' | 'isAlive'> = {
  power: 1,
  isAlive: true,
};

const JusticeLeague = (props: Props) => (
  <div>{`JusticeLeague: ${props.name}`}</div>
);
JusticeLeague.defaultProps = defaultProps;

export default JusticeLeague;
