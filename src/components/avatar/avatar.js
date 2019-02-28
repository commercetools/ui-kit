import React from 'react';
import PropTypes from 'prop-types';
import { oneLineTrim } from 'common-tags';
import { css } from '@emotion/core';
import vars from '../../../materials/custom-properties';
import filterDataAttributes from '../../utils/filter-data-attributes';

const avatarSizes = {
  s: { width: '26px', fontSize: '1em' },
  m: { width: '48px', fontSize: '1.5em' },
  l: { width: '100px', fontSize: '3em' },
};

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
const createGravatarImgUrl = (md5Hash, size, multiplyBy = 1) => {
  const sizeAsInt = avatarSizes[size].width.replace(/px$/, '');
  const gravatarSize = sizeAsInt * multiplyBy;
  return `https://www.gravatar.com/avatar/${md5Hash}?s=${gravatarSize}&d=blank`;
};

const GravatarImg = props => (
  <img
    css={css`
      background-position: center center;
      background-size: contain;
      position: relative;
      z-index: 10;

      ${props.isHighlighted ? 'opacity: 0.7;' : ''}
    `}
    src={createGravatarImgUrl(props.hash, props.size)}
    srcSet={oneLineTrim`
      ${createGravatarImgUrl(props.hash, props.size)} 1x,
      ${createGravatarImgUrl(props.hash, props.size, 2)} 2x
    `}
  />
);

GravatarImg.displayName = 'GravatarImg';
GravatarImg.propTypes = {
  hash: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l']).isRequired,
  isHighlighted: PropTypes.bool,
};

const Initials = props => (
  <div
    css={css`
      position: absolute;
      font-size: ${avatarSizes[props.size].fontSize};
    `}
  >
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
  size: PropTypes.oneOf(['s', 'm', 'l']).isRequired,
};

const Avatar = props => (
  <div
    css={css`
      align-items: center;
      font-family: ${vars.fontFamilyDefault};
      background-color: ${vars.colorGray60};
      border-radius: 100%;
      font-size: ${vars.fontSizeDefault};
      color: ${vars.colorWhite};
      display: flex;
      justify-content: center;
      overflow: hidden;
      position: relative;

      height: ${avatarSizes[props.size].width};
      width: ${avatarSizes[props.size].width};

      ${props.isHighlighted ? `background-color: ${vars.colorGray};` : ''}
    `}
    {...filterDataAttributes(props)}
  >
    <GravatarImg
      hash={props.gravatarHash}
      size={props.size}
      isHighlighted={props.isHighlighted}
    />
    <Initials
      size={props.size}
      firstName={props.firstName}
      lastName={props.lastName}
    />
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
