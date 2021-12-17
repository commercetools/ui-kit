import { components, DropdownIndicatorProps } from 'react-select';
import { CaretDownIcon } from '@commercetools-uikit/icons';

const DropdownIndicator = (props: DropdownIndicatorProps) => (
  <components.DropdownIndicator {...props}>
    {/* FIXME: add proper tone when tones are refactored */}
    <CaretDownIcon
      color={props.isDisabled ? 'neutral60' : undefined}
      size="small"
    />
  </components.DropdownIndicator>
);

DropdownIndicator.displayName = 'DropdownIndicator';

export default DropdownIndicator;
