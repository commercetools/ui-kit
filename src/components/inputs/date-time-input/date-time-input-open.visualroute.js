import React from 'react';
import { DateTimeInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const value = '2018-11-13 15:00';

export const routePath = '/date-time-input-open';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        id="date-time-input"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
  </Suite>
);
