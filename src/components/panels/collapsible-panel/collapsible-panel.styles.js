import { css } from '@emotion/core';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const getContainerStyles = ({ isCondensed, theme }) => {
  const baseStyles = css`
    font-family: inherit;
    box-shadow: ${vars.shadow1};
    color: ${vars.colorSolid};
    border-radius: ${vars.borderRadius6};
    position: relative;
    min-width: 550px;
    font-size: ${vars.fontSizeDefault};
    padding: 0;
    background-color: ${theme === 'light'
      ? vars.colorSurface
      : vars.colorNeutral95};
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
    background-color: ${theme === 'light'
      ? vars.colorSurface
      : vars.colorNeutral95};
  `;

  return [
    baseStyles,
    isOpen &&
      css`
        border-bottom: 1px ${vars.colorNeutral60} solid;
      `,
    isDisabled &&
      css`
        cursor: default;
      `,
    isSticky &&
      isOpen &&
      css`
        z-index: 1;
        position: sticky;
        top: 0;
        border-top-right-radius: ${vars.borderRadius6};
        border-top-left-radius: ${vars.borderRadius6};
      `,
    !isOpen &&
      css`
        border-bottom-left-radius: ${vars.borderRadius6};
        border-bottom-right-radius: ${vars.borderRadius6};
      `,
  ];
};

const getHeaderStyles = ({
  isDisabled,
  isCondensed,
  headerControlsAlignment,
}) => {
  const baseStyles = css`
    display: flex;
    flex: 1;
    align-items: center;
    list-style-type: none;
    justify-content: ${headerControlsAlignment === 'left'
      ? 'flex-start'
      : 'space-between'};

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
      margin: 0 0 0 ${vars.spacingM};
    }
  `;
  if (isDisabled) {
    return [
      baseStyles,
      css`
        cursor: default;
      `,
      !isCondensed &&
        css`
          /**
           We set a min-height of 32px to anticipate use-cases where SecondaryButton or PrimaryButton
           are rendered in the headerControl */
          min-height: ${vars.spacingXl};
        `,
    ];
  }
  return [
    baseStyles,
    !isCondensed &&
      css`
        /**
         We set a min-height of 32px to anticipate use-cases where SecondaryButton or PrimaryButton
         are rendered in the headerControl */
        min-height: ${vars.spacingXl};
      `,
  ];
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
