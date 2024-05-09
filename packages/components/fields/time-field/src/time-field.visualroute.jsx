import { TimeField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = '15:30';

export const routePath = '/time-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <TimeField
        title="Release Time"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="when disabled">
      <TimeField
        title="Release Time"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when required">
      <TimeField
        title="Release Time"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
        isRequired={true}
      />
    </Spec>
    <Spec label="with description">
      <TimeField
        title="Release Time"
        description="At which time will the product be avialable?"
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
      />
    </Spec>
    <Spec label="with placeholder">
      <TimeField
        title="Release Time"
        horizontalConstraint={7}
        value=""
        onChange={() => {}}
        placeholder="Select release time"
      />
    </Spec>
    <Spec label="with error when not touched">
      <TimeField
        title="Release Time"
        horizontalConstraint={7}
        value=""
        onChange={() => {}}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <TimeField
        title="Release Time"
        horizontalConstraint={7}
        value=""
        onChange={() => {}}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with warning when not touched">
      <TimeField
        title="Release Time"
        horizontalConstraint={7}
        value=""
        onChange={() => {}}
        warnings={{ customWarning: true }}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with warning when touched">
      <TimeField
        title="Release Time"
        horizontalConstraint={7}
        value=""
        onChange={() => {}}
        warnings={{ customWarning: true }}
        touched={true}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="minimal">
      <TimeField
        title="Release Time"
        isCondensed={true}
        horizontalConstraint={7}
        value={value}
        onChange={() => {}}
      />
    </Spec>
  </Suite>
);
