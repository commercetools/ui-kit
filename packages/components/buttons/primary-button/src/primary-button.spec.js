import { Link } from 'react-router-dom';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { screen, render } from '../../../../../test/test-utils';
import PrimaryButton from './primary-button';

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
    render(<PrimaryButton {...props} />);
    expect(screen.getByLabelText('Add')).toBeInTheDocument();
    expect(screen.getByLabelText('Add')).toBeEnabled();
  });
  it('should render left icon', () => {
    render(<PrimaryButton {...props} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
  it('should render right icon', () => {
    render(
      <PrimaryButton
        {...props}
        iconLeft={undefined}
        iconRight={<PlusBoldIcon data-testid="icon-right" />}
      />
    );
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('should render both icons', () => {
    render(
      <PrimaryButton
        {...props}
        iconRight={<PlusBoldIcon data-testid="icon-right" />}
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('should not render icon', () => {
    const { queryByTestId } = render(
      <PrimaryButton {...props} iconLeft={undefined} />
    );
    expect(queryByTestId('icon')).not.toBeInTheDocument();
  });
  it('should pass aria attributes', () => {
    render(<PrimaryButton {...props} aria-describedby="tooltip-1" />);
    expect(screen.getByLabelText('Add')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    render(<PrimaryButton {...props} isDisabled={true} />);
    expect(screen.getByLabelText('Add')).toBeDisabled();
    expect(screen.getByLabelText('Add')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
  it('should be marked as "active"', () => {
    render(<PrimaryButton {...props} isToggleButton={true} isToggled={true} />);
    expect(screen.getByLabelText('Add')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      render(<PrimaryButton {...props} />);
      expect(screen.getByLabelText('Add')).toHaveAttribute('type', 'button');
    });
    it('should render a button of type "submit"', () => {
      render(<PrimaryButton {...props} type="submit" />);
      expect(screen.getByLabelText('Add')).toHaveAttribute('type', 'submit');
    });
    it('should render a button of type "reset"', () => {
      render(<PrimaryButton {...props} type="reset" />);
      expect(screen.getByLabelText('Add')).toHaveAttribute('type', 'reset');
    });
  });
  describe('when used with `as`', () => {
    describe('when as is a valid HTML element', () => {
      it('should render as that HTML element', () => {
        render(
          <PrimaryButton
            {...props}
            as="a"
            href="https://www.kanyetothe.com"
            target="_BLANK"
          />
        );
        const linkButton = screen.getByLabelText('Add');
        expect(linkButton).toHaveAttribute(
          'href',
          'https://www.kanyetothe.com'
        );
        expect(linkButton).not.toHaveAttribute('type', 'button');
        expect(linkButton).toHaveAttribute('target', '_BLANK');
      });
    });
    describe('when as is a React component', () => {
      it('should render as that component', () => {
        render(
          <PrimaryButton {...props} as={Link} to="foo/bar" target="_BLANK" />
        );

        const linkButton = screen.getByLabelText('Add');
        expect(linkButton).toHaveAttribute('href', '/foo/bar');
        expect(linkButton).toHaveAttribute('target', '_BLANK');
        expect(linkButton).not.toHaveAttribute('type', 'button');
      });
    });
  });
});
