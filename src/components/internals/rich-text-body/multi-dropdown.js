import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
import Spacings from '../../spacings';
import Tooltip from '../../tooltip';
import Button from './rich-text-body-button';
import {
  getButtonStyles,
  DropdownContainer,
  DropdownItem as StyledDropdownItem,
} from './dropdown.styles';
import {
  MoreStylesIcon,
  SuperscriptIcon,
  SubscriptIcon,
  StrikethroughIcon,
} from './icons';
import messages from './messages';

const DropdownItem = props => {
  let Icon;
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
    <StyledDropdownItem {...props}>
      <Spacings.Inline
        scale="xs"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Icon size="medium" />
        <div>{props.children}</div>
      </Spacings.Inline>
    </StyledDropdownItem>
  );
};

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const itemToString = item => item && item.value;

const MultiDownshift = props => {
  const isIndeterminate = props.selectedItems && props.selectedItems.length > 0;
  const intl = useIntl();

  return (
    <Downshift onSelect={props.onSelect} itemToString={itemToString}>
      {({ getToggleButtonProps, getMenuProps, isOpen, getItemProps }) => {
        return (
          <div>
            <Tooltip
              title={intl.formatMessage(messages.moreStylesDropdownLabel)}
              placement="bottom"
              off={isOpen}
              styles={{ body: { zIndex: 99999 } }}
            >
              <Button
                {...getToggleButtonProps()}
                label={props.label}
                css={getButtonStyles({
                  isIndeterminate,
                  isStyleButton: false,
                  isOpen,
                })}
              >
                <MoreStylesIcon size="medium" />
              </Button>
            </Tooltip>
            <div
              {...getMenuProps()}
              css={css`
                position: relative;
              `}
            >
              {isOpen ? (
                <DropdownContainer>
                  <div
                    css={css`
                      position: relative;
                    `}
                  >
                    {props.dropdownOptions.map((item, index) => {
                      const isSelected = props.selectedItems.find(
                        selectedItem => selectedItem === item.value
                      );

                      const itemProps = getItemProps({
                        item,
                        index,
                        value: item.value,
                        isSelected,
                      });

                      const dropdownItemProps = itemProps;

                      return (
                        <DropdownItem {...dropdownItemProps} key={item.value}>
                          {item.label}
                        </DropdownItem>
                      );
                    })}
                  </div>
                </DropdownContainer>
              ) : null}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
};

MultiDownshift.propTypes = {
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  dropdownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

MultiDownshift.displayName = 'MultiDownshift';

export default MultiDownshift;
