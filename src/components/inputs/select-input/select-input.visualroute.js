import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SelectInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const defaultOptions = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

const longOptions = defaultOptions.concat([
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
  { value: 'six', label: 'Six' },
  { value: 'seven', label: 'Seven' },
  { value: 'eight', label: 'Eight' },
]);

const options = defaultOptions;

const optionsWithGroups = [
  { label: 'Numbers', options: longOptions },
  {
    label: 'Animals',
    options: [
      { value: 'cats', label: 'Cats' },
      { value: 'dogs', label: 'Dogs' },
    ],
  },
];

const value = 'one';

export const routePath = '/select-input';

const DefaultRoute = () => (
  <Suite>
    <Spec label="minimal">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <SelectInput
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <SelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        placeholder="Select something"
      />
    </Spec>
    <Spec label="with error">
      <SelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <SelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <SelectInput
        value={null}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with multiple values selected">
      <SelectInput
        value={['one', 'two']}
        onChange={() => {}}
        options={options}
        isMulti={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with multiple values selected and disabled">
      <SelectInput
        value={['one', 'two']}
        onChange={() => {}}
        options={options}
        isMulti={true}
        isDisabled={true}
        horizontalConstraint="m"
      />
    </Spec>
  </Suite>
);

const OpenRoute = () => (
  <Suite>
    <Spec label="option without option groups">
      <SelectInput
        id="select-input"
        value={value}
        onChange={() => {}}
        options={longOptions}
        horizontalConstraint="m"
      />
    </Spec>
  </Suite>
);

const OpenRouteWithOptionGroups = () => (
  <Suite>
    <Spec label="option group with no divider">
      <SelectInput
        id="select-input"
        value={value}
        onChange={() => {}}
        options={optionsWithGroups}
        horizontalConstraint="m"
      />
    </Spec>
  </Suite>
);

const OpenRouteWithOptionGroupsAndDivider = () => (
  <Suite>
    <Spec label="option group with divider">
      <SelectInput
        id="select-input"
        value={value}
        onChange={() => {}}
        options={optionsWithGroups}
        horizontalConstraint="m"
        showOptionGroupDivider={true}
      />
    </Spec>
  </Suite>
);

export const component = () => (
  <Switch>
    <Route path={`${routePath}/open`} component={OpenRoute} />
    <Route
      path={`${routePath}/open-with-option-groups`}
      component={OpenRouteWithOptionGroups}
    />
    <Route
      path={`${routePath}/open-with-option-groups-and-divider`}
      component={OpenRouteWithOptionGroupsAndDivider}
    />
    <Route path={routePath} component={DefaultRoute} />
  </Switch>
);
