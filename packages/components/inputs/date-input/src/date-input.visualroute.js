import React from 'react';
import { DateInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = '2018-11-13';

export const routePath = '/date-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <DateInput value={value} onChange={() => {}} horizontalConstraint="m" />
    </Spec>
    <Spec label="when disabled">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <DateInput
        value=""
        onChange={() => {}}
        horizontalConstraint="m"
        placeholder="Select something"
      />
    </Spec>
    <Spec label="with error">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="when disabled with error">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isDisabled={true}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="when disabled with warning">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isDisabled={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when readonly" propsToList={['isReadOnly']}>
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isReadOnly
      />
    </Spec>
    <Spec
      label="when readonly and disabled"
      propsToList={['isReadOnly', 'isDisabled']}
    >
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isReadOnly
        isDisabled
      />
    </Spec>
    <Spec
      label="when readonly and warning"
      propsToList={['isReadOnly', 'hasWarning']}
    >
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isReadOnly
        hasWarning
      />
    </Spec>
    <Spec
      label="when readonly and error"
      propsToList={['isReadOnly', 'hasError']}
    >
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        isReadOnly
        hasError
      />
    </Spec>
  </Suite>
);
