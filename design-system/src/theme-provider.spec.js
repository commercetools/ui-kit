/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { Component, useState } from 'react';
import { designTokens } from '@commercetools-uikit/design-system';
import PropTypes from 'prop-types';
import { screen, render, fireEvent, waitFor } from '../../test/test-utils';
import { ThemeProvider, withThemeContext } from './theme-provider';

const TestComponent = (props) => (
  <div
    style={{
      color: designTokens.colorSolid,
      backgroundColor: designTokens.colorSurface,
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
  const [globalTheme, setGlobalTheme] = useState({
    name: 'default',
    overrides: {},
  });
  const [localTheme, setLocalTheme] = useState({
    name: 'default',
    overrides: {},
  });

  return (
    <>
      <button
        onClick={() => {
          setGlobalTheme({
            name: 'test',
            overrides: {
              colorSolid: 'red',
              colorSurface: 'yellow',
            },
          });
        }}
      >
        change global theme
      </button>
      <button
        onClick={() => {
          setLocalTheme({
            name: 'test',
            overrides: {
              colorSolid: 'green',
              colorSurface: 'tomato',
              customColor: '#BADA55',
            },
          });
        }}
      >
        change local theme
      </button>
      <ThemeProvider
        theme={globalTheme.name}
        themeOverrides={globalTheme.overrides}
        parentSelector={globalParentSelector}
      />
      <TestComponent text="global" />
      <div id="localParent">
        <ThemeProvider
          theme={localTheme.name}
          themeOverrides={localTheme.overrides}
          parentSelector={localParentSelector}
        />
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
      expect(globalThemeProvider).toHaveAttribute('data-theme', 'test');
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
      expect(localThemeProvider).toHaveAttribute('data-theme', 'test');
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

  it('should render a class component wrapped in themed HOC', () => {
    class DummyComponent extends Component {
      render() {
        return (
          <div>
            {/* eslint-disable-next-line react/prop-types */}
            <p>Current theme is: {this.props.theme}</p>
            {/* eslint-disable-next-line react/prop-types */}
            <p>Themed value: {this.props.themedValue('foo', 'bar')}</p>
          </div>
        );
      }
    }

    const WrappedComponent = withThemeContext(DummyComponent);

    render(
      <>
        <ThemeProvider theme="test" />
        <WrappedComponent />
      </>
    );

    screen.getByText('Current theme is: test');
    screen.getByText('Themed value: bar');
  });
});
