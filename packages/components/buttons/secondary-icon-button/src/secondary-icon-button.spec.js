import React from 'react';
import { Link } from 'react-router-dom';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { screen, render } from '../../../../../test/test-utils';
import SecondaryIconButton from './secondary-icon-button';

const createTestProps = (custom) => ({
  label: 'test-button',
  icon: <PlusBoldIcon data-testid="icon" />,
  onClick: jest.fn(),
  ...custom,
});

describe('rendering', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });
  it('should render', () => {
    render(<SecondaryIconButton {...props} />);
    expect(screen.getByLabelText('test-button')).toBeInTheDocument();
    expect(screen.getByLabelText('test-button')).toBeEnabled();
  });
  it('should render icon', () => {
    render(<SecondaryIconButton {...props} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
  it('should pass aria attributes', () => {
    render(<SecondaryIconButton {...props} aria-describedby="tooltip-1" />);
    expect(screen.getByLabelText('test-button')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    render(<SecondaryIconButton {...props} isDisabled={true} />);
    expect(screen.getByLabelText('test-button')).toBeDisabled();
    expect(screen.getByLabelText('test-button')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
  describe('when there is a divergence between `disabled` and `isDisabled`', () => {
    describe('when `isDisabled` and not `disabled`', () => {
      it('should favour `isDisabled`', () => {
        render(
          <SecondaryIconButton {...props} isDisabled={true} disabled={false} />
        );
        expect(screen.getByLabelText('test-button')).toBeDisabled();
        expect(screen.getByLabelText('test-button')).toHaveAttribute(
          'aria-disabled',
          'true'
        );
      });
    });
    describe('when not `isDisabled` and `disabled`', () => {
      it('should favour `isDisabled`', () => {
        render(
          <SecondaryIconButton {...props} isDisabled={false} disabled={true} />
        );
        expect(screen.getByLabelText('test-button')).toBeEnabled();
        expect(screen.getByLabelText('test-button')).not.toHaveAttribute(
          'aria-disabled',
          'true'
        );
      });
    });
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      render(<SecondaryIconButton {...props} />);
      expect(screen.getByLabelText('test-button')).toHaveAttribute(
        'type',
        'button'
      );
    });
    it('should render a button of type "submit"', () => {
      render(<SecondaryIconButton {...props} type="submit" />);
      expect(screen.getByLabelText('test-button')).toHaveAttribute(
        'type',
        'submit'
      );
    });
    it('should render a button of type "reset"', () => {
      render(<SecondaryIconButton {...props} type="reset" />);
      expect(screen.getByLabelText('test-button')).toHaveAttribute(
        'type',
        'reset'
      );
    });
  });
  describe('when used with `as`', () => {
    describe('when as is a valid HTML element', () => {
      it('should render as that HTML element', () => {
        render(
          <SecondaryIconButton
            {...props}
            as="a"
            href="https://www.kanyetothe.com"
            target="_BLANK"
          />
        );
        const linkButton = screen.getByRole('button');
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
          <SecondaryIconButton
            {...props}
            as={Link}
            to="foo/bar"
            target="_BLANK"
          />
        );

        const linkButton = screen.getByLabelText('test-button');
        expect(linkButton).toHaveAttribute('href', '/foo/bar');
        expect(linkButton).toHaveAttribute('target', '_BLANK');
        expect(linkButton).not.toHaveAttribute('type', 'button');
      });
    });
  });
});
