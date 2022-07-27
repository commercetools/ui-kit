import { useState } from 'react';
import ViewSwitcher from '@commercetools-uikit/view-switcher';

/**
 * 1. Uncontrolled mode
 *
 * The component controls its own internal state and switching between options.
 * The `defaultSelected` value is only used on the initial render. Changes to that value
 * are not reflected in the component state.
 */
const UncontrolledExample = () => (
  <ViewSwitcher.Group
    defaultSelected="button 2"
    onChange={(value) => console.log(value)}
  >
    <ViewSwitcher.Button isDisabled value="button 1">
      View 1
    </ViewSwitcher.Button>
    <ViewSwitcher.Button value="button 2">View 2</ViewSwitcher.Button>
    <ViewSwitcher.Button value="button 3">View 3</ViewSwitcher.Button>
  </ViewSwitcher.Group>
);

/**
 * 2. Controlled mode
 *
 * The component is controlled from a parent component, using the prop `selectedValue`.
 * The component does not use an internal state and the parent must implement the `onChange` callback.
 */
const ControlledExample = () => {
  const [seletedValue, setSelectedValue] = useState('button 1');

  return (
    <ViewSwitcher.Group
      selectedValue={seletedValue}
      onChange={setSelectedValue}
    >
      <ViewSwitcher.Button isDisabled value="button 1">
        View 1
      </ViewSwitcher.Button>
      <ViewSwitcher.Button value="button 2">View 2</ViewSwitcher.Button>
      <ViewSwitcher.Button value="button 3">View 3</ViewSwitcher.Button>
    </ViewSwitcher.Group>
  );
};

export { UncontrolledExample, ControlledExample };
