import {
  forwardRef,
  createContext,
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback,
  useRef,
  type ReactNode,
  type MutableRefObject,
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
  customPropertiesOverrides: Record<string, string>;
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

// used to cover SSR builds (for instance in Gatsby)
const isBrowser = typeof window !== 'undefined';

const ThemeProvider = forwardRef<
  MutableRefObject<HTMLDivElement>,
  ThemeProviderProps
>((props, ref) => {
  const rootRef = useRef<HTMLElement>(
    isBrowser ? document.querySelector<HTMLElement>(':root') : null
  );
  const [theme, setTheme] = useState<ThemeName>(validateTheme(props?.theme));

  const changeTheme = useCallback((newTheme: string) => {
    setTheme(validateTheme(newTheme));
  }, []);

  const localRef = ref as unknown as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const targetRef = localRef?.current ? localRef.current : rootRef?.current;
    const vars = toVars(
      props.customPropertiesOverrides
        ? { ...themes[theme], ...props.customPropertiesOverrides }
        : themes[theme]
    );

    Object.entries(vars).forEach(([key, value]) => {
      targetRef?.style.setProperty(key, value);
    });
  }, [theme, props.customPropertiesOverrides, localRef]);

  const value = useMemo(() => {
    return { theme, changeTheme };
  }, [theme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
});
ThemeProvider.displayName = 'ThemeProvider';

const useTheme = () => {
  const context = useContext(ThemeContext);

  warning(!isEmpty(context), `useTheme must be used within a ThemeProvider`);

  return context;
};

export { ThemeProvider, useTheme };
