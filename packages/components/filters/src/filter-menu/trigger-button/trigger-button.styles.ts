import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

export const triggerWrapper = css`
  color: ${designTokens.colorNeutral40};
  background-color: ${designTokens.colorSurface};
  font-size: ${designTokens.fontSize20};
  font-weight: ${designTokens.fontWeight500};
  line-height: ${designTokens.lineHeight20};
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${designTokens.spacing20};
  padding: 3px ${designTokens.spacing25};
  border-radius: ${designTokens.borderRadius20};
  box-shadow: 0 0 0 ${designTokens.borderWidth1} ${designTokens.colorNeutral85};
  cursor: pointer;
  height: ${designTokens.spacing50};
  max-width: min(100%, ${designTokens.constraint13});
  align-self: flex-start;
  &:hover {
    background-color: ${designTokens.colorPrimary98};
    .ui-kit-filter-trigger-badge-container {
      background: linear-gradient(
        to right,
        transparent,
        ${designTokens.colorPrimary98} 25%
      );
    }
  }
`;

export const disabled = css`
  color: ${designTokens.colorNeutral40};
  background-color: ${designTokens.colorNeutral95};
  cursor: not-allowed;
  &:hover {
    background-color: ${designTokens.colorNeutral95};
    .ui-kit-filter-trigger-badge-container {
      background: linear-gradient(
        to right,
        transparent,
        ${designTokens.colorNeutral95} 25%
      );
    }
  }
  .ui-kit-filter-trigger-badge-container {
    background: linear-gradient(
      to right,
      transparent,
      ${designTokens.colorNeutral95} 25%
    );
  }
  > * {
    pointer-events: none;
  }
`;

export const mainActionButton = css`
  background: transparent;
  border: 0;
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: ${designTokens.borderRadius20};
  &:focus {
    box-shadow: 0px 0px 0px 2px ${designTokens.colorPrimary40};
  }
`;

export const removeButton = css`
  position: relative;
  z-index: 2;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  svg {
    fill: ${designTokens.colorNeutral40} !important;
  }
`;

export const label = css`
  flex: 0 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: inherit;
  white-space: nowrap;
  max-width: ${designTokens.constraint6};
`;

export const valuesContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${designTokens.spacing10};
  overflow: hidden;
  position: relative;
  padding-left: 0;
`;

export const badgeContainer = css`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  padding-left: ${designTokens.spacing30};
  background: linear-gradient(
    to right,
    transparent,
    ${designTokens.colorSurface} 25%
  );
`;
