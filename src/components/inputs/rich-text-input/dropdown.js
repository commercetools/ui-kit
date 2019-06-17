import React from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import { CaretDownIcon } from '../../icons';
import Spacings from '../../spacings';
import { Button, DropdownItem, DropdownContainer } from './dropdown.styles';

const Dropdown = props => {
  return (
    <Downshift
      onChange={props.onChange}
      selectedItem={props.value}
      itemToString={headings => (headings ? headings.label : '')}
    >
      {({
        isOpen,
        getToggleButtonProps,
        getItemProps,
        highlightedIndex,
        selectedItem,
      }) => {
        return (
          <div>
            <Button {...getToggleButtonProps()}>
              <Spacings.Inline scale="xs" alignItems="center">
                <span>{props.label}</span> <CaretDownIcon size="small" />
              </Spacings.Inline>
            </Button>

            <div style={{ position: 'relative' }}>
              {isOpen ? (
                <DropdownContainer>
                  {props.options.map((item, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <DropdownItem
                      {...getItemProps({ key: index, index, item })}
                      isSelectedItem={item.value === selectedItem}
                      isHovered={highlightedIndex === index}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownContainer>
              ) : null}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
};

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
