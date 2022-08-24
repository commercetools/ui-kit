import { useLayoutEffect, useMemo, useState, useCallback } from 'react';
import kebabCase from 'lodash/kebabCase';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
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

const defaultParentSelector = (): HTMLElement | null =>
  document.querySelector(':root');

type TChangeTheme = {
  newTheme?: string;
  parentSelector: typeof defaultParentSelector;
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
      ? merge(themes[validTheme], themeOverrides)
      : themes[validTheme]
  );

  Object.entries(vars).forEach(([key, value]) => {
    target?.style.setProperty(key, value);
  });
};

type ThemeProviderProps = {
  theme?: string;
  themeOverrides?: Record<string, string>;
  parentSelector: typeof defaultParentSelector;
};

const ThemeProvider = (props: ThemeProviderProps) => {
  const parentSelector = useCallback(
    () => props.parentSelector(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useLayoutEffect(() => {
    changeTheme({
      newTheme: props.theme,
      parentSelector,
      themeOverrides: props.themeOverrides,
    });
  }, [props.theme, props.themeOverrides, parentSelector]);

  return <></>;
};
ThemeProvider.displayName = 'ThemeProvider';
ThemeProvider.defaultProps = {
  parentSelector: defaultParentSelector,
};

const useTheme = (parentSelector = defaultParentSelector) => {
  const [theme, setTheme] = useState<string | null | undefined>(null);

  useLayoutEffect(() => {
    setTheme(isBrowser ? parentSelector()?.dataset.theme : null);
  });

  return useMemo(() => {
    return { theme, changeTheme };
  }, [theme]);
};

export { ThemeProvider, useTheme };
