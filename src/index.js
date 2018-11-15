/* This is the entry point of the public package interface */

import '../materials/internals/grid.mod.css';
import '../materials/internals/reset.mod.css';
import * as i18n from '../i18n';
import * as Icons from './components/icons';

export {
  default as AccessibleButton,
} from './components/buttons/accessible-button';
export { default as FlatButton } from './components/buttons/flat-button';
export { default as GhostButton } from './components/buttons/ghost-button';
export { default as IconButton } from './components/buttons/icon-button';
export { default as LinkButton } from './components/buttons/link-button';
export { default as PrimaryButton } from './components/buttons/primary-button';
export {
  default as SecondaryButton,
} from './components/buttons/secondary-button';
export {
  default as SecondaryIconButton,
} from './components/buttons/secondary-icon-button';

export { default as Collapsible } from './components/collapsible';
export { default as CollapsibleMotion } from './components/collapsible-motion';

export {
  default as PrimaryActionDropdown,
  Option as PrimaryActionDropdownOption,
} from './components/dropdowns/primary-action-dropdown';

export { default as FieldLabel } from './components/field-label';

export { default as TextField } from './components/fields/text-field';
export {
  default as MultilineTextField,
} from './components/fields/multiline-text-field';
export {
  default as LocalizedTextField,
} from './components/fields/localized-text-field';
export {
  default as LocalizedMultilineTextField,
} from './components/fields/localized-multiline-text-field';
export { default as NumberField } from './components/fields/number-field';
export { default as MoneyField } from './components/fields/money-field';
export { default as SelectField } from './components/fields/select-field';
export {
  default as AsyncSelectField,
} from './components/fields/async-select-field';
export {
  default as CreatableSelectField,
} from './components/fields/creatable-select-field';
export {
  default as AsyncCreatableSelectField,
} from './components/fields/async-creatable-select-field';

export { Icons };
// TODO: this type of export is deprecated and should be removed in the next major release
export * from './components/icons';

export {
  default as AsyncCreatableSelectInput,
} from './components/inputs/async-creatable-select-input';
export {
  default as AsyncSelectInput,
} from './components/inputs/async-select-input';
export {
  default as CreatableSelectInput,
} from './components/inputs/creatable-select-input';
export { default as DateInput } from './components/inputs/date-input';
export { default as DateTimeInput } from './components/inputs/date-time-input';
export {
  default as LocalizedMultilineTextInput,
} from './components/inputs/localized-multiline-text-input';
export {
  default as LocalizedTextInput,
} from './components/inputs/localized-text-input';
export { default as MoneyInput } from './components/inputs/money-input';
export {
  default as MultilineTextInput,
} from './components/inputs/multiline-text-input';
export { default as NumberInput } from './components/inputs/number-input';
export { default as PasswordInput } from './components/inputs/password-input';
export { default as SelectInput } from './components/inputs/select-input';
export { default as TextInput } from './components/inputs/text-input';
export { default as TimeInput } from './components/inputs/time-input';

export { default as Label } from './components/label';

export { default as LoadingSpinner } from './components/loading-spinner';

export { default as ErrorMessage } from './components/messages/error-message';
export {
  default as WarningMessage,
} from './components/messages/warning-message';

export {
  default as CollapsiblePanel,
} from './components/panels/collapsible-panel';

export { default as Stamp } from './components/stamp';

export { default as Constraints } from './components/constraints';
export { default as Spacings } from './components/spacings';

export { Radio, Checkbox, Toggle } from './components/switches';

export { default as Table } from './components/table';
export { default as BaseTable } from './components/table/base-table';
export { default as TableCell } from './components/table/cell';

export { default as Tag } from './components/tag';

export { default as TimeRangePicker } from './components/time-range-picker';

export { default as Text } from './components/typography/text';

export { default as withMouseDownState } from './hocs/with-mouse-down-state';
export { default as withMouseOverState } from './hocs/with-mouse-over-state';

export {
  default as customProperties,
} from '../materials/custom-properties.json';

export { i18n };
