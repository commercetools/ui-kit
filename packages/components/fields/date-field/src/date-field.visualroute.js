import React from 'react';
import { DateField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = '2018-09-20';

export const routePath = '/date-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <DateField
        title="Release Date"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="when disabled">
      <DateField
        title="Release Date"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when required">
      <DateField
        title="Release Date"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        isRequired={true}
      />
    </Spec>
    <Spec label="with description">
      <DateField
        title="Release Date"
        description="When will the product be avialable?"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="with placeholder">
      <DateField
        title="Release Date"
        horizontalConstraint="m"
        value=""
        onChange={() => {}}
        placeholder="Select release date"
      />
    </Spec>
    <Spec label="with error when not touched">
      <DateField
        title="Release Date"
        horizontalConstraint="m"
        value=""
        onChange={() => {}}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <DateField
        title="Release Date"
        horizontalConstraint="m"
        value=""
        onChange={() => {}}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="when read-only" propsToList={['isReadOnly']}>
      <DateField
        title="Release Date"
        horizontalConstraint="m"
        value={value}
        onChange={() => {}}
        isReadOnly
      />
    </Spec>
  </Suite>
);
