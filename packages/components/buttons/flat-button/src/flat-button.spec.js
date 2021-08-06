import { Link } from 'react-router-dom';
import { PlusThinIcon } from '@commercetools-uikit/icons';
import { screen, render } from '../../../../../test/test-utils';
import FlatButton from './flat-button';

const createTestProps = (props) => ({
  tone: 'primary',
  label: 'Add',
  onClick: jest.fn(),
  icon: <PlusThinIcon size="medium" data-testid="icon" />,
  isDisabled: false,
  ...props,
});

describe('rendering', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });
  it('should render', () => {
    render(<FlatButton {...props} />);
    expect(screen.getByLabelText('Add')).toBeInTheDocument();
    expect(screen.getByLabelText('Add')).toBeEnabled();
  });
  it('should pass aria attributes"', () => {
    render(
      <FlatButton {...props} isDisabled={true} aria-describedby="tooltip-1" />
    );
    expect(screen.getByLabelText('Add')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    render(<FlatButton {...props} isDisabled={true} />);
    expect(screen.getByLabelText('Add')).toBeDisabled();
    expect(screen.getByLabelText('Add')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
  it('should render icon', () => {
    const { getByTestId } = render(<FlatButton {...props} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });
  it('should render label', () => {
    render(<FlatButton {...props} />);
    expect(screen.getByLabelText('Add')).toHaveTextContent('Add');
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      render(<FlatButton {...props} />);
      expect(screen.getByLabelText('Add')).toHaveAttribute('type', 'button');
    });
    it('should render a button of type "submit"', () => {
      render(<FlatButton {...props} type="submit" />);
      expect(screen.getByLabelText('Add')).toHaveAttribute('type', 'submit');
    });
    it('should render a button of type "reset"', () => {
      render(<FlatButton {...props} type="reset" />);
      expect(screen.getByLabelText('Add')).toHaveAttribute('type', 'reset');
    });
  });
  describe('when used with `as`', () => {
    describe('when as is a valid HTML element', () => {
      it('should render as that HTML element', () => {
        render(
          <FlatButton
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
          <FlatButton {...props} as={Link} to="foo/bar" target="_BLANK" />
        );

        const linkButton = screen.getByLabelText('Add');
        expect(linkButton).toHaveAttribute('href', '/foo/bar');
        expect(linkButton).toHaveAttribute('target', '_BLANK');
        expect(linkButton).not.toHaveAttribute('type', 'button');
      });
    });
  });
});
