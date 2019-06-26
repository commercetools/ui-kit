import React, { Component } from 'react';
import Downshift from 'downshift';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { CaretDownIcon } from '../../icons';
import Spacings from '../../spacings';
import { Button, DropdownContainer } from './dropdown.styles';
import vars from '../../../../materials/custom-properties';

const getItemStyles = props => {
  let backgroundColor = vars.colorSurface;
  if (props.isHovered) {
    backgroundColor = vars.colorNeutral90;
  }
  if (props.isSelectedItem) {
    backgroundColor = vars.colorAccent95;
  }

  return css`
    background-color: ${backgroundColor};
  `;
};

/*                        style={{
                          backgroundColor:
                            highlightedIndex === index
                              ? vars.colorNeutral90
                              : vars.colorSurface,
                          fontWeight:
                            dsSelectedItem === item.value ? 'bold' : 'normal',
*/

const DropdownItem = styled.div`
  padding: 4px;
  ${getItemStyles}
`;

class Dropdown extends Component {
  static displayName = 'Dropdown';

  state = {
    selected: '',
  };

  onChange = selected => {
    this.setState({ selected: selected.value });
    this.props.onChange(selected.value);
  };

  headings = [
    { name: 'Paragraph', value: 'p' },
    { name: 'Headline H1', value: 'h1' },
    { name: 'Headline H2', value: 'h2' },
    { name: 'Headline H3', value: 'h3' },
  ];

  render() {
    return (
      <Downshift
        onChange={this.onChange}
        selectedItem={this.state.selected}
        itemToString={headings => (headings ? headings.name : '')}
      >
        {({
          isOpen,
          getToggleButtonProps,
          getItemProps,
          highlightedIndex,
          selectedItem: dsSelectedItem,
        }) => {
          console.log('dsselectedItem', dsSelectedItem);
          return (
            <div>
              <Button {...getToggleButtonProps()}>
                <Spacings.Inline scale="xs" alignItems="center">
                  <span>Style</span> <CaretDownIcon size="small" />
                </Spacings.Inline>
              </Button>
              <div style={{ position: 'relative' }}>
                {isOpen ? (
                  <DropdownContainer>
                    {this.headings.map((item, index) => (
                      // eslint-disable-next-line react/jsx-key
                      <DropdownItem
                        {...getItemProps({ key: index, index, item })}
                        isSelectedItem={item.value === dsSelectedItem}
                        isHovered={highlightedIndex === index}
                      >
                        {item.name}
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
  }
}

export default Dropdown;
