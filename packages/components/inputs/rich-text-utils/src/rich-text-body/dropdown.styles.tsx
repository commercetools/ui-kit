import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

type TDropdownStylesProps = {
  isSelected?: boolean;
  isIndeterminate?: boolean;
  isStyleButton?: boolean;
  isOpen?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isMoreStylesDropdownItem?: boolean;
};

const getBackgroundColor = (props: TDropdownStylesProps) => {
  if (props.isSelected) {
    if (props.isMoreStylesDropdownItem)
      return designTokens.backgroundColorForInputWhenSelected;
    return designTokens.colorAccent95;
  }
  return designTokens.colorSurface;
};

const DropdownItem = styled.button<TDropdownStylesProps>`
  width: 100%;
  border: 0;
  font-size: 1rem;
  cursor: pointer;
  padding: ${designTokens.spacing10} ${designTokens.spacing20};
  font-family: ${designTokens.fontFamilyDefault};
  display: block;
  background-color: ${(props) => getBackgroundColor(props)};

  &:focus,
  &:hover {
    outline: none;
    background-color: ${(props) =>
      props.isMoreStylesDropdownItem
        ? designTokens.backgroundColorForSelectInputOptionWhenHovered
        : designTokens.backgroundColorForRichTextDropdownWhenHovered};
  }
`;

const getButtonStyles = (props: TDropdownStylesProps) => [
  css`
    border: 0;
    font-family: ${designTokens.fontFamilyDefault};
    border-radius: ${designTokens.borderRadius4};
    cursor: pointer;
    font-size: ${designTokens.fontSizeForInput};
    color: ${designTokens.colorSolid};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props.isStyleButton
      ? `${designTokens.paddingForLocalizedRichTextDropdownButton}`
      : designTokens.paddingForLocalizedRichTextBodyButton};

    &:hover {
      background-color: ${designTokens.backgroundColorForRichTextDropdownWhenHovered};
    }
  `,
  props.isIndeterminate &&
    css`
      background-color: ${designTokens.colorAccent95};
    `,
  props.isOpen &&
    css`
      &:not(:hover) {
        background-color: ${designTokens.backgroundColorForRichTextButton};
        color: ${designTokens.colorSurface};

        svg {
          fill: ${designTokens.colorSurface};
        }
      }
    `,
  props.isReadOnly &&
    css`
      color: ${designTokens.colorNeutral60};

      svg {
        fill: ${designTokens.colorNeutral60};
      }
    `,
  props.isDisabled &&
    css`
      color: ${designTokens.colorNeutral60};

      svg {
        fill: ${designTokens.colorNeutral60};
      }
    `,
];

const DropdownContainer = styled.div`
  position: absolute;
  cursor: pointer;
  font-size: ${designTokens.fontSizeForInput};
  top: ${designTokens.spacing10};
  margin-top: ${designTokens.spacing10};
  left: 0;
  white-space: nowrap;
  background: ${designTokens.colorSurface};
  overflow: hidden;
  z-index: 9999;
  border: 1px solid ${designTokens.colorPrimary};
  border-radius: ${designTokens.borderRadius6};
`;

export { DropdownContainer, DropdownItem, getButtonStyles };
