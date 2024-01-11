import { TimeInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = '3:00 PM';

export const routePath = '/time-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <TimeInput value={value} onChange={() => {}} horizontalConstraint={7} />
    </Spec>
    <Spec label="when disabled">
      <TimeInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        isDisabled={true}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <TimeInput
        value=""
        onChange={() => {}}
        horizontalConstraint={7}
        placeholder="Select something"
      />
    </Spec>
    <Spec label="with error">
      <TimeInput
        value={null}
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="when readonly">
      <TimeInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        isReadOnly={true}
      />
    </Spec>
    <Spec label="with warning">
      <TimeInput
        value={null}
        onChange={() => {}}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
  </Suite>
);
