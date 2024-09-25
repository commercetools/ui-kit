import { screen, render } from '../../../../test/test-utils';
import Stamp from './stamp';
import { AngleDownIcon } from '../../icons';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

it('should render the inline props', () => {
  render(
    <Stamp
      tone="positive"
      label="Hello"
      icon={<AngleDownIcon data-testid="tested-icon" />}
    />
  );
  expect(screen.getByText('Hello')).toBeInTheDocument();
  expect(screen.getByTestId('tested-icon')).toBeInTheDocument();
});
it('should still render children but trigger a console.warn', () => {
  const consoleWarnSpy = jest
    .spyOn(console, 'warn')
    .mockImplementation(() => {});
  render(<Stamp tone="positive">Hello</Stamp>);
  expect(screen.getByText('Hello')).toBeInTheDocument();
  expect(consoleWarnSpy).toHaveBeenCalled();
  consoleWarnSpy.mockRestore();
});
