import { NumberField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = '12.50';

export const routePath = '/number-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <NumberField
        title="Age"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when required">
      <NumberField
        title="Age"
        isRequired={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <NumberField
        title="Age"
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when read-only">
      <NumberField
        title="Age"
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <NumberField
        title="Age"
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is shown and input is disabled">
      <NumberField
        title="Age"
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with error when not touched">
      <NumberField
        title="Age"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <NumberField
        title="Age"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with warning when not touched">
      <NumberField
        title="Age"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with warning when touched">
      <NumberField
        title="Age"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        touched={true}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
  </Suite>
);
