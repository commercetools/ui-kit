import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import omit from 'lodash/omit';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
import Spacings from '../../spacings';
import Tooltip from '../../tooltip';
import AccessibleButton from '../../buttons/accessible-button';
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

const propsToRemove = ['onClick'];

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
  const isIndeterminate = props.selectedItems.length > 0;
  const intl = useIntl();

  return (
    <Downshift onSelect={props.onSelect} itemToString={itemToString}>
      {({
        getToggleButtonProps,
        getMenuProps,
        isOpen,
        getItemProps,
        toggleMenu,
        highlightedIndex,
      }) => {
        const toggleButtonProps = omit(getToggleButtonProps(), propsToRemove);

        return (
          <div>
            <Tooltip
              title={intl.formatMessage(
                messages.moreStylesDropdownTooltipTitle
              )}
              placement="bottom"
              off={isOpen}
              styles={{ body: { zIndex: 99999 } }}
            >
              <div>
                <AccessibleButton
                  {...toggleButtonProps}
                  label={props.label}
                  css={getButtonStyles({
                    isIndeterminate,
                    isStyleButton: false,
                  })}
                  onMouseDown={event => {
                    event.preventDefault();
                    toggleMenu();
                  }}
                >
                  <MoreStylesIcon size="medium" />
                </AccessibleButton>
              </div>
            </Tooltip>
            <div
              {...getMenuProps()}
              css={css`
                position: relative;
              `}
            >
              {isOpen ? (
                <DropdownContainer>
                  {props.dropdownOptions.map((item, index) => {
                    const isSelected = props.selectedItems.find(
                      selectedItem => selectedItem === item.value
                    );

                    const itemProps = getItemProps({
                      item,
                      index,
                      key: item.value,
                      value: item.value,
                      isHovered: highlightedIndex === index,
                      isSelected,
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
