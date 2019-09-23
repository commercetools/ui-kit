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

const DropdownLabel = props => {
  return (
    <Spacings.Inline scale="xs" alignItems="center" justifyContent="center">
      <span>{props.children}</span>
      <CaretDownIcon size="small" />
    </Spacings.Inline>
  );
};

DropdownLabel.displayName = 'DropdownLabel';
DropdownLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

const DropdownItem = props => {
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
  const buttonRef = React.useRef();

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
                ref={buttonRef}
                label={props.label}
                css={getButtonStyles()}
                {...toggleButtonProps}
                onMouseDown={event => {
                  event.preventDefault();
                  toggleMenu();
                  // because we can't use onClick, let's fire the focus manually
                  if (buttonRef.current) buttonRef.current.focus();
                }}
              >
                <DropdownLabel>{props.label}</DropdownLabel>
              </AccessibleButton>
            </Tooltip>
            {isOpen ? (
              <div
                css={css`
                  position: relative;
                `}
              >
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
              </div>
            ) : null}
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
