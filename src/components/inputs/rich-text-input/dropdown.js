import React from 'react';
import Downshift from 'downshift';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import Spacings from '../../spacings';
import { CaretDownIcon } from '../../icons';
import Tooltip from '../../tooltip';
import AccessibleButton from '../../buttons/accessible-button';
import {
  getButtonStyles,
  DropdownContainer,
  DropdownItem as StyledDropdownItem,
} from './dropdown.styles';

const propsToRemove = ['onClick'];

const getDropdownItemStyles = value => {
  switch (value) {
    case 'heading-one':
      return css`
        font-size: 1.75rem;
      `;
    case 'heading-two':
      return css`
        font-size: 1.5rem;
      `;
    case 'heading-three':
      return css`
        font-size: 1.3rem;
      `;
    case 'heading-four':
      return css`
        font-size: 1.2rem;
      `;
    case 'heading-five':
      return css`
        font-size: 1.1rem;
      `;

    default:
      return css``;
  }
};

const DropdownLabel = () => {
  return (
    <Spacings.Inline scale="xs" alignItems="center" justifyContent="center">
      <span>Style</span>
      <CaretDownIcon size="small" />
    </Spacings.Inline>
  );
};

DropdownLabel.displayName = 'DropdownLabel';

const DropdownItem = props => (
  <StyledDropdownItem
    {...props}
    // eslint-disable-next-line react/prop-types
    css={getDropdownItemStyles(props.value)}
  />
);

DropdownItem.displayName = 'DropdownItem';

const Dropdown = props => {
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
        const toggleButtonProps = omit(getToggleButtonProps(), propsToRemove);

        return (
          <div>
            <Tooltip
              title="Text styles"
              placement="bottom"
              off={isOpen}
              style={{ body: { zIndex: 9999 } }}
            >
              <AccessibleButton
                label={props.label}
                css={getButtonStyles()}
                {...toggleButtonProps}
                onMouseDown={event => {
                  event.preventDefault();
                  toggleMenu();
                }}
              >
                <DropdownLabel>{props.label}</DropdownLabel>
              </AccessibleButton>
            </Tooltip>
            <div
              css={css`
                display: relative;
              `}
            >
              {isOpen ? (
                <DropdownContainer>
                  {props.options.map((item, index) => {
                    const itemProps = getItemProps({
                      key: index,
                      index,
                      item,
                    });
                    const dropdownItemProps = omit(itemProps, propsToRemove);

                    return (
                      // eslint-disable-next-line react/jsx-key
                      <DropdownItem
                        {...dropdownItemProps}
                        onMouseDown={event => {
                          event.preventDefault();
                          dropdownItemProps.onMouseDown(event);
                          itemProps.onClick(event);
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
