import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { NumberInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const value = '18';

const darkTheme = {
  colorSurface: 'black',
  colorSolid: 'white',
  colorNeutral60: 'rgba(255,255,255,0.60)',
  colorNeutral: 'rgba(255,255,255,0.60)',
  colorAccent98: 'rgba(0,0,0,0.98)',
};

export const routePath = '/number-input';

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <NumberInput value={value} onChange={() => {}} horizontalConstraint="m" />
    </Spec>
    <Spec label="when disabled">
      <NumberInput
        isDisabled={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when read-only">
      <NumberInput
        isReadOnly={true}
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible">
      <NumberInput
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible and input is disabled">
      <NumberInput
        isDisabled={true}
        value=""
        placeholder="Enter a text"
        onChange={() => {}}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with error">
      <NumberInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="with warning">
      <NumberInput
        value={value}
        onChange={() => {}}
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
    <ThemeProvider theme={darkTheme}>
      <Spec label="with custom (inverted) theme" inverted>
        <NumberInput
          value={value}
          onChange={() => {}}
          horizontalConstraint="m"
        />
      </Spec>
    </ThemeProvider>
  </Suite>
);
