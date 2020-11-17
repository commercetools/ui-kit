import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

function getThemeStyle(theme) {
  if (theme === 'light') {
    return css`
      background-color: ${vars.colorSurface};
    `;
  }
  return css`
    background-color: ${vars.colorNeutral95};
  `;
}

const getHeaderContainerStyles = (props, isOpen) => {
  const baseStyles = css`
    position: relative;
    border-top-left-radius: ${vars.borderRadius6};
    border-top-right-radius: ${vars.borderRadius6};
    display: flex;
    flex: 1;
    align-items: center;
    list-style-type: none;
    justify-content: ${props.headerControlsAlignment === 'left'
      ? 'flex-start'
      : 'space-between'};
    padding: ${props.condensed
      ? `${vars.spacingXs} ${vars.spacingS}`
      : `${vars.spacingS} ${vars.spacingM}`};
  `;

  return [
    baseStyles,
    props.isDisabled &&
      css`
        cursor: default;
      `,
    props.isSticky &&
      isOpen &&
      css`
        z-index: 1;
        position: sticky;
        top: 0;
        border-top-right-radius: ${vars.borderRadius6};
        border-top-left-radius: ${vars.borderRadius6};
      `,
    !props.condensed &&
      // To understand why this min-height see: https://github.com/commercetools/ui-kit/pull/616
      css`
        min-height: ${vars.bigButtonHeight};
        box-sizing: content-box; /* makes the padding extend beyond the min-height */
      `,
  ];
};

const baseContainerStyles = css`
  ${getThemeStyle}
  position: relative;
  min-width: 550px;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-shadow: ${vars.shadow1};
  border-radius: ${vars.borderRadius6};
  color: ${vars.colorSolid};
  font-family: inherit;
  font-size: ${vars.fontSizeDefault};
`;

const HeaderControlsWrapper = styled.div`
  margin-left: ${vars.spacingM};
  display: flex;
  align-items: center;

  /* reset the cursor because this area of the header doesn't trigger its onClick */
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
  baseContainerStyles,
  getHeaderContainerStyles,
  getThemeStyle,
  SectionContent,
  SectionWrapper,
  HeaderControlsWrapper,
};
