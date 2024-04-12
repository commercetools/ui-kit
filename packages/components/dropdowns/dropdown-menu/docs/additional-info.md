# Additional info

## ListMenuItem

When using the list floating panel, the `DropdownMenu` component exposes an inner sub-component called `DropdownMenu.ListMenuItem` that should be used to render each item in the list.

Clicking on an item will close the panel and call the `onClick` callback with the item's value.

### Properties

| Props        | Type         | Required | Default | Description                                       |
| ------------ | ------------ | :------: | ------- | ------------------------------------------------- |
| `isDisabled` | `boolean`    |          | `false` | Whether the item should be disabled.              |
| `onClick`    | `() => void` |          |         | A callback to be called when the item is clicked. |
| `children`   | `string`     |    ✅    |         | The label for the item.                           |
