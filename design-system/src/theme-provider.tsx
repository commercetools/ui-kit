import {
  createContext,
  useLayoutEffect,
  useState,
  useMemo,
  useContext,
  useCallback,
  type ReactNode,
} from 'react';
import kebabCase from 'lodash/kebabCase';
import { warning } from '@commercetools-uikit/utils';
import { themes } from './custom-properties';

type ThemeName = keyof typeof themes;

const allThemesNames = Object.keys(themes);

const ThemeContext = createContext({});

const toVars = (obj: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`--${kebabCase(key)}`, value])
  );

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = (props: ThemeProviderProps) => {
  const root = document.querySelector(':root') as HTMLElement;
  const [theme, setTheme] = useState<ThemeName>('default');

  const changeTheme = useCallback((newTheme: string) => {
    const isNewThemeValid = allThemesNames.some(
      (themeName) => themeName === newTheme
    );

    setTheme(isNewThemeValid ? (newTheme as ThemeName) : 'default');
    warning(
      isNewThemeValid,
      `ThemeProvider: the specified theme '${newTheme}' is not supported.`
    );
  }, []);

  useLayoutEffect(() => {
    const vars = toVars(themes[theme]);
    Object.entries(vars).forEach(([key, value]) => {
      root?.style.setProperty(key, value);
    });
  }, [theme, root?.style]);

  const value = useMemo(() => {
    return { theme, changeTheme };
  }, [theme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
