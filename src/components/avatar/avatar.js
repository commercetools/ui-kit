import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './avatar.mod.css';
import { getInitialsFromName, createGravatarImgUrl } from './utils';

export const GravatarImg = props => {
  const imageUrl = createGravatarImgUrl(props.hash);
  return (
    <img
      className={classnames(styles['gravatar-img'], {
        [styles['gravatar-image-small']]: props.size === 's',
        [styles['gravatar-image-medium']]: props.size === 'm',
        [styles['gravatar-image-large']]: props.size === 'l',
      })}
      src={imageUrl}
      srcSet={imageUrl}
    />
  );
};

GravatarImg.displayName = 'GravatarImg';
GravatarImg.propTypes = {
  hash: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l']).isRequired,
};

export const Initials = props => (
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
