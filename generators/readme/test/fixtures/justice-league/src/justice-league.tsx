type Identity = {
  /**
   * The name of the Justice League member.
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
   * The name of a Justice League member.
   */
  name: string;

  /**
   * The real identity of this Justice League member, if known.
   */
  identity: Identity;

  /**
   * A callback function, called when the component is clicked.
   */
  onClick?: (event: Event) => void;

  /**
   * List the abilities of this Justice League member.
   */
  abilities: Ability[];

  /**
   * List the aliases of this Justice League member.
   */
  aliases: string[];

  /**
   * The list of movies where this Justice League member appears in.
   * It can either be just the name of the movie or a more detailed
   * information about the movie.
   */
  movies: string | Movie;

  /**
   * Define the power for this Justice League member, from a scale of 1-10.
   */
  power: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  isAlive: boolean;
};

const JusticeLeague = ({ power = 1, isAlive = true, ...props }: Props) => (
  <div>{`JusticeLeague: ${props.name}`}</div>
);

export default JusticeLeague;
