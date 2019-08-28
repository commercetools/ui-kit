import React from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import AccessibleButton from '../../buttons/accessible-button';
import {
  getButtonStyles,
  DropdownItem as StyledDropdownItem,
  DropdownContainer,
} from './dropdown.styles';

// eslint-disable-next-line
const Label = props => <span>{props.children}</span>;

const Dropdown = props => {
  const DropdownItem = props.components.DropdownItem || StyledDropdownItem;
  const DropdownLabel = props.components.DropdownLabel || Label;
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
            <AccessibleButton
              label={props.label}
              css={getButtonStyles()}
              {...getToggleButtonProps()}
            >
              <DropdownLabel>{props.label}</DropdownLabel>
            </AccessibleButton>

            <div style={{ position: 'relative' }}>
              {isOpen ? (
                <DropdownContainer>
                  {props.options.map((item, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <DropdownItem
                      {...getItemProps({ key: index, index, item })}
                      value={item.value}
                      isSelected={item.value === selectedItem}
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
  components: PropTypes.shape({
    DropdownItem: PropTypes.func,
    DropdownLabel: PropTypes.func,
  }),
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

Dropdown.defaultProps = {
  components: {},
};

Dropdown.DropdownItem = StyledDropdownItem;

export default Dropdown;
