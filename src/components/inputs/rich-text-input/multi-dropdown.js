/* eslint-disable max-classes-per-file, react/display-name, react/prop-types */
// You'll find that downshift is a primitive component and
// you'll be most successful wrapping it with another component
// like the MultiDownshift one you see here:

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

const dropdownOptions = [
  { label: 'Strikethrough', value: 'strikethrough' },
  { label: 'Superscript', value: 'superscript' },
  { label: 'Subscript', value: 'subscript' },
];

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

const itemToString = item => item.value;

const MultiDownshift = props => {
  return (
    <Downshift onSelect={props.onSelect} itemToString={itemToString}>
      {({
        getToggleButtonProps,
        getMenuProps,
        isOpen,
        getItemProps,
        highlightedIndex,
      }) => (
        <div>
          <AccessibleButton
            label={props.label}
            css={getButtonStyles()}
            {...getToggleButtonProps()}
          >
            <DropdownLabel />
          </AccessibleButton>
          <div {...getMenuProps({ isOpen })} style={{ position: 'relative' }}>
            {isOpen ? (
              <DropdownContainer>
                {dropdownOptions.map((item, index) => (
                  <DropdownItem
                    key={item.value}
                    value={item.value}
                    isSelectedItem={props.selectedItems.find(
                      anItem => anItem === item.value
                    )}
                    isHovered={highlightedIndex === index}
                    {...getItemProps({
                      item,
                      index,
                      isActive: highlightedIndex === index,
                      isSelected: props.selectedItems.find(
                        anItem => anItem === item.value
                      ),
                    })}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownContainer>
            ) : null}
          </div>
        </div>
      )}
    </Downshift>
  );
};

MultiDownshift.displayName = 'MultiDownshift';

export default MultiDownshift;
