import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { getNormalizedButtonStyles } from '@commercetools-uikit/accessible-button';

const getContainerStyles = ({ isCondensed, theme }) => {
  const baseStyles = css`
    display: flex;
    flex-direction: column;
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

const getHeaderContainerStyles = ({
  theme,
  isOpen,
  isSticky,
  isDisabled,
  isCondensed,
  headerControlsAlignment,
}) => {
  const baseStyles = css`
    position: relative;
    border-top-left-radius: ${vars.borderRadius6};
    border-top-right-radius: ${vars.borderRadius6};
    background-color: ${theme === 'light'
      ? vars.colorSurface
      : vars.colorNeutral95};
    display: flex;
    flex: 1;
    align-items: center;
    list-style-type: none;
    justify-content: ${headerControlsAlignment === 'left'
      ? 'flex-start'
      : 'space-between'};
    padding: ${isCondensed
      ? `${vars.spacingXs} ${vars.spacingS}`
      : `${vars.spacingS} ${vars.spacingM}`};
  `;

  return [
    baseStyles,
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
  ];
};

const Container = styled.div`
  ${getContainerStyles}
`;

const HeaderContainer = styled.button`
  ${getNormalizedButtonStyles}
  outline: none;

  /* to understand why this min-height see: https://github.com/commercetools/ui-kit/pull/616 */
  min-height: ${vars.bigButtonHeight};
  box-sizing: content-box; /* makes the padding extend beyound the min-height */

  ${getHeaderContainerStyles}
`;

const HeaderControlsWrapper = styled.div`
  margin-left: ${vars.spacingM};
  display: flex;
  align-items: center;

  /* reset the cursor because this area the header doesn't trigger its onClick */
  cursor: auto;
`;

const SectionContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const SectionWrapper = styled.div`
  border-top: 1px solid ${vars.colorNeutral60};
`;

export {
  Container,
  SectionContent,
  SectionWrapper,
  HeaderContainer,
  HeaderControlsWrapper,
};
