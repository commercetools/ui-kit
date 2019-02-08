import React from 'react';
import { SelectInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];
const optionsWithGroups = [
  { label: 'one', options: [{ value: 'one', label: 'One' }] },
  { options: [{ value: 'two', label: 'Two' }] },
];

const value = 'one';

const showOptionGroupDivider = true;

export const routePath = '/select-input-open';

export const component = () => (
  <Suite>
    <Spec label="option without option groups">
      <SelectInput
        id="select-input-1"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="option group with no divider">
      <SelectInput
        id="select-input-2"
        value={value}
        onChange={() => {}}
        options={optionsWithGroups}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="options groups with divider">
      <SelectInput
        id="select-input-3"
        value={value}
        onChange={() => {}}
        options={optionsWithGroups}
        horizontalConstraint="m"
        showOptionGroupDivider={showOptionGroupDivider}
      />
    </Spec>
  </Suite>
);
