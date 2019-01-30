import React from 'react';
import { render } from '../../../test-utils';
import { PlusBoldIcon } from '../../icons';
import PrimaryButton from './primary-button';

const createTestProps = custom => ({
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
  it('should pass as aria attributes', () => {
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
});
