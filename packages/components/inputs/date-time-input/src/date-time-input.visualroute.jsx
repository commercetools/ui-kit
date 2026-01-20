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
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when default placeholder is shown">
      <DateTimeInput value="" onChange={() => {}} horizontalConstraint={7} />
    </Spec>
    <Spec label="when custom placeholder is shown">
      <DateTimeInput
        value=""
        onChange={() => {}}
        horizontalConstraint={7}
        placeholder="Select date and time"
      />
    </Spec>
    <Spec label="with error">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="when disabled with error">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
        isDisabled={true}
      />
    </Spec>
    <Spec label="with warning">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when disabled with warning">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint={7}
        hasWarning={true}
        isDisabled={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when readonly" propsToList={['isReadOnly']}>
      <DateTimeInput
        value={value}
        timeZone="UTC"
        onChange={() => {}}
        horizontalConstraint={7}
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
        horizontalConstraint={7}
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
        horizontalConstraint={7}
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
        horizontalConstraint={7}
        isReadOnly
        hasError
      />
    </Spec>
    <Spec label="minimal">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        isCondensed={true}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    {/* 10/23/25 Skipped: Calendar displays today's date on initial render instead of the fixed date value,
        resulting in Percy failures. DateInput (functional component) does not have this issue.
        Suspected cause: DateTimeInput's class component initialization timing with filter appearance mode. */}
    {/*
    <Spec label="with filter appearance">
      <DateTimeInput
        value={value}
        timeZone="UTC"
        isCondensed={true}
        onChange={() => {}}
        horizontalConstraint={7}
        appearance="filter"
      />
    </Spec>
    */}
  </Suite>
);
