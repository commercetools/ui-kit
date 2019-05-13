import React from 'react';
import { TextInput } from 'ui-kit';
import { ThemeProvider } from 'emotion-theming';
import { Suite, Spec } from '../../../../test/percy';

const value = 'hello world how are you?';

export const routePath = '/text-input';

const theme = {
  colorError: 'darkred',
  fontSizeM: '1.2rem',
};

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <TextInput value={value} onChange={() => {}} horizontalConstraint="m" />
    </Spec>
    <Spec label="when disabled">
      <TextInput
        disabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when read-only">
      <TextInput
        readOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <TextInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <TextInput
        disabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with error">
      <TextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <TextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <TextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when disabled with error">
      <TextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        disabled={true}
        hasError={true}
      />
    </Spec>
    <Spec label="when disabled with warning">
      <TextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        disabled={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="with custom theme (custom fontSize and error color)">
      <ThemeProvider theme={theme}>
        <TextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint="m"
          hasError={true}
        />
      </ThemeProvider>
    </Spec>
  </Suite>
);
