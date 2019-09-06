import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Dropdown from './dropdown';
import Spacings from '../../spacings';
import { CaretDownIcon } from '../../icons';

const dropdownOptions = [
  { label: 'Paragraph', value: 'paragraph' },
  { label: 'Headline H1', value: 'heading-one' },
  { label: 'Headline H2', value: 'heading-two' },
  { label: 'Headline H3', value: 'heading-three' },
  { label: 'Headline H4', value: 'heading-four' },
  { label: 'Headline H5', value: 'heading-five' },
  { label: 'Quote', value: 'block-quote' },
  { label: 'Preformatted', value: 'code' },
];

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

// eslint-disable-next-line
const DropdownItem = props => (
  <Dropdown.DropdownItem
    {...props}
    // eslint-disable-next-line react/prop-types
    css={getDropdownItemStyles(props.value)}
  />
);

// eslint-disable-next-line
const DropdownLabel = () => {
  return (
    <Spacings.Inline scale="xs" alignItems="center" justifyContent="center">
      <span>Style</span>
      <CaretDownIcon size="small" />
    </Spacings.Inline>
  );
};

const StyleDropdown = props => (
  <Dropdown
    label="Style"
    options={dropdownOptions}
    components={{
      DropdownLabel,
      DropdownItem,
    }}
    value={props.value}
    onChange={props.onChange}
  />
);

StyleDropdown.displayName = 'StyleDropdown';

StyleDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StyleDropdown;
