import React from 'react';
import { render, fireEvent, wait } from '../../../test-utils';
import { PlusBoldIcon } from '../../icons';
import LinkButton from './link-button';

const createTestProps = custom => ({
  label: 'test-button',
  to: '/foo/bar',
  iconLeft: <PlusBoldIcon data-testid="icon" />,
  ...custom,
});

describe('rendering', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });
  it('should render', () => {
    const { getByLabelText } = render(<LinkButton {...props} />);
    expect(getByLabelText('test-button')).toBeInTheDocument();
    expect(getByLabelText('test-button')).not.toHaveAttribute('disabled');
  });
  it('should navigate to link when clicked', async () => {
    const { getByLabelText, history } = render(<LinkButton {...props} />);
    fireEvent.click(getByLabelText('test-button'));
    await wait(() => {
      expect(history.location.pathname).toBe('/foo/bar');
    });
  });
  it('should pass aria attributes"', () => {
    const { getByLabelText } = render(
      <LinkButton {...props} aria-describedby="tooltip-1" />
    );
    expect(getByLabelText('test-button')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should pass events', () => {
    const onFocus = jest.fn();
    const { getByLabelText } = render(
      <LinkButton {...props} onFocus={onFocus} />
    );
    getByLabelText('test-button').focus();
    expect(onFocus).toHaveBeenCalled();
  });
  it('should prevent the navigation when "disabled"', async () => {
    const { getByLabelText, history } = render(
      <LinkButton {...props} isDisabled={true} />
    );
    fireEvent.click(getByLabelText('test-button'));
    await wait(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
  it('should render icon', () => {
    const { getByTestId } = render(<LinkButton {...props} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });
});
