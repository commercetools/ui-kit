/// <reference types="@emotion/react/types/css-prop" />
import type { ElementType, FunctionComponent, ReactNode } from 'react';
import DownshiftUntyped, { type ControllerStateAndHelpers } from 'downshift';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Tooltip from '@commercetools-uikit/tooltip';
import Button from './rich-text-body-button';
import {
  getButtonStyles,
  DropdownContainer,
  DropdownItem as StyledDropdownItem,
} from './dropdown.styles';

export type TDropdownLabel = {
  children: ReactNode;
};

type TDropdownProps = {
  label: string;
  isMulti: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onChange?: ({ value }: TItem) => void;
  components: {
    Item: FunctionComponent<unknown>;
    Label: FunctionComponent<TDropdownLabel>;
  };
  options: Array<TItem>;
  getIsItemSelected: ({ value }: TItem) => boolean;
};

type TItem = {
  value: string;
  label: string;
};

type THeadings = {
  label?: string;
};

const Label = styled.div;

const Dropdown = (props: TDropdownProps) => {
  const DropdownItem: FunctionComponent<{
    value: string;
    isSelected: boolean;
  }> = props.components.Item;
  const DropdownLabel = props.components.Label;

  const isIndeterminate =
    props.isMulti &&
    props.options.some((item) => props.getIsItemSelected(item) === true);

  const Downshift = DownshiftUntyped as ElementType;

  return (
    <Downshift
      onChange={props.onChange}
      itemToString={(headings: THeadings) => headings?.label || ''}
    >
      {({
        isOpen,
        getToggleButtonProps,
        getItemProps,
      }: ControllerStateAndHelpers<unknown>) => {
        const toggleButtonProps = getToggleButtonProps();

        return (
          <div>
            <Tooltip
              title={props.label}
              placement="bottom"
              off={isOpen}
              styles={{ body: { zIndex: 9999 } }}
            >
              <Button
                {...toggleButtonProps}
                label={props.label}
                css={getButtonStyles({
                  isOpen,
                  isIndeterminate,
                  isStyleButton: !props.isMulti,
                  isDisabled: props.isDisabled,
                  isReadOnly: props.isReadOnly,
                })}
              >
                <DropdownLabel>{props.label}</DropdownLabel>
              </Button>
            </Tooltip>
            {isOpen ? (
              <div
                css={css`
                  position: relative;
                `}
              >
                <DropdownContainer>
                  {props.options.map((item, index) => {
                    const itemProps = getItemProps({
                      index,
                      item,
                    });
                    const dropdownItemProps = itemProps;

                    return (
                      <DropdownItem
                        {...dropdownItemProps}
                        key={index}
                        value={item.value}
                        isSelected={props.getIsItemSelected(item)}
                      >
                        {item.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownContainer>
              </div>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
};

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  components: {
    Item: StyledDropdownItem,
    Label,
  },
  isMulti: false,
};

export default Dropdown;
