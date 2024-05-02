> THIS COMPONENT IS IN BETA!
> Please be aware that it may be subject to upcoming breaking changes as it's still in active development.

This component enhances the `<DataTable>` component and additionally provides a UI and state management to handle configuration of the table such as column manager.

- The `disableDisplaySettings` enables / disables the layout settings panel, allowing the user to select wrapping text and density display options.
- The `disableColumnManager` enables / disables the column manager panel, allowing the user to select which columns are visible.
- To Detach the `DatatableManager` settings dropdown from the Datatable and position it anywhere else, you would need to import a `DataTableProvider` and wrap both components with the provider.

Both panels delegate the handling of the settings change on the parent through function properties, allowing the settings to be persisted or just used as state props.
