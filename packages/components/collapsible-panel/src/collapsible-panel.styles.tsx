import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import type { TCollapsiblePanel } from './collapsible-panel';

function getThemeStyle(theme?: TCollapsiblePanel['theme']) {
  if (theme === 'light') {
    return css`
      background-color: ${designTokens.colorSurface};
    `;
  }
  return css`
    background-color: ${designTokens.colorNeutral95};
  `;
}

const getHeaderContainerStyles = (
  props: Pick<
    TCollapsiblePanel,
    'headerControlsAlignment' | 'condensed' | 'isDisabled' | 'isSticky'
  >,
  isOpen: boolean
) => {
  const baseStyles = css`
    position: relative;
    border-top-left-radius: ${designTokens.borderRadius6};
    border-top-right-radius: ${designTokens.borderRadius6};
    display: flex;
    flex: 1;
    align-items: center;
    list-style-type: none;
    justify-content: ${props.headerControlsAlignment === 'left'
      ? 'flex-start'
      : 'space-between'};
    padding: ${props.condensed
      ? `${designTokens.spacingS}`
      : `${designTokens.spacingS} ${designTokens.spacingM}`};
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
        border-top-right-radius: ${designTokens.borderRadius6};
        border-top-left-radius: ${designTokens.borderRadius6};
      `,
    !props.condensed &&
      // To understand why this min-height see: https://github.com/commercetools/ui-kit/pull/616
      css`
        min-height: ${designTokens.bigButtonHeight};
        box-sizing: content-box; /* makes the padding extend beyond the min-height */
      `,
  ];
};

const baseContainerStyles = css`
  position: relative;
  min-width: ${designTokens.constraint6};
  padding: 0;
  display: flex;
  flex-direction: column;
  box-shadow: ${designTokens.shadow1};
  border-radius: ${designTokens.borderRadius6};
  color: ${designTokens.colorSolid};
  font-family: inherit;
  font-size: ${designTokens.fontSizeDefault};
`;

const HeaderControlsWrapper = styled.div`
  margin-left: ${designTokens.spacingM};
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
  border-top: 1px solid ${designTokens.colorNeutral60};
`;

export {
  baseContainerStyles,
  getHeaderContainerStyles,
  getThemeStyle,
  SectionContent,
  SectionWrapper,
  HeaderControlsWrapper,
};
