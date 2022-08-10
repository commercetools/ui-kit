import { ThemeProvider, customProperties } from '@commercetools-uikit/design-system';
import { Suite, Spec } from '../../test/percy';

export const routePath = '/theme-provider';

const DummyComponent = () => (
  <h1
    style={{
      color: customProperties.colorPrimary,
    }}
  >
    Title with default theme <i>colorPrimary</i> design token
  </h1>
);

export const component = () => (
  <Suite>
    <Spec label="use default theme">
      <ThemeProvider scope="local">
        <DummyComponent />
      </ThemeProvider>
    </Spec>

    <Spec label="use dark theme">
      <ThemeProvider scope="local" theme="dark">
        <DummyComponent />
      </ThemeProvider>
    </Spec>

    <Spec label="repeat default theme">
      <ThemeProvider scope="local">
        <DummyComponent />
      </ThemeProvider>
    </Spec>

    <Spec label="repeat dark theme">
      <ThemeProvider scope="local" theme="dark">
        <DummyComponent />
      </ThemeProvider>
    </Spec>
  </Suite>
);
