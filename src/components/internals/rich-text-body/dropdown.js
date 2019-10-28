import React from 'react';
import { isValidElementType } from 'react-is';
import Downshift from 'downshift';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Tooltip from '../../tooltip';
import Button from './rich-text-body-button';
import {
  getButtonStyles,
  DropdownContainer,
  DropdownItem as StyledDropdownItem,
} from './dropdown.styles';

const Label = styled.div;

const Dropdown = props => {
  const DropdownItem = props.components.Item;
  const DropdownLabel = props.components.Label;
  const isIndeterminate =
    props.isMulti && (props.value && props.value.length > 0);

  return (
    <Downshift
      onChange={props.onChange}
      selectedItem={props.value}
      itemToString={headings => (headings ? headings.label : '')}
    >
      {({ isOpen, getToggleButtonProps, getItemProps }) => {
        const toggleButtonProps = getToggleButtonProps();

        return (
          <div>
            <Tooltip
              title={props.label}
              placement="bottom"
              off={isOpen}
              style={{ body: { zIndex: 9999 } }}
            >
              <Button
                {...toggleButtonProps}
                label={props.label}
                css={getButtonStyles({
                  isOpen,
                  isIndeterminate,
                  isStyleButton: !props.isMulti,
                  isDisabled: props.isDisabled,
                  isReadOnly: props.isReadOnly,
                })}
              >
                <DropdownLabel>{props.label}</DropdownLabel>
              </Button>
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
                    const dropdownItemProps = itemProps;
                    const isSelected = !props.isMulti
                      ? item.value === props.value
                      : props.value.find(
                          selectedItem => selectedItem === item.value
                        );

                    return (
                      <DropdownItem
                        {...dropdownItemProps}
                        key={index}
                        value={item.value}
                        isSelected={isSelected}
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

Dropdown.defaultProps = {
  components: {
    Item: StyledDropdownItem,
    Label,
  },
  isMulti: false,
};

Dropdown.propTypes = {
  label: PropTypes.string,
  isMulti: PropTypes.bool,
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  components: PropTypes.shape({
    Item: (props, propName) => {
      if (props[propName] && !isValidElementType(props[propName])) {
        return new Error(
          `Invalid prop 'components.Item' supplied to 'Dropdown': the prop is not a valid React component`
        );
      }
      return null;
    },
    Label: (props, propName) => {
      if (props[propName] && !isValidElementType(props[propName])) {
        return new Error(
          `Invalid prop 'components.Item' supplied to 'Dropdown': the prop is not a valid React component`
        );
      }
      return null;
    },
  }),
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
