import {
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type JSXElementConstructor,
} from 'react';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import isEqual from 'lodash/isEqual';
import { themes } from './design-tokens';
import { transformTokensToCssVarsValues } from './utils';

const allThemesNames = Object.keys(themes);

type ThemeName = keyof typeof themes;

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

  const vars = transformTokensToCssVarsValues(
    merge(
      {},
      themes.default,
      themes[validTheme],
      isObject(themeOverrides) ? themeOverrides : {}
    )
  );

  Object.entries(vars).forEach(([key, value]) => {
    target.style.setProperty(key, value);
  });
  target.setAttribute('data-theme', validTheme);
};

type ThemeProviderProps = {
  parentSelector: typeof defaultParentSelector;
  theme: string;
  themeOverrides?: Record<string, string>;
};

const ThemeProvider = (props: ThemeProviderProps) => {
  const parentSelectorRef = useRef(props.parentSelector);
  const themeNameRef = useRef<string>();
  const themeOverridesRef = useRef<Record<string, string>>();

  useLayoutEffect(() => {
    // We want to make sure we don't really apply the change when the props
    // provided include a new object with the same theme overrides
    // (eg: users providing an inline object as prop to the ThemeProvider)
    if (
      themeNameRef.current !== props.theme ||
      !isEqual(themeOverridesRef.current, props.themeOverrides)
    ) {
      themeNameRef.current = props.theme;
      themeOverridesRef.current = props.themeOverrides;

      applyTheme({
        newTheme: props.theme,
        parentSelector: parentSelectorRef.current,
        themeOverrides: props.themeOverrides,
      });
    }
  }, [props.theme, props.themeOverrides]);

  return null;
};
ThemeProvider.defaultProps = {
  parentSelector: defaultParentSelector,
  theme: 'default',
};

type TUseThemeResult = {
  theme: ThemeName;
  themedValue: <
    Old extends string | ReactNode | undefined,
    New extends string | ReactNode | undefined
  >(
    defaultThemeValue: Old,
    newThemeValue: New
  ) => Old | New;
  isNewTheme: boolean;
};
const useTheme = (parentSelector = defaultParentSelector): TUseThemeResult => {
  const [theme, setTheme] = useState<ThemeName>('default');
  const parentSelectorRef = useRef(parentSelector);
  const observerRef = useRef(
    new MutationObserver((mutationList, _observer) => {
      // Since we are only observing the theme DOM node for changes in its
      // `data-theme` attribute (configured below when calling `observe` function),
      // we will receive a single element in the list
      setTheme(
        (mutationList[0].target as HTMLElement).dataset.theme as ThemeName
      );
    })
  );

  const themedValue: TUseThemeResult['themedValue'] = (
    defaultThemeValue,
    newThemeValue
  ) => (theme === 'default' ? defaultThemeValue : newThemeValue);

  // If we use 'useLayoutEffect' here, we would be trying to read the
  // data attribute before it gets set from the effect in the ThemeProvider
  useEffect(() => {
    const themeDomNode = parentSelectorRef.current();
    const observer = observerRef.current;

    if (themeDomNode) {
      // We need to read the current theme after the provider is rendered
      // to have the actual selected theme (calculated client-side) in the
      // hook local state
      const nextTheme = themeDomNode.dataset.theme as ThemeName;
      if (nextTheme) {
        setTheme(nextTheme);
      }

      // We observe the theme DOM node for changes in its `data-theme`
      // attribute, which is the one we update in the `applyTheme` function
      observer.observe(themeDomNode, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    }

    return () => observer.disconnect();
  }, []);

  return {
    theme,
    themedValue,
    isNewTheme: theme === 'test',
  };
};

const withThemeContext = (
  WrappedComponent: JSXElementConstructor<TUseThemeResult>
) => {
  // eslint-disable-next-line react/display-name
  return (props: Record<string, unknown>) => {
    const themeUtilties = useTheme();
    return <WrappedComponent {...props} {...themeUtilties} />;
  };
};

export { ThemeProvider, useTheme, withThemeContext };
export type { ThemeName };
