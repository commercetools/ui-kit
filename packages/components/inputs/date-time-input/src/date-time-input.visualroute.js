import React from 'react';
import { DateTimeInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = '2018-11-13 15:00';

export const routePath = '/date-time-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when default placeholder is shown">
      <DateTimeInput value="" onChange={() => {}} horizontalConstraint="m" />
    </Spec>
    <Spec label="when custom placeholder is shown">
      <DateTimeInput
        value=""
        onChange={() => {}}
        horizontalConstraint="m"
        placeholder="Select date and time"
      />
    </Spec>
    <Spec label="with error">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="when disabled with error">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        isDisabled={true}
      />
    </Spec>
    <Spec label="with warning">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="when disabled with warning">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
        isDisabled={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when readonly" propsToList={['isReadOnly']}>
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        isReadOnly
      />
    </Spec>
    <Spec
      label="when readonly and disabled"
      propsToList={['isReadOnly', 'isDisabled']}
    >
      <DateTimeInput
        value={value}
        timeZone="UTC"
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
      <DateTimeInput
        value={value}
        timeZone="UTC"
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
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint="m"
        isReadOnly
        hasError
      />
    </Spec>
  </Suite>
);
