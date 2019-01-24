import { css } from '@emotion/core';
import vars from '../../../../materials/custom-properties';

const getContainerStyles = ({ isCondensed, theme }) => {
  const baseStyles = css`
    font-family: ${vars.fontFamilyDefault};
    box-shadow: ${vars.shadow1Second};
    color: ${vars.colorBlack};
    border-radius: ${vars.borderRadius6};
    position: relative;
    min-width: 550px;
    font-size: ${vars.fontSizeDefault};
    padding: 0;
    background-color: ${theme === 'light' ? vars.colorWhite : vars.colorGray95};
  `;

  if (isCondensed) {
    return [
      baseStyles,
      css`
        min-width: 0;
      `,
    ];
  }
  return baseStyles;
};

const getHeaderContainerStyles = ({ isDisabled, isOpen, isSticky, theme }) => {
  const baseStyles = css`
    position: relative;
    cursor: pointer;
    border-top-left-radius: ${vars.borderRadius6};
    border-top-right-radius: ${vars.borderRadius6};
    background-color: ${theme === 'light' ? vars.colorWhite : vars.colorGray95};
  `;

  return [
    baseStyles,
    isOpen &&
      css`
        border-bottom: 1px ${vars.colorGray60} solid;
      `,
    isDisabled &&
      css`
        cursor: default;
      `,
    isSticky &&
      isOpen &&
      css`
        position: sticky;
        top: 0;
        z-index: 1;
        border-top-right-radius: ${vars.borderRadius6};
        border-top-left-radius: ${vars.borderRadius6};

        /* FIXME: this is supposed to fix a bug in Chrome with position: sticky in
                 low-DPI screens. Once the bug is fixed, please remove this. (https://goo.gl/GVcJXf) */

        @media only screen and (-webkit-max-device-pixel-ratio: 1) {
          top: calc(${vars.spacing16} * -1);
        }
      `,
    !isOpen &&
      css`
        border-bottom-left-radius: ${vars.borderRadius6};
        border-bottom-right-radius: ${vars.borderRadius6};
      `,
  ];
};

const getHeaderStyles = ({ isDisabled }) => {
  const baseStyles = css`
    display: flex;
    flex: 1;
    align-items: center;
    list-style-type: none;
    justify-content: space-between;

    /*
      Two resource that explain why we need the min-width: 0; here
      By default, min-width is set to 'auto'. That means that this flex-child is not
      allowed to grow any smaller than the longest text inside. So it will stretch
      no matter how you set the flex-grow property
      To fix this you need to set min-width to 0. This tells the flex-child that
      it is ok to be narrower than the longest word inside
      https://hackernoon.com/11-things-i-learned-reading-the-flexbox-spec-5f0c799c776b
      https://css-tricks.com/flexbox-truncated-text/
    */

    min-width: 0;

    > * + * {
      /* would have loved to use Spacings.Inline here but that would require a
    complete overhaul of this components' structure */
      margin: 0 0 0 ${vars.spacing16};
    }
  `;
  if (isDisabled) {
    return [
      baseStyles,
      css`
        cursor: default;
      `,
    ];
  }
  return baseStyles;
};

const getContentStyles = () => css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export {
  getContainerStyles,
  getContentStyles,
  getHeaderContainerStyles,
  getHeaderStyles,
};
