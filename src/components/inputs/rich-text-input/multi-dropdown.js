/* eslint-disable max-classes-per-file, react/display-name, react/prop-types */

import React from 'react';
import Downshift from 'downshift';
import Spacings from '../../spacings';
import AccessibleButton from '../../buttons/accessible-button';
import Dropdown from './dropdown';
import { getButtonStyles, DropdownContainer } from './dropdown.styles';
import {
  MoreStylesIcon,
  SuperscriptIcon,
  SubscriptIcon,
  StrikethroughIcon,
} from './icons';

// eslint-disable-next-line
const DropdownLabel = () => {
  return <MoreStylesIcon size="medium" />;
};

// eslint-disable-next-line
const DropdownItem = props => {
  // eslint-disable-next-line
  const { children } = props;
  let Icon;
  // eslint-disable-next-line
  switch (props.value) {
    case 'subscript':
      Icon = SubscriptIcon;
      break;
    case 'strikethrough':
      Icon = StrikethroughIcon;
      break;
    default:
      Icon = SuperscriptIcon;
  }

  return (
    <Dropdown.DropdownItem {...props}>
      <Spacings.Inline
        scale="xs"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Icon size="medium" />
        <div>{children}</div>
      </Spacings.Inline>
    </Dropdown.DropdownItem>
  );
};

const itemToString = item => item && item.value;

const MultiDownshift = props => {
  const isIndeterminate = props.selectedItems.length > 0;

  return (
    <Downshift onSelect={props.onSelect} itemToString={itemToString}>
      {({
        getToggleButtonProps,
        getMenuProps,
        isOpen,
        getItemProps,
        highlightedIndex,
      }) => {
        const {
          onClick: onClickToggle,
          ...restOfToggleButtonProps
        } = getToggleButtonProps();
        return (
          <div>
            <AccessibleButton
              {...restOfToggleButtonProps}
              label={props.label}
              css={getButtonStyles({ isIndeterminate })}
              onMouseDown={onClickToggle}
            >
              <DropdownLabel />
            </AccessibleButton>
            <div {...getMenuProps()} style={{ position: 'relative' }}>
              {isOpen ? (
                <DropdownContainer>
                  {props.dropdownOptions.map((item, index) => {
                    const isSelected = props.selectedItems.find(
                      selectedItem => selectedItem === item.value
                    );
                    const {
                      onClick: onClickItem,
                      ...restOfItemProps
                    } = getItemProps({
                      item,
                      index,
                      key: item.value,
                      value: item.value,
                      isHovered: highlightedIndex === index,
                      isSelected,
                    });
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <DropdownItem
                        {...restOfItemProps}
                        onMouseDown={onClickItem}
                      >
                        {item.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownContainer>
              ) : null}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
};

MultiDownshift.displayName = 'MultiDownshift';

export default MultiDownshift;
