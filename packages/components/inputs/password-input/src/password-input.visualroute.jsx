import { PasswordInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec, LocalDarkThemeProvider } from '../../../../../test/percy';

const value = 'hello world how are you?';

export const routePath = '/password-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <PasswordInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when disabled">
      <PasswordInput
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when read-only">
      <PasswordInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <PasswordInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <PasswordInput
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with error">
      <PasswordInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <PasswordInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <PasswordInput
        value={value}
        onChange={() => {}}
        horizontalConstraint={7}
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec
      label="with custom (inverted) theme"
      backgroundColor="black"
      listPropsOfNestedChild
    >
      <LocalDarkThemeProvider>
        <PasswordInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </LocalDarkThemeProvider>
    </Spec>
  </Suite>
);
