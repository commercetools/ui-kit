import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  designTokens,
  type ThemeName,
} from '@commercetools-uikit/design-system';
import type { TCollapsiblePanel } from './collapsible-panel';

const sizeIconContainer = '24px';
const sizeIconContainerSmall = '14px';

function getThemeStyle(
  theme?: TCollapsiblePanel['theme'],
  changeBackgroundColor = true
) {
  if (theme === 'light') {
    return css`
      background-color: ${changeBackgroundColor && designTokens.colorSurface};
    `;
  }
  return css`
    background-color: ${changeBackgroundColor && designTokens.colorNeutral95};
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
    background-color: ${designTokens.backgroundColorForCollapsiblePanelHeader};
    border-bottom: 1px solid
      ${designTokens.borderColorForCollapsiblePanelHeader};
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
      ? `${designTokens.paddingForCollapsiblePanelHeaderAsCondensed}`
      : `${designTokens.paddingForCollapsiblePanelHeader}`};
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
  color: ${designTokens.colorSolid};
  font-family: inherit;
  font-size: ${designTokens.fontSizeDefault};
`;

const getBaseContainerStyles = (theme: ThemeName) => {
  const style = css`
    box-shadow: ${designTokens.shadow1};
    border-radius: ${designTokens.borderRadius6};
  `;
  if (theme === 'default') {
    return style;
  }
  return;
};

const HeaderControlsWrapper = styled.div`
  margin-left: ${designTokens.spacing30};
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

const getSectionContentStyles = (
  props: Pick<
    TCollapsiblePanel,
    'headerControlsAlignment' | 'condensed' | 'isDisabled' | 'isSticky'
  >
) => styled.div`
  padding: ${props.condensed
    ? designTokens.paddingForCollapsiblePanelContentAsCondensed
    : designTokens.paddingForCollapsiblePanelContent};
`;

//Calculation takes into account Spacing.Inset(default: 16px and condensed: 8px) padding and the Headline padding-left(8px) to align content with Headline
const getSectionWrapperStyles = (
  props: Pick<TCollapsiblePanel, 'condensed'>,
  theme: ThemeName
) => {
  const style = `padding-left: ${
    props.condensed
      ? `calc(${sizeIconContainerSmall} - 8px + 8px)`
      : `calc(${sizeIconContainer} - 16px + 8px)`
  }`;
  if (theme === 'default') {
    return null;
  }
  return style;
};

const SectionWrapper = styled.div``;

export {
  baseContainerStyles,
  getHeaderContainerStyles,
  getSectionContentStyles,
  getThemeStyle,
  getSectionWrapperStyles,
  getBaseContainerStyles,
  SectionContent,
  SectionWrapper,
  HeaderControlsWrapper,
};
