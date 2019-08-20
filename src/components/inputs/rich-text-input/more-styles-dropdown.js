import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './dropdown';
import Spacings from '../../spacings';
import {
  MoreStylesIcon,
  SuperscriptIcon,
  SubscriptIcon,
  StrikethroughIcon,
} from './icons';

const dropdownOptions = [
  { label: 'Strikethrough', value: 'strikethrough' },
  { label: 'Superscript', value: 'superscript' },
  { label: 'Subscript', value: 'subscript' },
];

// eslint-disable-next-line
const DropdownLabel = () => {
  return <MoreStylesIcon size="medium" />;
};

// eslint-disable-next-line
const DropdownItem = props => {
  // eslint-disable-next-line
  const { children } = props;
  let Icon;
  // eslint-disable-next-line
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
    <Dropdown.DropdownItem {...props}>
      <Spacings.Inline
        scale="xs"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Icon size="medium" />
        <div>{children}</div>
      </Spacings.Inline>
    </Dropdown.DropdownItem>
  );
};

const MoreStylesDropdown = props => (
  <Dropdown
    label="More styles"
    options={dropdownOptions}
    components={{
      DropdownItem,
      DropdownLabel,
    }}
    value={props.value}
    onChange={props.onChange}
  />
);

MoreStylesDropdown.displayName = 'MoreStylesDropdown';

MoreStylesDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MoreStylesDropdown;
