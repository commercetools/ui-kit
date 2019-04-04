import React from 'react';
import { MultilineTextInput } from 'ui-kit';
import { ThemeProvider } from 'emotion-theming';
import { Suite, Spec } from '../../../../test/percy';

const value =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const routePath = '/multiline-text-input';

export const component = ({ themes }) => (
  <Suite>
    <Spec label="minimal">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when disabled">
      <MultilineTextInput
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when read-only">
      <MultilineTextInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <MultilineTextInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <MultilineTextInput
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with error">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <Spec label="with error and warning">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
        hasWarning={true}
      />
    </Spec>
    <Spec label="when expanded by default">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        defaultExpandMultilineText={true}
      />
    </Spec>
    <Spec label="when disabled and expanded by default">
      <MultilineTextInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        defaultExpandMultilineText={true}
        isDisabled={true}
      />
    </Spec>
    <ThemeProvider theme={themes.darkTheme}>
      <Spec label="with custom (inverted) theme">
        <MultilineTextInput
          value={value}
          onChange={() => {}}
          horizontalConstraint="m"
        />
      </Spec>
    </ThemeProvider>
  </Suite>
);
