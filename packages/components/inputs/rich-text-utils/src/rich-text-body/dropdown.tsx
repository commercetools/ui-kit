//@ts-nocheck
import { ElementType, FunctionComponent } from 'react';
import DownshiftUntyped, {
  GetItemPropsOptions,
  GetToggleButtonPropsOptions,
} from 'downshift';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Tooltip from '@commercetools-uikit/tooltip';
import Button from './rich-text-body-button';
import {
  getButtonStyles,
  DropdownContainer,
  DropdownItem as StyledDropdownItem,
} from './dropdown.styles';

type Props = {
  label: string;
  isMulti: boolean;
  value: string[] | string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onChange?: (event?: unknown) => void;
  components: {
    Item: FunctionComponent<unknown>;
    Label: FunctionComponent<unknown>;
  };
  options: Array<TItem>;
};

type TItem = {
  value: string;
  label: string;
};

const getIsSelected = (props: Props, item: TItem) =>
  !props.isMulti
    ? item.value === (props.value as string)
    : (props.value as string[]) &&
      (props.value as string[]).find(
        (selectedItem) => selectedItem === item.value
      );

const Label = styled.div;

const Dropdown = (props: Props) => {
  const DropdownItem: FunctionComponent<{
    value: string | string[];
    isSelected: unknown;
  }> = props.components.Item;
  const DropdownLabel = props.components.Label;
  const isIndeterminate: boolean =
    props.isMulti &&
    (props.value as unknown[]) &&
    (props.value as unknown[]).length > 0;

  type THeadings = {
    label?: string;
  };

  const Downshift = DownshiftUntyped as ElementType;

  return (
    <Downshift
      onChange={props.onChange}
      selectedItem={props.value}
      itemToString={(headings: THeadings) => (headings ? headings?.label : '')}
    >
      {({
        isOpen,
        getToggleButtonProps,
        getItemProps,
      }: {
        isOpen: boolean;
        getToggleButtonProps: (
          options?: GetToggleButtonPropsOptions
        ) => unknown;
        getItemProps: (options: GetItemPropsOptions<unknown>) => unknown;
      }) => {
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
                  {props.options.map((item: TItem, index: number) => {
                    const itemProps = getItemProps({
                      index,
                      item,
                    });
                    const dropdownItemProps = itemProps;
                    const isSelected = getIsSelected(props, item as TItem);

                    return (
                      <DropdownItem
                        {...dropdownItemProps}
                        key={index}
                        value={item.value}
                        isSelected={isSelected}
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
