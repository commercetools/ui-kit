import * as i18n from '@commercetools-uikit/i18n';

export { i18n };

// NOTE: to make sure that the following preset packages to not
// export a `version` property, as export properties cannot be overridden.
export * from '@commercetools-uikit/buttons';
export * from '@commercetools-uikit/fields';
export * from '@commercetools-uikit/icons';
export * from '@commercetools-uikit/inputs';

export {
  default as LeadingIcon,
  type TLeadingIconProps,
} from '@commercetools-uikit/icons/leading-icon';
export {
  default as CustomIcon,
  type TCustomIconProps,
} from '@commercetools-uikit/icons/custom-icon';
export {
  default as InlineSvg,
  type InlineSvgProps,
} from '@commercetools-uikit/icons/inline-svg';
export {
  default as AccessibleHidden,
  type TAccessibleHiddenProps,
} from '@commercetools-uikit/accessible-hidden';
export {
  default as Avatar,
  type TAvatarProps,
} from '@commercetools-uikit/avatar';
export { default as Card, type TCardProps } from '@commercetools-uikit/card';
export { default as Link } from '@commercetools-uikit/link';
export {
  default as Collapsible,
  type TCollapsibleProps,
} from '@commercetools-uikit/collapsible';
export {
  default as CollapsibleMotion,
  type TCollapsibleMotionProps,
  type TContainerStyles,
  type TRenderFunctionOptions,
} from '@commercetools-uikit/collapsible-motion';
export {
  default as CollapsiblePanel,
  type TCollapsiblePanel,
} from '@commercetools-uikit/collapsible-panel';
export {
  default as Constraints,
  type THorizontalProps,
  type TMaxProp,
} from '@commercetools-uikit/constraints';
export {
  ContentNotification,
  type TContentNotificationProps,
} from '@commercetools-uikit/notifications';
export {
  default as PrimaryActionDropdown,
  Option as PrimaryActionDropdownOption,
  type TPrimaryActionDropdown,
} from '@commercetools-uikit/primary-action-dropdown';
export {
  default as DropdownMenu,
  type TDropdownMenuProps,
  type TDropdownMenuContextProps,
  type TDropdownContentMenuProps,
  type TDropdownListMenuProps,
  type TDropdownListMenuItemProps,
  type TDropdownTriggerProps,
} from '@commercetools-uikit/dropdown-menu';
export {
  default as FieldLabel,
  type TFieldLabelProps,
} from '@commercetools-uikit/field-label';
export {
  default as FieldErrors,
  type TFieldErrors,
} from '@commercetools-uikit/field-errors';
/** TODO: Add Types w/next release */
export {
  default as Filters,
  type TFiltersProps,
  type TFilterConfiguration,
  type TFilterGroupConfiguration,
  type TAppliedFilter,
} from '@commercetools-uikit/filters';
export {
  default as Grid,
  type TGridItemProps,
  type TGridProps,
} from '@commercetools-uikit/grid';
export { default as Label, type TLabelProps } from '@commercetools-uikit/label';
export {
  default as LoadingSpinner,
  type TLoadingSpinnerProps,
} from '@commercetools-uikit/loading-spinner';
export {
  ErrorMessage,
  WarningMessage,
  type TAdditionalInfoProps,
  type TErrorMessageProps,
  type TIntlMessageDescriptor,
} from '@commercetools-uikit/messages';
export {
  PageNavigator,
  PageSizeSelector,
  Pagination,
  type TPaginationProps,
} from '@commercetools-uikit/pagination';
export {
  default as ProgressBar,
  type TProgressBarProps,
} from '@commercetools-uikit/progress-bar';
/** TODO: Add Types w/next release */
export {
  default as QuickFilters,
  type TQuickFiltersProps,
} from '@commercetools-uikit/quick-filters';
/** TODO: Add Types w/next release */
export {
  default as Spacings,
  type TSpacings,
  type TInlineProps,
  type TInsetProps,
  type TInsetSquishProps,
  type TStackProps,
} from '@commercetools-uikit/spacings';
export {
  default as Stamp,
  type TStampProps,
  type TTone as TStampTone,
} from '@commercetools-uikit/stamp';
export {
  default as DataTable,
  type TRow,
  type TColumn,
  type TDataTableProps,
} from '@commercetools-uikit/data-table';
export {
  default as DataTableManager,
  type TDataTableManagerProps,
  type TColumnProps,
  type TColumnData,
  type TDataTableSettingsProps,
  type TColumnSettingsManagerProps,
  type TDataTableManagerContext,
} from '@commercetools-uikit/data-table-manager';
export {
  Tag,
  TagList,
  type TTagProps,
  type TTagListProps,
  type TTagBodyProps,
} from '@commercetools-uikit/tag';
export {
  default as Tooltip,
  type TTooltipProps,
  type TComponents,
} from '@commercetools-uikit/tooltip';
export {
  default as Text,
  type TBasicTextProps,
  type TTone as TTextTone,
} from '@commercetools-uikit/text';
export {
  default as ViewSwitcher,
  type TViewSwitcherProps,
} from '@commercetools-uikit/view-switcher';

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
