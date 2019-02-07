import React from 'react';
import { render } from '../../../test-utils';
import { PlusBoldIcon } from '../../icons';
import SecondaryIconButton from './secondary-icon-button';

const createTestProps = custom => ({
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
});
