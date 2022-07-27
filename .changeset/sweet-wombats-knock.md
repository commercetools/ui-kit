---
"@commercetools-uikit/label": patch
"@commercetools-uikit/view-switcher": minor
---

Add supported for usage as controlled component to `ViewSwitcher`.

You can now pass a `props` called `selecetedValue` which allows you to control the state of the active button externally. This can be useful when the `ViewSwicher` is used in for instance combination with routing where the active button is part of the URL.

Here is an example of using the `selectedValue` prop using `useState`:

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
