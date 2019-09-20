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
import { BLOCK_TAGS } from './utils/rules';

const propsToRemove = ['onClick'];

const DropdownLabel = () => {
  return (
    <Spacings.Inline scale="xs" alignItems="center" justifyContent="center">
      <span>Style</span>
      <CaretDownIcon size="small" />
    </Spacings.Inline>
  );
};

DropdownLabel.displayName = 'DropdownLabel';

const DropdownItem = props => {
  // const as = optionsMap[props.value] || 'div';
  const as =
    Object.keys(BLOCK_TAGS).find(key => BLOCK_TAGS[key] === props.value) ||
    'div';

  return (
    <StyledDropdownItem
      {...props}
      as={as}
      css={css`
        margin: 0;
      `}
    />
  );
};

DropdownItem.propTypes = {
  value: PropTypes.string.isRequired,
};

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
                position: relative;
              `}
            >
              {isOpen ? (
                <DropdownContainer>
                  {props.options.map((item, index) => {
                    const itemProps = getItemProps({
                      index,
                      item,
                    });
                    const dropdownItemProps = omit(itemProps, propsToRemove);

                    return (
                      <DropdownItem
                        {...dropdownItemProps}
                        key={index}
                        onMouseDown={event => {
                          event.preventDefault();
                          // Prevent Downshift's default 'Enter' behavior.
                          dropdownItemProps.onMouseDown(event);
                          itemProps.onClick(event);
                        }}
                        value={item.value}
                        isSelected={item.value === selectedItem}
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
