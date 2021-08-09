import { Link } from 'react-router-dom';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { screen, render } from '../../../../../test/test-utils';
import IconButton from './icon-button';

const createTestProps = (custom) => ({
  type: 'button',
  label: 'test-button',
  onClick: jest.fn(),
  icon: <PlusBoldIcon data-testid="icon" />,

  ...custom,
});

describe('rendering', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });
  it('should render', () => {
    render(<IconButton {...props} />);
    expect(screen.getByLabelText('test-button')).toBeInTheDocument();
    expect(screen.getByLabelText('test-button')).toBeEnabled();
  });
  it('should be pass aria attributes', () => {
    render(<IconButton {...props} aria-describedby="tooltip-1" />);
    expect(screen.getByLabelText('test-button')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    render(<IconButton {...props} isDisabled={true} />);
    expect(screen.getByLabelText('test-button')).toBeDisabled();
    expect(screen.getByLabelText('test-button')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
  it('should render icon', () => {
    render(<IconButton {...props} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
  describe('when used with `as`', () => {
    describe('when as is a valid HTML element', () => {
      it('should render as that HTML element', () => {
        const { container } = render(
          <IconButton
            {...props}
            as="a"
            href="https://www.kanyetothe.com"
            target="_BLANK"
          />
        );
        const linkButton = container.querySelector('a');
        expect(linkButton).toHaveAttribute(
          'href',
          'https://www.kanyetothe.com'
        );
        expect(linkButton).toHaveAttribute('target', '_BLANK');
      });
    });
    describe('when as is a React component', () => {
      it('should render as that component', () => {
        render(
          <IconButton {...props} as={Link} to="foo/bar" target="_BLANK" />
        );

        const linkButton = screen.getByLabelText('test-button');
        expect(linkButton).toHaveAttribute('href', '/foo/bar');
      });
    });
  });
});
