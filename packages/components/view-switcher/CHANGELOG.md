# @commercetools-uikit/view-switcher

## 15.2.1

### Patch Changes

- Updated dependencies [[`83e33a84c`](https://github.com/commercetools/ui-kit/commit/83e33a84c861ef3cab2eca4333f11cd414546c2b)]:
  - @commercetools-uikit/utils@15.2.1
  - @commercetools-uikit/accessible-button@15.2.1
  - @commercetools-uikit/design-system@15.2.1

## 15.2.0

### Minor Changes

- [#2240](https://github.com/commercetools/ui-kit/pull/2240) [`9c2c553e6`](https://github.com/commercetools/ui-kit/commit/9c2c553e6db90f0d44af7f4c631c5aaf0c70e8c7) Thanks [@tdeekens](https://github.com/tdeekens)! - Add support for using the `<ViewSwitcher>` component in a controlled mode.

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

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/design-system@15.2.0
  - @commercetools-uikit/accessible-button@15.2.0
  - @commercetools-uikit/utils@15.2.0

## 15.1.2

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/design-system@15.1.2
  - @commercetools-uikit/accessible-button@15.1.2
  - @commercetools-uikit/utils@15.1.2

## 15.1.1

### Patch Changes

- Updated dependencies []:
  - @commercetools-uikit/design-system@15.1.1
  - @commercetools-uikit/accessible-button@15.1.1
  - @commercetools-uikit/utils@15.1.1

## 15.1.0

### Minor Changes

- [#2198](https://github.com/commercetools/ui-kit/pull/2198) [`f2f96416b`](https://github.com/commercetools/ui-kit/commit/f2f96416be37ae8aeb9fa49e40e58c0bd7cac837) Thanks [@Rhotimee](https://github.com/Rhotimee)! - Add ViewSwitcher to ui-kit.

  ViewSwitchers allow users to toggle between two or more different views of the same, similar or related content items within the same space on screen.

### Patch Changes

- Updated dependencies [[`6cdd80024`](https://github.com/commercetools/ui-kit/commit/6cdd80024436755b68544992af1f8361cc7ff52a)]:
  - @commercetools-uikit/utils@15.1.0
  - @commercetools-uikit/accessible-button@15.1.0
  - @commercetools-uikit/design-system@15.1.0
