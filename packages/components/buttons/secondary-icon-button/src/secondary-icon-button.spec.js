import React from 'react';
import { Link } from 'react-router-dom';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { render } from '../../../../../test/test-utils';
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
    const { getByLabelText } = render(<SecondaryIconButton {...props} />);
    expect(getByLabelText('test-button')).toBeInTheDocument();
    expect(getByLabelText('test-button')).not.toHaveAttribute('disabled');
  });
  it('should render icon', () => {
    const { getByTestId } = render(<SecondaryIconButton {...props} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });
  it('should pass aria attributes', () => {
    const { getByLabelText } = render(
      <SecondaryIconButton {...props} aria-describedby="tooltip-1" />
    );
    expect(getByLabelText('test-button')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    const { getByLabelText } = render(
      <SecondaryIconButton {...props} isDisabled={true} />
    );
    expect(getByLabelText('test-button')).toHaveAttribute('disabled');
    expect(getByLabelText('test-button')).toHaveAttribute(
      'aria-disabled',
      'true'
    );
  });
  describe('when there is a divergence between `disabled` and `isDisabled`', () => {
    describe('when `isDisabled` and not `disabled`', () => {
      it('should favour `isDisabled`', () => {
        const { getByLabelText } = render(
          <SecondaryIconButton {...props} isDisabled={true} disabled={false} />
        );
        expect(getByLabelText('test-button')).toHaveAttribute('disabled');
        expect(getByLabelText('test-button')).toHaveAttribute(
          'aria-disabled',
          'true'
        );
      });
    });
    describe('when not `isDisabled` and `disabled`', () => {
      it('should favour `isDisabled`', () => {
        const { getByLabelText } = render(
          <SecondaryIconButton {...props} isDisabled={false} disabled={true} />
        );
        expect(getByLabelText('test-button')).not.toHaveAttribute('disabled');
        expect(getByLabelText('test-button')).not.toHaveAttribute(
          'aria-disabled',
          'true'
        );
      });
    });
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      const { getByLabelText } = render(<SecondaryIconButton {...props} />);
      expect(getByLabelText('test-button')).toHaveAttribute('type', 'button');
    });
    it('should render a button of type "submit"', () => {
      const { getByLabelText } = render(
        <SecondaryIconButton {...props} type="submit" />
      );
      expect(getByLabelText('test-button')).toHaveAttribute('type', 'submit');
    });
    it('should render a button of type "reset"', () => {
      const { getByLabelText } = render(
        <SecondaryIconButton {...props} type="reset" />
      );
      expect(getByLabelText('test-button')).toHaveAttribute('type', 'reset');
    });
  });
  describe('when used with `as`', () => {
    describe('when as is a valid HTML element', () => {
      it('should render as that HTML element', () => {
        const { container } = render(
          <SecondaryIconButton
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
        expect(linkButton).not.toHaveAttribute('type', 'button');
        expect(linkButton).toHaveAttribute('target', '_BLANK');
      });
    });
    describe('when as is a React component', () => {
      it('should render as that component', () => {
        const { getByLabelText } = render(
          <SecondaryIconButton
            {...props}
            as={Link}
            to="foo/bar"
            target="_BLANK"
          />
        );

        const linkButton = getByLabelText('test-button');
        expect(linkButton).toHaveAttribute('href', '/foo/bar');
        expect(linkButton).toHaveAttribute('target', '_BLANK');
        expect(linkButton).not.toHaveAttribute('type', 'button');
      });
    });
  });
});
