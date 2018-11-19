const getFirstChar = str =>
  typeof str === 'string'
    ? str
        .trim()
        .slice(0, 1)
        .toUpperCase()
    : '';

export const getInitialsFromName = ({ firstName = '', lastName = '' }) =>
  `${getFirstChar(firstName)}${getFirstChar(lastName)}`;

/**
 * `s` - defines the size. We want a bigger one if the user is on a retina-display
 * `d` - defines the default if the user is not known to Gravatar. It returns a blank image,
 *        which let the initials underneath shine through
 *
 * @see: https://de.gravatar.com/site/implement/images/
 */
export const createGravatarImgUrl = md5Hash =>
  `https://www.gravatar.com/avatar/${md5Hash}?d=blank`;
