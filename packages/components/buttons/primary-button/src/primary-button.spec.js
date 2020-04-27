import React from 'react';
import { Link } from 'react-router-dom';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { render } from '../../../../../test/test-utils';
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
    const { getByLabelText } = render(<PrimaryButton {...props} />);
    expect(getByLabelText('Add')).toBeInTheDocument();
    expect(getByLabelText('Add')).not.toHaveAttribute('disabled');
  });
  it('should render icon', () => {
    const { getByTestId } = render(<PrimaryButton {...props} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });
  it('should not render icon', () => {
    const { queryByTestId } = render(
      <PrimaryButton {...props} iconLeft={undefined} />
    );
    expect(queryByTestId('icon')).not.toBeInTheDocument();
  });
  it('should pass aria attributes', () => {
    const { getByLabelText } = render(
      <PrimaryButton {...props} aria-describedby="tooltip-1" />
    );
    expect(getByLabelText('Add')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    const { getByLabelText } = render(
      <PrimaryButton {...props} isDisabled={true} />
    );
    expect(getByLabelText('Add')).toHaveAttribute('disabled');
    expect(getByLabelText('Add')).toHaveAttribute('aria-disabled', 'true');
  });
  it('should be marked as "active"', () => {
    const { getByLabelText } = render(
      <PrimaryButton {...props} isToggleButton={true} isToggled={true} />
    );
    expect(getByLabelText('Add')).toHaveAttribute('aria-pressed', 'true');
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      const { getByLabelText } = render(<PrimaryButton {...props} />);
      expect(getByLabelText('Add')).toHaveAttribute('type', 'button');
    });
    it('should render a button of type "submit"', () => {
      const { getByLabelText } = render(
        <PrimaryButton {...props} type="submit" />
      );
      expect(getByLabelText('Add')).toHaveAttribute('type', 'submit');
    });
    it('should render a button of type "reset"', () => {
      const { getByLabelText } = render(
        <PrimaryButton {...props} type="reset" />
      );
      expect(getByLabelText('Add')).toHaveAttribute('type', 'reset');
    });
  });
  describe('when used with `as`', () => {
    describe('when as is a valid HTML element', () => {
      it('should render as that HTML element', () => {
        const { getByLabelText } = render(
          <PrimaryButton
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
          <PrimaryButton {...props} as={Link} to="foo/bar" target="_BLANK" />
        );

        const linkButton = getByLabelText('Add');
        expect(linkButton).toHaveAttribute('href', '/foo/bar');
        expect(linkButton).toHaveAttribute('target', '_BLANK');
        expect(linkButton).not.toHaveAttribute('type', 'button');
      });
    });
  });
});
