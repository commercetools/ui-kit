import React from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import Tooltip from '../../tooltip';
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
        toggleMenu,
        getToggleButtonProps,
        getItemProps,
        highlightedIndex,
        selectedItem,
      }) => {
        const { onClick, ...restOfToggleButtonProps } = getToggleButtonProps();
        return (
          <div>
            <Tooltip title="Text styles" placement="bottom" off={isOpen}>
              <AccessibleButton
                label={props.label}
                css={getButtonStyles()}
                {...restOfToggleButtonProps}
                onMouseDown={toggleMenu}
              >
                <DropdownLabel>{props.label}</DropdownLabel>
              </AccessibleButton>
            </Tooltip>
            <div style={{ position: 'relative' }}>
              {isOpen ? (
                <DropdownContainer>
                  {props.options.map((item, index) => {
                    const {
                      onClick: dropdownOnClick,
                      ...restOfItemProps
                    } = getItemProps({
                      key: index,
                      index,
                      item,
                    });
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <DropdownItem
                        {...restOfItemProps}
                        onMouseDown={event => {
                          restOfItemProps.onMouseDown(event);
                          onClick(event);
                        }}
                        value={item.value}
                        isSelected={item.value === selectedItem}
                        isHovered={highlightedIndex === index}
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
