import React from 'react';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { filterDataAttributes } from '@commercetools-uikit/utils';

export type TAvatarProps = {
  /**
   * The first name of the user.
   */
  firstName?: string;
  /**
   * The last name of the user.
   */
  lastName?: string;
  /**
   * The hashed string of the user gravatar.
   */
  gravatarHash: string;
  /**
   * Enhances the appearance of the avatar.
   */
  isHighlighted?: boolean;
  /**
   * The size of the rendered avatar.
   */
  size: 's' | 'm' | 'l';
};

export type TGravatarImg = {
  hash?: string;
  size: TAvatarProps['size'];
  isHighlighted?: boolean;
  altText?: string;
};

export type TInitialsProps = {
  firstName?: string;
  lastName?: string;
  size: TAvatarProps['size'];
};

const avatarSizes = {
  s: { width: '26px', fontSize: '1em' },
  m: { width: '48px', fontSize: '1.5em' },
  l: { width: '100px', fontSize: '3em' },
};

const getFirstChar = (str: string) =>
  typeof str === 'string' ? str.trim().slice(0, 1).toUpperCase() : '';

const getInitialsFromName = ({
  firstName = '',
  lastName = '',
}: {
  firstName?: string;
  lastName?: string;
}) => `${getFirstChar(firstName)}${getFirstChar(lastName)}`;

/**
 * `s` - defines the size. We want a bigger one if the user is on a retina-display
 * `d` - defines the default if the user is not known to Gravatar. It returns a blank image,
 *        which let the initials underneath shine through
 *
 * @see: https://de.gravatar.com/site/implement/images/
 */
const createGravatarImgUrl = (
  md5Hash: TGravatarImg['hash'],
  size: TGravatarImg['size'],
  multiplyBy: number = 1
) => {
  const sizeAsInt = parseInt(avatarSizes[size].width.replace(/px$/, ''), 10);
  const gravatarSize = sizeAsInt * multiplyBy;
  return `https://www.gravatar.com/avatar/${md5Hash}?s=${gravatarSize}&d=blank`;
};

const GravatarImg = (props: TGravatarImg) => (
  <img
    css={css`
      background-position: center center;
      background-size: contain;
      position: relative;
      z-index: 10;

      ${props.isHighlighted ? 'opacity: 0.7;' : ''}
    `}
    src={createGravatarImgUrl(props.hash, props.size)}
    srcSet={[
      `${createGravatarImgUrl(props.hash, props.size)} 1x`,
      `${createGravatarImgUrl(props.hash, props.size, 2)} 2x`,
    ].join(',')}
    alt={props.altText}
  />
);
GravatarImg.displayName = 'GravatarImg';

const Initials = (props: TInitialsProps) => (
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

const Avatar = (props: TAvatarProps) => (
  <div
    css={css`
      align-items: center;
      background-color: ${vars.colorNeutral60};
      border-radius: 100%;
      font-size: ${vars.fontSizeDefault};
      color: ${vars.colorSurface};
      display: flex;
      justify-content: center;
      overflow: hidden;
      position: relative;

      height: ${avatarSizes[props.size].width};
      width: ${avatarSizes[props.size].width};

      ${props.isHighlighted ? `background-color: ${vars.colorNeutral};` : ''}
    `}
    {...filterDataAttributes(props)}
  >
    <GravatarImg
      hash={props.gravatarHash}
      size={props.size}
      isHighlighted={props.isHighlighted}
      altText={getInitialsFromName({
        firstName: props.firstName,
        lastName: props.lastName,
      })}
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

export default Avatar;
