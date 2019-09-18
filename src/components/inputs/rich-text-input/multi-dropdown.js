/* eslint-disable max-classes-per-file, react/display-name, react/prop-types */

import React from 'react';
import Downshift from 'downshift';
import Spacings from '../../spacings';
import Tooltip from '../../tooltip';
import AccessibleButton from '../../buttons/accessible-button';
import {
  getButtonStyles,
  DropdownContainer,
  DropdownItem as StyledDropdownItem,
} from './dropdown.styles';
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
    <StyledDropdownItem {...props}>
      <Spacings.Inline
        scale="xs"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Icon size="medium" />
        <div>{children}</div>
      </Spacings.Inline>
    </StyledDropdownItem>
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
        toggleMenu,
        highlightedIndex,
      }) => {
        const {
          onClick: onClickToggle,
          ...restOfToggleButtonProps
        } = getToggleButtonProps();

        return (
          <div>
            <Tooltip
              title="More styles"
              placement="bottom"
              off={isOpen}
              styles={{ body: { zIndex: 99999 } }}
            >
              <div>
                <AccessibleButton
                  {...restOfToggleButtonProps}
                  label={props.label}
                  css={getButtonStyles({
                    isIndeterminate,
                    isStyleButton: false,
                  })}
                  onMouseDown={event => {
                    event.preventDefault();
                    toggleMenu();
                  }}
                >
                  <DropdownLabel />
                </AccessibleButton>
              </div>
            </Tooltip>
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
                        onMouseDown={event => {
                          event.preventDefault();
                          restOfItemProps.onMouseDown(event);
                          onClickItem(event);
                        }}
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
