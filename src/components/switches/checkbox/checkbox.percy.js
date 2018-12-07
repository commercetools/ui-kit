import React from 'react';
import { Checkbox } from '../../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../../test/percy';

screenshot('Checkbox', () => (
  <Suite>
    <Spec label="when default">
      <Checkbox onChange={() => {}} value="value">
        I want kale
      </Checkbox>
    </Spec>
    <Spec label="when checked">
      <Checkbox onChange={() => {}} value="value" isChecked={true}>
        I want pizza
      </Checkbox>
    </Spec>
    <Spec label="when indetermiate">
      <Checkbox onChange={() => {}} value="value" isIndeterminate={true}>
        I want kale pizza
      </Checkbox>
    </Spec>
    <Spec label="when hovered">
      <Checkbox onChange={() => {}} value="value" isHovered={true}>
        I want pasta
      </Checkbox>
    </Spec>
    <Spec label="when checked and hovered">
      <Checkbox
        onChange={() => {}}
        value="value"
        isHovered={true}
        isChecked={true}
      >
        I want to watch hockey
      </Checkbox>
    </Spec>
    <Spec label="when indeterminate and hovered">
      <Checkbox
        onChange={() => {}}
        value="value"
        isIndeterminate={true}
        isHovered={true}
      >
        I want kale
      </Checkbox>
    </Spec>
    <Spec label="when with error">
      <Checkbox onChange={() => {}} value="value" hasError={true}>
        I want ice cream pizza
      </Checkbox>
    </Spec>
    <Spec label="when checked and with error">
      <Checkbox
        onChange={() => {}}
        isChecked={true}
        value="value"
        hasError={true}
      >
        I want pizza but not frozen pizza
      </Checkbox>
    </Spec>
    <Spec label="when indeterminate and with error">
      <Checkbox
        onChange={() => {}}
        isIndeterminate={true}
        value="value"
        hasError={true}
      >
        I want frozen beer
      </Checkbox>
    </Spec>
    <Spec label="when disabled">
      <Checkbox onChange={() => {}} value="value" isDisabled={true}>
        I want tequila
      </Checkbox>
    </Spec>
    <Spec label="when checked and disabled">
      <Checkbox
        onChange={() => {}}
        value="value"
        isDisabled={true}
        isChecked={true}
      >
        I want mezcal
      </Checkbox>
    </Spec>
    <Spec label="when indeterminate and disabled">
      <Checkbox
        onChange={() => {}}
        value="value"
        isDisabled={true}
        isIndeterminate={true}
      >
        I want mezcal with a worm
      </Checkbox>
    </Spec>
  </Suite>
));
