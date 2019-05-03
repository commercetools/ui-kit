import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { CheckboxInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/checkbox-input';

export const component = ({ themes }) => (
  <Suite>
    <Spec label="when default">
      <CheckboxInput onChange={() => {}} value="value">
        I want kale
      </CheckboxInput>
    </Spec>
    <Spec label="when checked">
      <CheckboxInput onChange={() => {}} value="value" isChecked={true}>
        I want pizza
      </CheckboxInput>
    </Spec>
    <Spec label="when indetermiate">
      <CheckboxInput onChange={() => {}} value="value" isIndeterminate={true}>
        I want kale pizza
      </CheckboxInput>
    </Spec>
    <Spec label="when hovered">
      <CheckboxInput onChange={() => {}} value="value" isHovered={true}>
        I want pasta
      </CheckboxInput>
    </Spec>
    <Spec label="when checked and hovered">
      <CheckboxInput
        onChange={() => {}}
        value="value"
        isHovered={true}
        isChecked={true}
      >
        I want to watch hockey
      </CheckboxInput>
    </Spec>
    <Spec label="when indeterminate and hovered">
      <CheckboxInput
        onChange={() => {}}
        value="value"
        isIndeterminate={true}
        isHovered={true}
      >
        I want kale
      </CheckboxInput>
    </Spec>
    <Spec label="when with error">
      <CheckboxInput onChange={() => {}} value="value" hasError={true}>
        I want ice cream pizza
      </CheckboxInput>
    </Spec>
    <Spec label="when checked and with error">
      <CheckboxInput
        onChange={() => {}}
        isChecked={true}
        value="value"
        hasError={true}
      >
        I want pizza but not frozen pizza
      </CheckboxInput>
    </Spec>
    <Spec label="when indeterminate and with error">
      <CheckboxInput
        onChange={() => {}}
        isIndeterminate={true}
        value="value"
        hasError={true}
      >
        I want frozen beer
      </CheckboxInput>
    </Spec>
    <Spec label="when disabled">
      <CheckboxInput onChange={() => {}} value="value" isDisabled={true}>
        I want tequila
      </CheckboxInput>
    </Spec>
    <Spec label="when checked and disabled">
      <CheckboxInput
        onChange={() => {}}
        value="value"
        isDisabled={true}
        isChecked={true}
      >
        I want mezcal
      </CheckboxInput>
    </Spec>
    <Spec label="when indeterminate and disabled">
      <CheckboxInput
        onChange={() => {}}
        value="value"
        isDisabled={true}
        isIndeterminate={true}
      >
        I want mezcal with a worm
      </CheckboxInput>
    </Spec>
    <ThemeProvider theme={themes.darkTheme}>
      <Spec label="with custom (dark) theme">
        <CheckboxInput onChange={() => {}} value="value">
          I want kale
        </CheckboxInput>
      </Spec>
      <Spec label="with custom (dark) theme checked">
        <CheckboxInput onChange={() => {}} value="value" isChecked={true}>
          I want pizza
        </CheckboxInput>
      </Spec>
    </ThemeProvider>
  </Suite>
);
