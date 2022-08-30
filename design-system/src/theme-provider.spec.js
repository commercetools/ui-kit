/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { useTheme, customProperties } from '@commercetools-uikit/design-system';
import PropTypes from 'prop-types';
import { screen, render, fireEvent, waitFor } from '../../test/test-utils';
import { ThemeProvider } from './theme-provider';

const TestComponent = (props) => (
  <div
    style={{
      color: customProperties.colorSolid,
      backgroundColor: customProperties.colorSurface,
    }}
    data-testid={props.text}
  >
    {props.text}
  </div>
);
TestComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

const globalParentSelector = () => document.body;
const localParentSelector = () => document.getElementById('localParent');

const TestComponentWithThemeProvider = () => {
  const { applyTheme: applyGlobalTheme } = useTheme(globalParentSelector);
  const { applyTheme: applyLocalTheme } = useTheme(localParentSelector);
  return (
    <>
      <button
        onClick={() => {
          applyGlobalTheme({
            themeOverrides: {
              colorSolid: 'red',
              colorSurface: 'yellow',
            },
            newTheme: 'dark',
          });
        }}
      >
        change global theme
      </button>
      <button
        onClick={() => {
          applyLocalTheme({
            themeOverrides: {
              colorSolid: 'green',
              colorSurface: 'tomato',
              customColor: '#BADA55',
            },
            newTheme: 'dark',
          });
        }}
      >
        change local theme
      </button>
      <ThemeProvider parentSelector={globalParentSelector} />
      <TestComponent text="global" />
      <div id="localParent">
        <ThemeProvider parentSelector={localParentSelector} />
        <TestComponent text="local" />
      </div>
    </>
  );
};

describe('ThemeProvider', () => {
  it('should change `--color-solid` and `--color-surface` values and `data-theme` of global test provider after global theme switch button click', async () => {
    const { container } = render(<TestComponentWithThemeProvider />);
    const globalThemeProvider = document.body;
    const localThemeProvider = container.querySelector('#localParent');
    expect(globalThemeProvider).toHaveStyle(
      `--color-solid: #1a1a1a; --color-surface: #fff;`
    );
    expect(globalThemeProvider).toHaveAttribute('data-theme', 'default');
    expect(localThemeProvider).toHaveStyle(
      `--color-solid: #1a1a1a; --color-surface: #fff;`
    );
    expect(localThemeProvider).toHaveAttribute('data-theme', 'default');

    // global theme change
    fireEvent.click(
      screen.getByRole('button', {
        name: /change global theme/i,
      })
    );

    await waitFor(() => {
      expect(globalThemeProvider).toHaveStyle(
        `--color-solid: red; --color-surface: yellow;`
      );
      expect(globalThemeProvider).toHaveAttribute('data-theme', 'dark');
      expect(localThemeProvider).toHaveStyle(
        `--color-solid: #1a1a1a; --color-surface: #fff;`
      );
      expect(localThemeProvider).toHaveAttribute('data-theme', 'default');
    });
  });
  it('should change `--color-solid` and `--color-surface` values and `data-theme` of local test provider after local theme switch button click', async () => {
    const { container } = render(<TestComponentWithThemeProvider />);
    const globalThemeProvider = document.body;
    const localThemeProvider = container.querySelector('#localParent');
    expect(globalThemeProvider).toHaveStyle(
      `--color-solid: #1a1a1a; --color-surface: #fff;`
    );
    expect(globalThemeProvider).toHaveAttribute('data-theme', 'default');
    expect(localThemeProvider).toHaveStyle(
      `--color-solid: #1a1a1a; --color-surface: #fff;`
    );
    expect(localThemeProvider).toHaveAttribute('data-theme', 'default');

    // local theme change
    fireEvent.click(
      screen.getByRole('button', {
        name: /change local theme/i,
      })
    );

    await waitFor(() => {
      expect(globalThemeProvider).toHaveStyle(
        `--color-solid: #1a1a1a; --color-surface: #fff;`
      );
      expect(globalThemeProvider).toHaveAttribute('data-theme', 'default');
      expect(localThemeProvider).toHaveStyle(
        `--color-solid: green; --color-surface: tomato;`
      );
      expect(localThemeProvider).toHaveAttribute('data-theme', 'dark');
    });
  });

  it('should add custom color to local theme css properties', async () => {
    const { container } = render(<TestComponentWithThemeProvider />);
    const globalThemeProvider = document.body;
    const localThemeProvider = container.querySelector('#localParent');
    expect(localThemeProvider).not.toHaveStyle(`--custom-color: #BADA55`);
    expect(globalThemeProvider).not.toHaveStyle(`--custom-color: #BADA55`);

    // local theme change
    fireEvent.click(
      screen.getByRole('button', {
        name: /change local theme/i,
      })
    );

    await waitFor(() => {
      expect(localThemeProvider).toHaveStyle(`--custom-color: #BADA55`);
      expect(globalThemeProvider).not.toHaveStyle(`--custom-color: #BADA55`);
    });
  });
});
