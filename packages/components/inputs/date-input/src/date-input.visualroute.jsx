import { DateInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = '2018-11-13';

export const routePath = '/date-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <DateInput value={value} onChange={() => {}} horizontalConstraint={7} />
    </Spec>
    <Spec label="when disabled">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <DateInput
        value=""
        onChange={() => {}}
        horizontalConstraint={7}
        placeholder="Select something"
      />
    </Spec>
    <Spec label="with error">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="when disabled with error">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        isDisabled={true}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when disabled with warning">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        isDisabled={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when readonly" propsToList={['isReadOnly']}>
      <DateInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
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
        horizontalConstraint={7}
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
        horizontalConstraint={7}
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
        horizontalConstraint={7}
        isReadOnly
        hasError
      />
    </Spec>
    <Spec label="with isCondensed">
      <DateInput
        value=""
        onChange={() => {}}
        isCondensed={true}
        horizontalConstraint={7}
        placeholder="Select something"
      />
    </Spec>
    <Spec label="with filter appearance">
      <DateInput
        value=""
        onChange={() => {}}
        isCondensed={true}
        horizontalConstraint={7}
        placeholder="Select something"
        appearance="filter"
      />
    </Spec>
  </Suite>
);
