import { useLayoutEffect, useMemo, useState, useCallback } from 'react';
import kebabCase from 'lodash/kebabCase';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
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

type TApplyTheme = {
  newTheme?: string;
  parentSelector: typeof defaultParentSelector;
  themeOverrides?: Record<string, string>;
};

const applyTheme = ({
  newTheme,
  parentSelector = defaultParentSelector,
  themeOverrides,
}: TApplyTheme): void => {
  const target = isBrowser ? parentSelector() : null;

  const validTheme = validateTheme(newTheme);
  target?.setAttribute('data-theme', validTheme);
  const vars = toVars(
    themeOverrides && isObject(themeOverrides)
      ? merge(cloneDeep(themes[validTheme]), themeOverrides)
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
    applyTheme({
      newTheme: props.theme,
      parentSelector,
      themeOverrides: props.themeOverrides,
    });
  }, [props.theme, props.themeOverrides, parentSelector]);

  return null;
};
ThemeProvider.displayName = 'ThemeProvider';
ThemeProvider.defaultProps = {
  parentSelector: defaultParentSelector,
};

const useTheme = (parentSelector = defaultParentSelector) => {
  const [theme, setTheme] = useState<string | null | undefined>(null);
  const memoizedParentSelector = useCallback(
    () => parentSelector(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useLayoutEffect(() => {
    setTheme(isBrowser ? memoizedParentSelector()?.dataset.theme : null);
  }, [memoizedParentSelector]);

  return useMemo(() => {
    return { theme, applyTheme };
  }, [theme]);
};

export { ThemeProvider, useTheme };
