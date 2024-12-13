import { ReactElement, cloneElement } from 'react';
import { css } from '@emotion/react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import {
  getAvatarStyles,
  getFontSize,
  getForegroundColor,
  getWidthSize,
} from './avatar.styles';

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
  /**
   * The color of the avatar.
   */
  color?: 'accent' | 'purple' | 'turquoise' | 'brown';
  /** an <Icon /> component
   */
  icon?: ReactElement;
};

export type TGravatarImgProps = Pick<
  TAvatarProps,
  'gravatarHash' | 'isHighlighted' | 'size'
>;

export type TInitialsProps = Pick<
  TAvatarProps,
  'firstName' | 'lastName' | 'size'
>;

const getFirstChar = (str: string) =>
  typeof str === 'string' ? str.trim().slice(0, 1).toUpperCase() : '';

const getInitialsFromName = ({
  firstName = '',
  lastName = '',
}: Pick<TAvatarProps, 'firstName' | 'lastName'>) =>
  `${getFirstChar(firstName)}${getFirstChar(lastName)}`;
/**
 * `s` - defines the size. We want a bigger one if the user is on a retina-display
 * `d` - defines the default if the user is not known to Gravatar. It returns a blank image,
 *        which let the initials underneath shine through
 *
 * @see: https://de.gravatar.com/site/implement/images/
 */
const createGravatarImgUrl = (
  md5Hash: TAvatarProps['gravatarHash'],
  size: TAvatarProps['size'],
  multiplyBy: number = 1
) => {
  const imageSize = getWidthSize(size);
  const sizeAsInt = parseInt(imageSize.replace(/px$/, ''), 10);
  const gravatarSize = sizeAsInt * multiplyBy;
  return `https://www.gravatar.com/avatar/${md5Hash}?s=${gravatarSize}&d=blank`;
};

const GravatarImg = (props: TGravatarImgProps) => (
  <img
    css={css`
      background-position: center center;
      background-size: contain;
      position: relative;
      z-index: 10;

      ${props.isHighlighted ? 'opacity: 0.7;' : ''}
    `}
    src={createGravatarImgUrl(props.gravatarHash, props.size)}
    srcSet={[
      `${createGravatarImgUrl(props.gravatarHash, props.size)} 1x`,
      `${createGravatarImgUrl(props.gravatarHash, props.size, 2)} 2x`,
    ].join(',')}
    /**
     * Based on https://www.w3.org/WAI/tutorials/images/decision-tree/:
     * image contributes meaning to the current page or context and it shows content that is redundant to real text nearby
     */
    alt=""
  />
);
GravatarImg.displayName = 'GravatarImg';

const Initials = (props: TInitialsProps) => {
  const initialsFromName = getInitialsFromName({
    firstName: props.firstName,
    lastName: props.lastName,
  });
  return (
    <div
      css={css`
        position: absolute;
        font-size: ${getFontSize(initialsFromName, props.size)};
      `}
    >
      {initialsFromName}
    </div>
  );
};
Initials.displayName = 'Initials';

const Avatar = ({
  firstName = '',
  lastName = '',
  isHighlighted = false,
  size = 's',
  color = 'accent',
  ...props
}: TAvatarProps) => {
  const avatarSize = getWidthSize(size);
  const foregroundColor = getForegroundColor(color);
  return (
    <div
      css={getAvatarStyles({
        firstName,
        lastName,
        isHighlighted: false,
        size,
        color,
        ...props,
      })}
      {...filterDataAttributes({
        firstName,
        lastName,
        isHighlighted: false,
        size,
        color,
        ...props,
      })}
    >
      {props?.icon ? (
        <div
          css={css`
            height: calc(${avatarSize} - 45%);
            width: calc(${avatarSize} - 45%);
          `}
        >
          {cloneElement(props?.icon, {
            size: 'scale',
            color: foregroundColor,
            backgroundcolor: foregroundColor,
          })}
        </div>
      ) : (
        <>
          <GravatarImg
            gravatarHash={props.gravatarHash}
            size={size}
            isHighlighted={isHighlighted}
          />
          <Initials size={size} firstName={firstName} lastName={lastName} />
        </>
      )}
    </div>
  );
};
Avatar.displayName = 'Avatar';

export default Avatar;
