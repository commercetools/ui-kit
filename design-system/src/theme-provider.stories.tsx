import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
import designTokens from './design-tokens';
import { ThemeProvider, useTheme } from './theme-provider';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Foundation/ThemeProvider',
  component: ThemeProvider,
  tags: ['!autodocs'],
};

export default meta;

const scopedSelector = (id: string) => () => document.getElementById(id);

/* There is no `dark` entry in `themes`, so these states are overrides rather
   than a theme name. */
const darkThemeOverrides = {
  colorSurface: 'black',
  colorSolid: 'white',
  colorNeutral60: 'rgba(255,255,255,0.60)',
  colorNeutral: 'rgba(255,255,255,0.60)',
  colorAccent98: 'rgba(0,0,0,0.98)',
};

type TThemedTitleProps = {
  parentSelector?: () => HTMLElement | null;
  color?: string;
  children?: ReactNode;
};

/* `ThemeProvider` returns null, so the capture needs a child painted with the
   properties it writes. */
const ThemedTitle = ({
  parentSelector,
  color,
  children,
}: TThemedTitleProps) => {
  const { theme } = useTheme(parentSelector);

  return (
    <h1
      style={{
        color: color ?? designTokens.colorSolid,
        backgroundColor: designTokens.colorSurface,
        margin: 0,
      }}
    >
      {children ?? (
        <>
          Title with {theme} theme <i>colorSolid</i> design token
        </>
      )}
    </h1>
  );
};

type TLocalThemeProps = {
  id: string;
  themeOverrides?: Record<string, string>;
  children: ReactNode;
};

const LocalTheme = ({ id, themeOverrides, children }: TLocalThemeProps) => (
  <div id={id}>
    <ThemeProvider
      parentSelector={scopedSelector(id)}
      themeOverrides={themeOverrides}
    />
    {children}
  </div>
);

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="use global default theme">
        <ThemedTitle />
      </VisualSpec>

      <VisualSpec label="use local default theme">
        <LocalTheme id="local-1">
          <ThemedTitle parentSelector={scopedSelector('local-1')} />
        </LocalTheme>
      </VisualSpec>

      <VisualSpec label="use local dark theme">
        <LocalTheme id="local-2" themeOverrides={darkThemeOverrides}>
          <ThemedTitle parentSelector={scopedSelector('local-2')} />
        </LocalTheme>
      </VisualSpec>

      <VisualSpec label="repeat local default theme">
        <LocalTheme id="local-3">
          <ThemedTitle parentSelector={scopedSelector('local-3')} />
        </LocalTheme>
      </VisualSpec>

      <VisualSpec label="repeat local dark theme">
        <LocalTheme id="local-4" themeOverrides={darkThemeOverrides}>
          <ThemedTitle parentSelector={scopedSelector('local-4')} />
        </LocalTheme>
      </VisualSpec>

      <VisualSpec label="overridden local default theme">
        <LocalTheme id="local-5" themeOverrides={{ colorSolid: 'red' }}>
          <ThemedTitle parentSelector={scopedSelector('local-5')}>
            Title with overridden <i>colorSolid</i> design token
          </ThemedTitle>
        </LocalTheme>
      </VisualSpec>

      <VisualSpec label="custom property added to default theme">
        <LocalTheme id="local-6" themeOverrides={{ customColor: 'tomato' }}>
          <ThemedTitle
            parentSelector={scopedSelector('local-6')}
            color="var(--custom-color)"
          >
            Title with custom color
          </ThemedTitle>
        </LocalTheme>
      </VisualSpec>
    </>
  ),
};
