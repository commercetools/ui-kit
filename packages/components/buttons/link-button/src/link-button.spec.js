import { PlusBoldIcon } from '@commercetools-uikit/icons';
import {
  screen,
  render,
  fireEvent,
  waitFor,
} from '../../../../../test/test-utils';
import LinkButton from './link-button';

const createTestProps = (custom) => ({
  label: 'test-button',
  to: '/foo/bar',
  iconLeft: <PlusBoldIcon data-testid="icon" />,
  ...custom,
});

describe('rendering', () => {
  /* eslint-disable no-console */
  let props;
  const consoleWarnMock = jest.fn();
  beforeEach(() => {
    props = createTestProps();
    consoleWarnMock.mockClear();
    console.warn = consoleWarnMock;
  });

  it('should warn', () => {
    render(<LinkButton {...props} />);

    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Warning: "LinkButton" has been deprecated and will be removed in the next major version.'
    );
  });

  it('should render', () => {
    render(<LinkButton {...props} />);
    expect(screen.getByLabelText('test-button')).toBeInTheDocument();
    expect(screen.getByLabelText('test-button')).toBeEnabled();
  });
  it('should navigate to link when clicked', async () => {
    const { history } = render(<LinkButton {...props} />);
    fireEvent.click(screen.getByLabelText('test-button'));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foo/bar');
    });
  });
  it('should pass aria attributes"', () => {
    render(<LinkButton {...props} aria-describedby="tooltip-1" />);
    expect(screen.getByLabelText('test-button')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should prevent the navigation when "disabled"', async () => {
    const { history } = render(<LinkButton {...props} isDisabled={true} />);
    fireEvent.click(screen.getByLabelText('test-button'));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
  it('should render icon', () => {
    render(<LinkButton {...props} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
