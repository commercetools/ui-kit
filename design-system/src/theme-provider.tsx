import {
  createContext,
  useLayoutEffect,
  useState,
  useMemo,
  useContext,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import kebabCase from 'lodash/kebabCase';
import isEmpty from 'lodash/isEmpty';
import { warning } from '@commercetools-uikit/utils';
import { themes, themesNames } from './custom-properties';

type ThemeName = keyof typeof themes;

const allThemesNames = Object.keys(themesNames);

type TThemeContext = {
  theme: ThemeName;
  changeTheme: (newTheme: string) => void;
};

const ThemeContext = createContext<TThemeContext>({
  theme: themesNames.default,
  changeTheme: () => {},
});

const toVars = (obj: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`--${kebabCase(key)}`, value])
  );

type ThemeProviderProps = {
  children: ReactNode;
  theme?: string;
  scope?: 'global' | 'local';
};

const validateTheme = (themeName?: string): ThemeName => {
  if (!themeName) {
    return 'default';
  }
  const isNewThemeValid = allThemesNames.includes(themeName);
  if (isNewThemeValid) {
    return themeName as ThemeName;
  }
  if (!isNewThemeValid) {
    console.warn(
      `ThemeProvider: the specified theme '${themeName}' is not supported.`
    );
  }
  return 'default';
};

const ThemeProvider = (props: ThemeProviderProps) => {
  const root = useRef<HTMLElement>(document.querySelector(':root'));
  const localScopeElement = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<ThemeName>(validateTheme(props?.theme));

  const changeTheme = useCallback((newTheme: string) => {
    setTheme(validateTheme(newTheme));
  }, []);

  useLayoutEffect(() => {
    const vars = toVars(themes[theme]);
    const targetElement =
      props.scope === 'local' ? localScopeElement.current : root.current;
    Object.entries(vars).forEach(([key, value]) => {
      targetElement?.style.setProperty(key, value);
    });
  }, [theme, props.scope]);

  const value = useMemo(() => {
    return { theme, changeTheme };
  }, [theme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div ref={localScopeElement}>{props.children}</div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  warning(!isEmpty(context), `useTheme must be used within a ThemeProvider`);

  return context;
};

export { ThemeProvider, useTheme };
