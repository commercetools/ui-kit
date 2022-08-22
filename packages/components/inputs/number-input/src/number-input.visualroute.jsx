import { NumberInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec, DarkThemeProvider } from '../../../../../test/percy';

const value = '18';

export const routePath = '/number-input';

// eslint-disable-next-line react/prop-types
export const component = () => (
  <Suite>
    <Spec label="minimal">
      <NumberInput value={value} onChange={() => {}} horizontalConstraint={7} />
    </Spec>
    <Spec label="when disabled">
      <NumberInput
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when read-only">
      <NumberInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <NumberInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <NumberInput
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with error">
      <NumberInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <NumberInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec
      label="with custom (inverted) theme"
      backgroundColor="black"
      listPropsOfNestedChild
    >
      <DarkThemeProvider>
        <NumberInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </DarkThemeProvider>
    </Spec>
  </Suite>
);
