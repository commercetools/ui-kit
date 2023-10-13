import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
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
  /**
   * The color of the avatar.
   */
  color: 'accent' | 'purple' | 'turquoise' | 'brown';
};

export type TGravatarImgProps = Pick<
  TAvatarProps,
  'gravatarHash' | 'isHighlighted' | 'size'
>;

export type TInitialsProps = Pick<
  TAvatarProps,
  'firstName' | 'lastName' | 'size'
>;

type TSizeProp = Pick<TAvatarProps, 'size'>;
const fontSizePerInitialsLength = ({ size }: TSizeProp) => {
  return (initials: string) => {
    const initialsLength = initials?.length;

    if (size === 's') {
      return initialsLength > 1
        ? designTokens.fontSizeForAvatarAsSmallWhenTwoChars
        : designTokens.fontSizeForAvatarAsSmallWhenOneChar;
    } else if (size === 'm') {
      return initialsLength > 1
        ? designTokens.fontSizeForAvatarAsMediumWhenTwoChars
        : designTokens.fontSizeForAvatarAsMediumWhenOneChar;
    } else if (size === 'l') {
      return initialsLength > 1
        ? designTokens.fontSizeForAvatarAsBigWhenTwoChars
        : designTokens.fontSizeForAvatarAsBigWhenOneChar;
    }
    return;
  };
};

const avatarSizes = {
  s: {
    width: '32px',
    fontSize: fontSizePerInitialsLength({ size: 's' }),
  },
  m: {
    width: designTokens.widthForAvatarAsMedium,
    fontSize: fontSizePerInitialsLength({ size: 'm' }),
  },
  l: {
    width: '100px',
    fontSize: fontSizePerInitialsLength({ size: 'l' }),
  },
};

const defaultProps: Pick<
  TAvatarProps,
  'firstName' | 'lastName' | 'isHighlighted' | 'size'
> = {
  firstName: '',
  lastName: '',
  isHighlighted: false,
  size: 's',
};

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
  const sizeAsInt = parseInt(avatarSizes[size].width.replace(/px$/, ''), 10);
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
        font-size: ${avatarSizes[props.size].fontSize(initialsFromName)};
      `}
    >
      {initialsFromName}
    </div>
  );
};
Initials.displayName = 'Initials';

const Avatar = (props: TAvatarProps) => (
  <div
    css={css`
      align-items: center;
      background-color: ${designTokens.backgroundColorForAvatar};
      border-radius: 100%;
      font-size: ${designTokens.fontSizeDefault};
      font-weight: ${designTokens.fontWeight600};
      color: ${designTokens.colorSurface};
      display: flex;
      justify-content: center;
      overflow: hidden;
      position: relative;

      height: ${avatarSizes[props.size].width};
      width: ${avatarSizes[props.size].width};

      ${props.isHighlighted
        ? `background-color: ${designTokens.backgroundColorForAvatarWhenHighlighted};`
        : ''}
    `}
    {...filterDataAttributes(props)}
  >
    <GravatarImg
      gravatarHash={props.gravatarHash}
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
Avatar.defaultProps = defaultProps;

export default Avatar;
