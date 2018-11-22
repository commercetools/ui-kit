import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import oneLineTrim from 'common-tags/lib/oneLineTrim';
import styles from './avatar.mod.css';
import filterDataAttributes from '../../utils/filter-data-attributes';

const getFirstChar = str =>
  typeof str === 'string'
    ? str
        .trim()
        .slice(0, 1)
        .toUpperCase()
    : '';

const getInitialsFromName = ({ firstName = '', lastName = '' }) =>
  `${getFirstChar(firstName)}${getFirstChar(lastName)}`;

/**
 * `s` - defines the size. We want a bigger one if the user is on a retina-display
 * `d` - defines the default if the user is not known to Gravatar. It returns a blank image,
 *        which let the initials underneath shine through
 *
 * @see: https://de.gravatar.com/site/implement/images/
 */
const createGravatarImgUrl = (md5Hash, size) =>
  `https://www.gravatar.com/avatar/${md5Hash}?s=${size}&d=blank`;

const getSizeInPx = size => do {
  if (size === 'l') 100;
  else if (size === 'm') 48;
  else 26;
};

const GravatarImg = props => (
  <img
    className={classnames(styles['gravatar-img'], {
      [styles['gravatar-image-small']]: props.size === 's',
      [styles['gravatar-image-medium']]: props.size === 'm',
      [styles['gravatar-image-large']]: props.size === 'l',
    })}
    src={createGravatarImgUrl(props.hash, getSizeInPx(props.size))}
    srcSet={oneLineTrim`
      ${createGravatarImgUrl(props.hash, getSizeInPx(props.size))} 1x, 
      ${createGravatarImgUrl(props.hash, getSizeInPx(props.size) * 2)} 2x
    `}
  />
);

GravatarImg.displayName = 'GravatarImg';
GravatarImg.propTypes = {
  hash: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l']).isRequired,
};

const Initials = props => (
  <div className={styles.initials}>
    {getInitialsFromName({
      firstName: props.firstName,
      lastName: props.lastName,
    })}
  </div>
);

Initials.displayName = 'Initials';
Initials.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

const Avatar = props => (
  <div
    className={classnames(
      styles['avatar-base'],
      styles[`avatar-${props.size}`],
      {
        [styles['avatar-hover']]: props.isHighlighted,
      }
    )}
    {...filterDataAttributes(props)}
  >
    <GravatarImg hash={props.gravatarHash} size={props.size} />
    <Initials firstName={props.firstName} lastName={props.lastName} />
  </div>
);
Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  firstName: '',
  lastName: '',
  isHighlighted: false,
  size: 's',
};

Avatar.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  gravatarHash: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
  size: PropTypes.oneOf(['s', 'm', 'l']).isRequired,
};

export default Avatar;
