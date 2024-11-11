The `Filters` component pattern is a component that provides the controls to filter the items in a table or list.

- Available filter controls are configured in the `filters` array. Each `filter` object includes a `filterMenuConfiguration` object, in which the inputs that allow the user to select a value for that filter are defined.

- The selected values for each filter are passed to the component in the `appliedFilters` array. Values in the `appliedFilters` array will be displayed in each filter's menu button.
