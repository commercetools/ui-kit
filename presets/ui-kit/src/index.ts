import * as i18n from '@commercetools-uikit/i18n';

export { i18n };

// NOTE: to make sure that the following preset packages to not
// export a `version` property, as export properties cannot be overridden.
export * from '@commercetools-uikit/buttons';
export * from '@commercetools-uikit/fields';
export * from '@commercetools-uikit/icons';
export * from '@commercetools-uikit/inputs';

export { default as AccessibleHidden } from '@commercetools-uikit/accessible-hidden';
export { default as Avatar } from '@commercetools-uikit/avatar';
export { default as Card } from '@commercetools-uikit/card';
export { default as Link } from '@commercetools-uikit/link';
export { default as Collapsible } from '@commercetools-uikit/collapsible';
export { default as CollapsibleMotion } from '@commercetools-uikit/collapsible-motion';
export { default as CollapsiblePanel } from '@commercetools-uikit/collapsible-panel';
export { default as Constraints } from '@commercetools-uikit/constraints';
export { ContentNotification } from '@commercetools-uikit/notifications';
export {
  default as PrimaryActionDropdown,
  Option as PrimaryActionDropdownOption,
} from '@commercetools-uikit/primary-action-dropdown';
export { default as FieldLabel } from '@commercetools-uikit/field-label';
export { default as FieldErrors } from '@commercetools-uikit/field-errors';
export { default as Grid } from '@commercetools-uikit/grid';
export { default as Label } from '@commercetools-uikit/label';
export { default as LoadingSpinner } from '@commercetools-uikit/loading-spinner';
export { ErrorMessage, WarningMessage } from '@commercetools-uikit/messages';
export {
  PageNavigator,
  PageSizeSelector,
  Pagination,
} from '@commercetools-uikit/pagination';
export { default as ProgressBar } from '@commercetools-uikit/progress-bar';
export { default as Spacings } from '@commercetools-uikit/spacings';
export { default as Stamp } from '@commercetools-uikit/stamp';
export { default as DataTable } from '@commercetools-uikit/data-table';
export { default as DataTableManager } from '@commercetools-uikit/data-table-manager';
export { Tag, TagList } from '@commercetools-uikit/tag';
export { default as Tooltip } from '@commercetools-uikit/tooltip';
export { default as Text } from '@commercetools-uikit/text';
export { default as ViewSwitcher } from '@commercetools-uikit/view-switcher';

// Expose certain useful hooks
export {
  useToggleState,
  useSorting,
  useRowSelection,
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';

export {
  /** @deprecated use `designTokens` instead */
  customProperties,
  designTokens,
} from '@commercetools-uikit/design-system';

export { default as version } from './version';
