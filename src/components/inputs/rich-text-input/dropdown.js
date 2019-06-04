import React from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import AccessibleButton from '../../buttons/accessible-button';
import { CaretDownIcon } from '../../icons';
import Spacings from '../../spacings';
import {
  getButtonStyles,
  DropdownItem as StyledDropdownItem,
  DropdownContainer,
} from './dropdown.styles';

const Dropdown = props => {
  const DropdownItem = props.components.DropdownItem || StyledDropdownItem;
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
              <Spacings.Inline scale="xs" alignItems="center">
                {props.label}{' '}
                {props.showCaret && <CaretDownIcon size="small" />}
              </Spacings.Inline>
            </AccessibleButton>

            <div style={{ position: 'relative' }}>
              {isOpen ? (
                <DropdownContainer>
                  {props.options.map((item, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <DropdownItem
                      {...getItemProps({ key: index, index, item })}
                      value={item.value}
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
  components: PropTypes.shape({
    DropdownItem: PropTypes.element,
  }),
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  showCaret: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  components: {},
  showCaret: true,
};

Dropdown.DropdownItem = StyledDropdownItem;

export default Dropdown;
