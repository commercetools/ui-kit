import React from 'react';
import { DateInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = '2018-11-13';

export const routePath = '/date-input-open';

export const component = () => (
  <Suite>
    <Spec label="minimal" propsToList={['value', 'horizontalConstraint']}>
      <DateInput
        id="date-input"
        data-testid="date-input"
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
  </Suite>
);
