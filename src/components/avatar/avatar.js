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
        [styles['gravatar-image-small']]: props.scale === 's',
        [styles['gravatar-image-medium']]: props.scale === 'm',
        [styles['gravatar-image-large']]: props.scale === 'l',
      })}
      src={imageUrl}
      srcSet={imageUrl}
    />
  );
};

GravatarImg.displayName = 'GravatarImg';
GravatarImg.propTypes = {
  hash: PropTypes.string,
  scale: PropTypes.oneOf(['s', 'm', 'l']).isRequired,
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
      styles[`avatar-${props.scale}`],
      {
        [styles['avatar-hover']]: props.isHighlighted,
      }
    )}
  >
    <GravatarImg hash={props.gravatarHash} scale={props.scale} />
    <Initials firstName={props.firstName} lastName={props.lastName} />
  </div>
);
Avatar.displayName = 'Avatar';
Avatar.defaultProps = {
  firstName: '',
  lastName: '',
  isHighlighted: false,
  scale: 's',
};

Avatar.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  gravatarHash: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
  scale: PropTypes.oneOf(['s', 'm', 'l']).isRequired,
};

export default Avatar;
