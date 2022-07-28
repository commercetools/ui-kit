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
import isEmpty from 'lodash/isEmpty';
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
  theme?: string;
};

const validateTheme = (themeName?: string): ThemeName => {
  if (!themeName) {
    return 'default';
  }
  const isNewThemeValid = allThemesNames.includes(themeName);
  if (isNewThemeValid) {
    return themeName as ThemeName;
  }
  warning(
    isNewThemeValid,
    `ThemeProvider: the specified theme '${themeName}' is not supported.`
  );
  return 'default';
};

const ThemeProvider = (props: ThemeProviderProps) => {
  const root = document.querySelector(':root') as HTMLElement;
  const [theme, setTheme] = useState<ThemeName>(validateTheme(props?.theme));

  const changeTheme = useCallback((newTheme: string) => {
    setTheme(validateTheme(newTheme));
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

  warning(!isEmpty(context), `useTheme must be used within a ThemeProvider`);

  return context;
};

export { ThemeProvider, useTheme };
