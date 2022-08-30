import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-uikit/design-system';

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
  padding: ${customProperties.spacingXs} ${customProperties.spacingS};
  font-family: ${customProperties.fontFamilyDefault};
  display: block;
  background-color: ${(props) =>
    props.isSelected
      ? customProperties.colorAccent95
      : customProperties.colorSurface};

  &:focus,
  &:hover {
    outline: none;
    background-color: ${customProperties.colorNeutral90};
  }
`;

const getButtonStyles = (props: TDropdownStylesProps) => [
  css`
    border: 0;
    font-family: ${customProperties.fontFamilyDefault};
    border-radius: ${customProperties.borderRadius4};
    cursor: pointer;
    font-size: ${customProperties.fontSizeForInput};
    color: ${customProperties.colorSolid};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props.isStyleButton
      ? `calc(${customProperties.spacingXs} - 1px) ${customProperties.spacingS}`
      : customProperties.spacingXs};

    &:hover {
      background-color: ${customProperties.colorNeutral90};
    }
  `,
  props.isIndeterminate &&
    css`
      background-color: ${customProperties.colorAccent95};
    `,
  props.isOpen &&
    css`
      &:not(:hover) {
        background-color: ${customProperties.colorAccent30};
        color: ${customProperties.colorSurface};

        svg {
          fill: ${customProperties.colorSurface};
        }
      }
    `,
  props.isReadOnly &&
    css`
      color: ${customProperties.colorNeutral60};

      svg {
        fill: ${customProperties.colorNeutral60};
      }
    `,
  props.isDisabled &&
    css`
      color: ${customProperties.colorNeutral60};

      svg {
        fill: ${customProperties.colorNeutral60};
      }
    `,
];

const DropdownContainer = styled.div`
  position: absolute;
  cursor: pointer;
  font-size: ${customProperties.fontSizeForInput};
  top: ${customProperties.spacingXs};
  margin-top: ${customProperties.spacingXs};
  left: 0;
  white-space: nowrap;
  background: ${customProperties.colorSurface};
  overflow: hidden;
  z-index: 9999;
  border: 1px solid ${customProperties.colorPrimary};
  border-radius: ${customProperties.borderRadius6};
`;

export { DropdownContainer, DropdownItem, getButtonStyles };
