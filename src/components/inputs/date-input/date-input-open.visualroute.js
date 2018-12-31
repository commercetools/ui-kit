import React from 'react';
import { DateInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const value = '2018-11-13';

export const routePath = '/date-input-open';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <DateInput
        id="date-input"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
  </Suite>
);
