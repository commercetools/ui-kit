import { Routes, Route, Link } from 'react-router-dom';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import {
  screen,
  render,
  fireEvent,
  waitFor,
} from '../../../../../test/test-utils';
import SecondaryButton from './secondary-button';

const createTestProps = (custom) => ({
  label: 'Add',
  iconLeft: <PlusBoldIcon data-testid="icon" />,
  onClick: jest.fn(),
  ...custom,
});

describe('rendering', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });
  it('should render', () => {
    render(<SecondaryButton {...props} />);
    expect(screen.getByLabelText('Add')).toBeInTheDocument();
    expect(screen.getByLabelText('Add')).toBeEnabled();
  });
  it('should render left icon', () => {
    render(<SecondaryButton {...props} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
  it('should render right icon', () => {
    render(
      <SecondaryButton
        {...props}
        iconLeft={undefined}
        iconRight={<PlusBoldIcon data-testid="icon-right" />}
      />
    );
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('should render left + right icon', () => {
    render(
      <SecondaryButton
        {...props}
        iconRight={<PlusBoldIcon data-testid="icon-right" />}
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('should not render icon', () => {
    render(<SecondaryButton {...props} iconLeft={undefined} />);
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });
  it('should pass aria attributes', () => {
    render(<SecondaryButton {...props} aria-describedby="tooltip-1" />);
    expect(screen.getByLabelText('Add')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    render(<SecondaryButton {...props} isDisabled={true} />);
    expect(screen.getByLabelText('Add')).toBeDisabled();
    expect(screen.getByLabelText('Add')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
  it('should be marked as "active"', () => {
    render(
      <SecondaryButton {...props} isToggleButton={true} isToggled={true} />
    );
    expect(screen.getByLabelText('Add')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      render(<SecondaryButton {...props} />);
      expect(screen.getByLabelText('Add')).toHaveAttribute('type', 'button');
    });
    it('sscreen.hould render a button of type "submit"', () => {
      render(<SecondaryButton {...props} type="submit" />);
      expect(screen.getByLabelText('Add')).toHaveAttribute('type', 'submit');
    });
    it('should render a button of type "reset"', () => {
      render(<SecondaryButton {...props} type="reset" />);
      expect(screen.getByLabelText('Add')).toHaveAttribute('type', 'reset');
    });
  });
  describe('when using as', () => {
    it('should navigate to link when clicked', async () => {
      render(
        <Routes>
          <Route
            path="/"
            element={
              <SecondaryButton
                {...props}
                onClick={null}
                as={Link}
                to="/foo/bar"
              />
            }
          />
          <Route path="/foo/bar" element={<div>Foo Bar Page</div>} />
        </Routes>
      );
      fireEvent.click(screen.getByLabelText('Add'));
      await waitFor(() => {
        expect(screen.getByText('Foo Bar Page')).toBeInTheDocument();
      });
    });
  });
});
