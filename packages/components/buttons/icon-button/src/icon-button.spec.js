import React from 'react';
import { Link } from 'react-router-dom';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { render } from '../../../../../src/test-utils';
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
    const { getByLabelText } = render(<IconButton {...props} />);
    expect(getByLabelText('test-button')).toBeInTheDocument();
    expect(getByLabelText('test-button')).not.toHaveAttribute('disabled');
  });
  it('should be pass aria attributes', () => {
    const { getByLabelText } = render(
      <IconButton {...props} aria-describedby="tooltip-1" />
    );
    expect(getByLabelText('test-button')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    const { getByLabelText } = render(
      <IconButton {...props} isDisabled={true} />
    );
    expect(getByLabelText('test-button')).toHaveAttribute('disabled');
    expect(getByLabelText('test-button')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
  it('should render icon', () => {
    const { getByTestId } = render(<IconButton {...props} />);
    expect(getByTestId('icon')).toBeInTheDocument();
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
        const { getByLabelText } = render(
          <IconButton {...props} as={Link} to="foo/bar" target="_BLANK" />
        );

        const linkButton = getByLabelText('test-button');
        expect(linkButton).toHaveAttribute('href', '/foo/bar');
      });
    });
  });
});
