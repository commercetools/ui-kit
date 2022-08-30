import { useLayoutEffect, useMemo, useState, useRef, useEffect } from 'react';
import kebabCase from 'lodash/kebabCase';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import { themes, themesNames } from './custom-properties';

const allThemesNames = Object.keys(themesNames);

type ThemeName = keyof typeof themes;

const toVars = (obj: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`--${kebabCase(key)}`, value])
  );

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

  // With no target we can't change themes
  if (!target) return;

  const validTheme = (
    allThemesNames.includes(newTheme || '') ? newTheme! : 'default'
  ) as ThemeName;
  if (newTheme && newTheme !== validTheme) {
    console.warn(
      `ThemeProvider: the specified theme '${newTheme}' is not supported.`
    );
  }

  const vars = toVars(
    themeOverrides && isObject(themeOverrides)
      ? merge({}, themes[validTheme], themeOverrides)
      : themes[validTheme]
  );

  Object.entries(vars).forEach(([key, value]) => {
    target.style.setProperty(key, value);
  });
  target.setAttribute('data-theme', validTheme);
};

type ThemeProviderProps = {
  parentSelector: typeof defaultParentSelector;
  theme?: string;
  themeOverrides?: Record<string, string>;
};

const ThemeProvider = (props: ThemeProviderProps) => {
  const parentSelectorRef = useRef(props.parentSelector);
  useLayoutEffect(() => {
    applyTheme({
      newTheme: props.theme,
      parentSelector: parentSelectorRef.current,
      themeOverrides: props.themeOverrides,
    });
  }, [props.theme, props.themeOverrides]);

  return null;
};
ThemeProvider.defaultProps = {
  parentSelector: defaultParentSelector,
};

const useTheme = (parentSelector = defaultParentSelector) => {
  const [theme, setTheme] = useState<string>('default');
  const parentSelectorRef = useRef(parentSelector);

  // If we use 'useLayoutEffect' here, we would be trying to read the
  // data attribute before it gets set from the effect in the ThemeProvider
  useEffect(() => {
    setTheme(parentSelectorRef.current()?.dataset.theme || 'default');
  }, []);

  // So consumers don't have to provide 'parentSelector' again as
  // they already provided it in the hook call
  const updateTheme = useRef(
    ({ newTheme, themeOverrides }: Omit<TApplyTheme, 'parentSelector'>) => {
      applyTheme({
        newTheme,
        parentSelector: parentSelectorRef.current,
        themeOverrides,
      });
      setTheme(newTheme || 'default');
    }
  );
  return useMemo(() => {
    return { theme, applyTheme: updateTheme.current };
  }, [theme]);
};

export { ThemeProvider, useTheme };
