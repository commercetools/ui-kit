import PropTypes from 'prop-types';
import { components } from 'react-select';
import { CaretDownIcon } from '@commercetools-uikit/icons';

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    {/* FIXME: add proper tone when tones are refactored */}
    <CaretDownIcon
      color={props.isDisabled ? 'neutral60' : undefined}
      size="small"
    />
  </components.DropdownIndicator>
);

DropdownIndicator.displayName = 'DropdownIndicator';

DropdownIndicator.propTypes = {
  isDisabled: PropTypes.bool,
};

export default DropdownIndicator;
