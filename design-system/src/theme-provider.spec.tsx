import type { ReactNode } from 'react';
import { render, screen, waitFor } from '../../test/test-utils';
import { themes } from './design-tokens';
import { ThemeProvider, useTheme } from './theme-provider';

type TScopedThemeProps = {
  theme?: string;
  themeOverrides?: Record<string, string>;
  children?: ReactNode;
};

const scopeSelector = () => document.getElementById('scope');

const ScopedTheme = (props: TScopedThemeProps) => (
  <div id="scope" data-testid="scope">
    <ThemeProvider
      theme={props.theme}
      themeOverrides={props.themeOverrides}
      parentSelector={scopeSelector}
    />
    {props.children}
  </div>
);

const ThemeReader = (props: { parentSelector?: () => HTMLElement | null }) => {
  const { theme } = useTheme(props.parentSelector);
  return <span data-testid="theme">{theme}</span>;
};

afterEach(() => {
  // The provider writes to the inline style of `:root`, which jsdom keeps for
  // the whole file, so the "root untouched" assertions need this reset.
  document.documentElement.removeAttribute('style');
  document.documentElement.removeAttribute('data-theme');
});

describe('ThemeProvider', () => {
  it('should write the theme tokens to the root element by default', () => {
    render(<ThemeProvider />);

    expect(
      document.documentElement.style.getPropertyValue('--color-solid')
    ).toBe(themes.default.colorSolid);
    expect(document.documentElement).toHaveAttribute('data-theme', 'default');
  });

  it('should write to the scoped element and leave the root untouched', () => {
    render(<ScopedTheme />);

    const scope = screen.getByTestId('scope');
    expect(scope.style.getPropertyValue('--color-solid')).toBe(
      themes.default.colorSolid
    );
    expect(scope).toHaveAttribute('data-theme', 'default');
    expect(
      document.documentElement.style.getPropertyValue('--color-solid')
    ).toBe('');
    expect(document.documentElement).not.toHaveAttribute('data-theme');
  });

  it('should let a theme override win over the theme value', () => {
    render(<ScopedTheme themeOverrides={{ colorSolid: 'red' }} />);

    expect(
      screen.getByTestId('scope').style.getPropertyValue('--color-solid')
    ).toBe('red');
  });

  it('should add a custom property for a token the theme does not define', () => {
    render(<ScopedTheme themeOverrides={{ customColor: 'tomato' }} />);

    expect(
      screen.getByTestId('scope').style.getPropertyValue('--custom-color')
    ).toBe('tomato');
  });

  it('should warn and fall back to the default theme for an unsupported theme', () => {
    const consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    render(<ScopedTheme theme="dark" />);

    const scope = screen.getByTestId('scope');
    expect(scope).toHaveAttribute('data-theme', 'default');
    expect(scope.style.getPropertyValue('--color-solid')).toBe(
      themes.default.colorSolid
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "ThemeProvider: the specified theme 'dark' is not supported."
    );
    consoleWarnSpy.mockRestore();
  });

  it('should do nothing when the parent selector finds no element', () => {
    render(<ThemeProvider parentSelector={() => null} />);

    expect(document.documentElement).not.toHaveAttribute('data-theme');
  });
});

describe('useTheme', () => {
  it('should report the theme applied to the scoped element', () => {
    render(
      <ScopedTheme>
        <ThemeReader parentSelector={scopeSelector} />
      </ScopedTheme>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('default');
  });

  it('should report a later theme change on the observed element', async () => {
    render(<ThemeReader />);
    expect(screen.getByTestId('theme')).toHaveTextContent('default');

    document.documentElement.setAttribute('data-theme', 'other-theme');

    await waitFor(() =>
      expect(screen.getByTestId('theme')).toHaveTextContent('other-theme')
    );
  });
});
