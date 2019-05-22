import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { PasswordInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const value = 'hello world how are you?';

export const routePath = '/password-input';

export const component = ({ themes }) => (
  <Suite>
    <Spec label="minimal">
      <PasswordInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <PasswordInput
        disabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when read-only">
      <PasswordInput
        readOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <PasswordInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <PasswordInput
        disabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with error">
      <PasswordInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <PasswordInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <PasswordInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <ThemeProvider theme={themes.darkTheme}>
      <Spec label="with custom (inverted) theme">
        <PasswordInput
          value={value}
          onChange={() => {}}
          horizontalConstraint="m"
        />
      </Spec>
    </ThemeProvider>
  </Suite>
);
