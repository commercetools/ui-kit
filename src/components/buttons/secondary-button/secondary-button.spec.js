import React from 'react';
import { render, fireEvent, wait } from '../../../test-utils';
import { PlusBoldIcon } from '../../icons';
import SecondaryButton from './secondary-button';

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
    const { getByLabelText } = render(<SecondaryButton {...props} />);
    expect(getByLabelText('Add')).toBeInTheDocument();
    expect(getByLabelText('Add')).not.toHaveAttribute('disabled');
  });
  it('should render icon', () => {
    const { getByTestId } = render(<SecondaryButton {...props} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });
  it('should not render icon', () => {
    const { queryByTestId } = render(
      <SecondaryButton {...props} iconLeft={undefined} />
    );
    expect(queryByTestId('icon')).not.toBeInTheDocument();
  });
  it('should be marked as "disabled"', () => {
    const { getByLabelText } = render(
      <SecondaryButton {...props} isDisabled={true} />
    );
    expect(getByLabelText('Add')).toHaveAttribute('disabled');
    expect(getByLabelText('Add')).toHaveAttribute('aria-disabled', 'true');
  });
  it('should be marked as "active"', () => {
    const { getByLabelText } = render(
      <SecondaryButton {...props} isToggleButton={true} isToggled={true} />
    );
    expect(getByLabelText('Add')).toHaveAttribute('aria-pressed', 'true');
  });
  describe('type variations', () => {
    it('should render a button of type "button"', () => {
      const { getByLabelText } = render(<SecondaryButton {...props} />);
      expect(getByLabelText('Add')).toHaveAttribute('type', 'button');
    });
    it('should render a button of type "submit"', () => {
      const { getByLabelText } = render(
        <SecondaryButton {...props} type="submit" />
      );
      expect(getByLabelText('Add')).toHaveAttribute('type', 'submit');
    });
    it('should render a button of type "reset"', () => {
      const { getByLabelText } = render(
        <SecondaryButton {...props} type="reset" />
      );
      expect(getByLabelText('Add')).toHaveAttribute('type', 'reset');
    });
  });
  describe('when using "linkTo"', () => {
    it('should navigate to link when clicked', async () => {
      const { getByLabelText, history } = render(
        <SecondaryButton {...props} linkTo="/foo/bar" />
      );
      fireEvent.click(getByLabelText('Add'));
      await wait(() => {
        expect(history.location.pathname).toBe('/foo/bar');
      });
    });
  });
});
