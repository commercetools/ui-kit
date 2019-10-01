import React from 'react';
import Downshift from 'downshift';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Spacings from '../../spacings';
import { CaretDownIcon } from '../../icons';
import Tooltip from '../../tooltip';
import Button from './rich-text-body-button';
import {
  getButtonStyles,
  DropdownContainer,
  DropdownItem as StyledDropdownItem,
} from './dropdown.styles';
import { BLOCK_TAGS } from '../rich-text-utils/tags';
import messages from './messages';

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

const Item = styled.div`
  margin: 0;
  text-align: left;
`;

const DropdownItem = props => {
  const { children } = props;
  const as =
    Object.keys(BLOCK_TAGS).find(key => BLOCK_TAGS[key] === props.value) ||
    'div';

  return (
    <StyledDropdownItem {...props}>
      <Item as={as}>{children}</Item>
    </StyledDropdownItem>
  );
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
};

DropdownItem.displayName = 'DropdownItem';

const Dropdown = props => {
  const intl = useIntl();

  return (
    <Downshift
      onChange={props.onChange}
      selectedItem={props.value}
      itemToString={headings => (headings ? headings.label : '')}
    >
      {({ isOpen, getToggleButtonProps, getItemProps, selectedItem }) => {
        const toggleButtonProps = getToggleButtonProps();

        return (
          <div>
            <Tooltip
              title={intl.formatMessage(messages.styleDropdownTooltipTitle)}
              placement="bottom"
              off={isOpen}
              style={{ body: { zIndex: 9999 } }}
            >
              <Button
                {...toggleButtonProps}
                label={props.label}
                css={getButtonStyles({ isOpen, isStyleButton: true })}
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

                    return (
                      <DropdownItem
                        {...dropdownItemProps}
                        key={index}
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
