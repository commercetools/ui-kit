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
  if (!isNewThemeValid) {
    console.warn(
      `ThemeProvider: the specified theme '${themeName}' is not supported.`
    );
  }
  return 'default';
};

const ThemeProvider = (props: ThemeProviderProps) => {
  const root = useRef<HTMLElement>(document.querySelector(':root'));
  const [theme, setTheme] = useState<ThemeName>(validateTheme(props?.theme));

  const changeTheme = useCallback((newTheme: string) => {
    setTheme(validateTheme(newTheme));

    // We need to update the meta element right away so then the render phase kicks in,
    // the children will be rendered with the correct theme.
    // (This is only needed for visual regression testing with Percy)
    document
      .querySelector('[name="ui-kit-vrt-environment"]')
      ?.setAttribute('content', validateTheme(newTheme));
  }, []);

  useLayoutEffect(() => {
    const vars = toVars(themes[theme]);
    Object.entries(vars).forEach(([key, value]) => {
      root.current?.style.setProperty(key, value);
    });
  }, [theme]);

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
