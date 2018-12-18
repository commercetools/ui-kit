import React from 'react';
import {
  LocalizedMoneyInput,
  ErrorMessage,
  WarningMessage,
} from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

const value = {
  EUR: '12.77',
  USD: '13.55',
  CAD: '19.82',
};

screenshot('LocalizedMoneyInput', () => (
  <Suite>
    <Spec label="minimal">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
      />
    </Spec>
    <Spec label="when currencies expanded by default">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        isDefaultExpanded={true}
      />
    </Spec>
    <Spec label="when expansion controls are hidden">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        hideExpansionControls={true}
      />
    </Spec>
    <Spec label="when disabled and open">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        isDisabled={true}
        isDefaultExpanded={true}
      />
    </Spec>
    <Spec label="when disabled and closed">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        isDisabled={true}
      />
    </Spec>
    <Spec label="when there is an error for a specific currency (first one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        errors={{ CAD: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is an error for a specific currency (second one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        errors={{ EUR: <ErrorMessage>foo</ErrorMessage> }}
      />
    </Spec>
    <Spec label="when there is a warning for a specific currency (first one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        warnings={{ CAD: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a warning for a specific currency (second one)">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        warnings={{ EUR: <WarningMessage>foo</WarningMessage> }}
      />
    </Spec>
    <Spec label="when there is a general error">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        hasError={true}
      />
    </Spec>
    <Spec label="when there is a general warning">
      <LocalizedMoneyInput
        value={value}
        onChange={() => {}}
        selectedCurrency="CAD"
        horizontalConstraint="m"
        hasWarning={true}
      />
    </Spec>
  </Suite>
));
