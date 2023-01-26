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
      intlMessage={{ id: '1', defaultMessage: 'Hello' }}
      icon={<AngleDownIcon />}
    />
  );
  expect(screen.getByText('Hello')).toBeInTheDocument();
  expect(screen.getByRole('img')).toBeInTheDocument();
});
it('should render label prop when intlMessage prop is not provided', () => {
  render(<Stamp tone="positive" icon={<AngleDownIcon />} label="Hello" />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
it('should render the children', () => {
  render(<Stamp tone="positive">Hello</Stamp>);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
