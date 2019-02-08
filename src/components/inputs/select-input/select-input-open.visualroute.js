import React from 'react';
import { SelectInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const options = [
  { label: 'one', options: [{ value: 'one', label: 'One' }] },
  { options: [{ value: 'two', label: 'Two' }] },
];

const value = 'one';

const showOptionGroupDivider = true;

export const routePath = '/select-input-open';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <SelectInput
        id="select-input"
        value={value}
        onChange={() => {}}
        options={options}
        horizontalConstraint="m"
        showOptionGroupDivider={showOptionGroupDivider}
      />
    </Spec>
  </Suite>
);
