import { useLayoutEffect, useMemo } from 'react';
import kebabCase from 'lodash/kebabCase';
import isObject from 'lodash/isObject';
import { themes, themesNames } from './custom-properties';

type ThemeName = keyof typeof themes;

const allThemesNames = Object.keys(themesNames);

const toVars = (obj: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`--${kebabCase(key)}`, value])
  );

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

// used to cover SSR builds (for instance in Gatsby)
const isBrowser = typeof window !== 'undefined';

const defaultParentSelector = () =>
  document.querySelector(':root') as HTMLElement;

type TChangeTheme = {
  newTheme?: string;
  parentSelector: () => HTMLElement | null;
  themeOverrides?: Record<string, string>;
};

const changeTheme = ({
  newTheme,
  parentSelector = defaultParentSelector,
  themeOverrides,
}: TChangeTheme): void => {
  const target = isBrowser ? parentSelector() : null;
  const validTheme = validateTheme(newTheme);
  target?.setAttribute('data-theme', validTheme);
  const vars = toVars(
    themeOverrides && isObject(themeOverrides)
      ? { ...themes[validTheme], ...themeOverrides }
      : themes[validTheme]
  );

  Object.entries(vars).forEach(([key, value]) => {
    target?.style.setProperty(key, value);
  });
};

type ThemeProviderProps = {
  theme?: string;
  themeOverrides?: Record<string, string>;
  parentSelector: () => HTMLElement | null;
};

const ThemeProvider = (props: ThemeProviderProps) => {
  useLayoutEffect(() => {
    changeTheme({
      newTheme: props.theme,
      parentSelector: props.parentSelector,
      themeOverrides: props.themeOverrides,
    });
  }, [props.theme, props.themeOverrides, props.parentSelector]);

  return <></>;
};
ThemeProvider.displayName = 'ThemeProvider';
ThemeProvider.defaultProps = {
  parentSelector: () => document.querySelector(':root') as HTMLElement,
};

// TODO: refactor - accept param to provide local theme
const useTheme = () => {
  const theme = defaultParentSelector().dataset.theme;
  return useMemo(() => {
    return { theme, changeTheme };
  }, [theme, changeTheme]);
};

export { ThemeProvider, useTheme };
