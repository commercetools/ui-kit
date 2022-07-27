---
"@commercetools-uikit/view-switcher": minor
---

Add support for using the `<ViewSwitcher>` component in a controlled mode.

To make the component controlled you need to pass a prop `selectedValue` and `onChange` to the `<ViewSwitcher.Group>` component.

When the component is controlled, the parent must handle the state updates. This can be useful when the state is maintained for example in the URL.

See example usage:

```jsx
const ControlledExample = () => {
  const [seletedValue, setSelectedValue] = useState('button 1');

  return (
    <ViewSwitcher.Group
      selectedValue={seletedValue}
      onChange={setSelectedValue}
    >
      >
      <ViewSwitcher.Button isDisabled value="button 1">
        View 1
      </ViewSwitcher.Button>
      <ViewSwitcher.Button value="button 2">View 2</ViewSwitcher.Button>
      <ViewSwitcher.Button value="button 3">View 3</ViewSwitcher.Button>
    </ViewSwitcher.Group>
  );
};
```
