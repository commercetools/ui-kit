import { DataTableManager } from './data-table-manager';

export default DataTableManager;
export { DataTableManager };
export { UPDATE_ACTIONS } from './constants';
export { default as version } from './version';

// Re-exports for convenience
export { useRowSelection, useSorting } from '@commercetools-uikit/hooks';
