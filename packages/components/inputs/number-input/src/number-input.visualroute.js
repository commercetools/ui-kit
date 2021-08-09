import { ThemeProvider } from '@emotion/react';
import { NumberInput } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../../test/percy';

const value = '18';

export const routePath = '/number-input';

// eslint-disable-next-line react/prop-types
export const component = ({ themes }) => (
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
    <ThemeProvider theme={themes.darkTheme}>
      <Spec label="with custom (inverted) theme">
        <NumberInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </Spec>
    </ThemeProvider>
  </Suite>
);
