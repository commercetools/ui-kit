import React from 'react';
import { Link } from 'react-router-dom';
import { PlusThinIcon } from '@commercetools-uikit/icons';
import { render } from '../../../../../src/test-utils';
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
    const { getByLabelText } = render(<FlatButton {...props} />);
    expect(getByLabelText('Add')).toBeInTheDocument();
    expect(getByLabelText('Add')).not.toHaveAttribute('disabled');
  });
  it('should pass aria attributes"', () => {
    const { getByLabelText } = render(
      <FlatButton {...props} isDisabled={true} aria-describedby="tooltip-1" />
    );
    expect(getByLabelText('Add')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    const { getByLabelText } = render(
      <FlatButton {...props} isDisabled={true} />
    );
    expect(getByLabelText('Add')).toHaveAttribute('disabled');
    expect(getByLabelText('Add')).toHaveAttribute('aria-disabled', 'true');
  });
  it('should render icon', () => {
    const { getByTestId } = render(<FlatButton {...props} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });
  it('should render label', () => {
    const { getByLabelText } = render(<FlatButton {...props} />);
    expect(getByLabelText('Add')).toHaveTextContent('Add');
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      const { getByLabelText } = render(<FlatButton {...props} />);
      expect(getByLabelText('Add')).toHaveAttribute('type', 'button');
    });
    it('should render a button of type "submit"', () => {
      const { getByLabelText } = render(
        <FlatButton {...props} type="submit" />
      );
      expect(getByLabelText('Add')).toHaveAttribute('type', 'submit');
    });
    it('should render a button of type "reset"', () => {
      const { getByLabelText } = render(<FlatButton {...props} type="reset" />);
      expect(getByLabelText('Add')).toHaveAttribute('type', 'reset');
    });
  });
  describe('when used with `as`', () => {
    describe('when as is a valid HTML element', () => {
      it('should render as that HTML element', () => {
        const { getByLabelText } = render(
          <FlatButton
            {...props}
            as="a"
            href="https://www.kanyetothe.com"
            target="_BLANK"
          />
        );
        const linkButton = getByLabelText('Add');
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
        const { getByLabelText } = render(
          <FlatButton {...props} as={Link} to="foo/bar" target="_BLANK" />
        );

        const linkButton = getByLabelText('Add');
        expect(linkButton).toHaveAttribute('href', '/foo/bar');
        expect(linkButton).toHaveAttribute('target', '_BLANK');
        expect(linkButton).not.toHaveAttribute('type', 'button');
      });
    });
  });
});
