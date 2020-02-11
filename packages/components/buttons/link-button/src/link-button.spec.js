import React from 'react';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { render, fireEvent, wait } from '../../../../../src/test-utils';
import LinkButton from './link-button';

const createTestProps = custom => ({
  label: 'test-button',
  to: '/foo/bar',
  iconLeft: <PlusBoldIcon data-testid="icon" />,
  ...custom,
});

describe('rendering', () => {
  /* eslint-disable no-console */
  let props;
  let log;
  beforeEach(() => {
    props = createTestProps();
    log = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = log;
  });

  it('should warn', () => {
    render(<LinkButton {...props} />);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(
        'Warning: "LinkButton" has been deprecated and will be removed in the next major version.'
      )
    );
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
