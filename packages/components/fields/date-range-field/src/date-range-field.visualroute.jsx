import { DateRangeField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = ['2018-09-20', '2018-09-24'];

export const routePath = '/date-range-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="when disabled">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when required">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        isRequired={true}
      />
    </Spec>
    <Spec label="with description">
      <DateRangeField
        title="Discounted days"
        description="When will the product be discounted?"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="with placeholder">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint={7}
        value={[]}
        onChange={() => {}}
        placeholder="Select release date"
      />
    </Spec>
    <Spec label="with error when not touched">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint={7}
        value={[]}
        onChange={() => {}}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint={7}
        value={[]}
        onChange={() => {}}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="when read-only" propsToList={['isReadOnly']}>
      <DateRangeField
        title="Discounted Days"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        isReadOnly
      />
    </Spec>
    <Spec label="with warning when not touched">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint={7}
        value={[]}
        onChange={() => {}}
        warnings={{ customWarning: true }}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with warning when touched">
      <DateRangeField
        title="Discounted days"
        horizontalConstraint={7}
        value={[]}
        onChange={() => {}}
        warnings={{ customWarning: true }}
        touched={true}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="is condensed">
      <DateRangeField
        title="Discounted days"
        isCondensed={true}
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
      />
    </Spec>
  </Suite>
);
