import { useTheme, customProperties } from '@commercetools-uikit/design-system';
import { useLayoutEffect } from 'react';
import { Suite, Spec, SpecThemeSwitcher } from '../../test/percy';

export const routePath = '/theme-provider';

const DummyComponent = () => (
  <h1
    style={{
      color: customProperties.colorSurface,
    }}
  >
    Title with default theme <i>colorPrimary</i> design token
  </h1>
);

const DarkThemedComponent = () => {
  const { changeTheme } = useTheme();
  useLayoutEffect(() => {
    changeTheme('dark');
  }, [changeTheme]);

  return <DummyComponent />;
};

export const component = () => (
  <Suite>
    <Spec label="use default theme">
      <DummyComponent />
    </Spec>

    <Spec label="use dark theme">
      <DarkThemedComponent />
    </Spec>

    <Spec label="use dark theme for theming children">
      <SpecThemeSwitcher theme="dark">
        <DummyComponent />
      </SpecThemeSwitcher>
    </Spec>
  </Suite>
);
