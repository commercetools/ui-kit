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
};

const DropdownItem = styled.button<TDropdownStylesProps>`
  width: 100%;
  border: 0;
  font-size: 1rem;
  cursor: pointer;
  padding: ${designTokens.spacingXs} ${designTokens.spacingS};
  font-family: ${designTokens.fontFamilyDefault};
  display: block;
  background-color: ${(props) =>
    props.isSelected ? designTokens.colorAccent95 : designTokens.colorSurface};

  &:focus,
  &:hover {
    outline: none;
    background-color: ${designTokens.colorNeutral90};
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
      ? `calc(${designTokens.spacingXs} - 1px) ${designTokens.spacingS}`
      : designTokens.spacingXs};

    &:hover {
      background-color: ${designTokens.colorNeutral90};
    }
  `,
  props.isIndeterminate &&
    css`
      background-color: ${designTokens.colorAccent95};
    `,
  props.isOpen &&
    css`
      &:not(:hover) {
        background-color: ${designTokens.colorAccent30};
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
  top: ${designTokens.spacingXs};
  margin-top: ${designTokens.spacingXs};
  left: 0;
  white-space: nowrap;
  background: ${designTokens.colorSurface};
  overflow: hidden;
  z-index: 9999;
  border: 1px solid ${designTokens.colorPrimary};
  border-radius: ${designTokens.borderRadius6};
`;

export { DropdownContainer, DropdownItem, getButtonStyles };
