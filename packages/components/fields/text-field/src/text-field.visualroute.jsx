import { TextField } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = 'hello world, how are you?';

export const routePath = '/text-field';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <TextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when required">
      <TextField
        title="Welcome Text"
        isRequired={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <TextField
        title="Welcome Text"
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is shown">
      <TextField
        title="Welcome Text"
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is shown and disabled">
      <TextField
        title="Welcome Text"
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with error when not touched">
      <TextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        errors={{ missing: true }}
      />
    </Spec>
    <Spec label="with error when touched">
      <TextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        errors={{ missing: true }}
        touched={true}
      />
    </Spec>
    <Spec label="with warning when not touched">
      <TextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with warning when touched">
      <TextField
        title="Welcome Text"
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        warnings={{ customWarning: true }}
        touched={true}
        renderWarning={() => 'Custom warning'}
      />
    </Spec>
    <Spec label="with isCondensed">
      <TextField
        title="Welcome Text"
        value={value}
        isCondensed={true}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
  </Suite>
);
