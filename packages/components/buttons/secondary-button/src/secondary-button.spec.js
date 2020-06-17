import React from 'react';
import { Link } from 'react-router-dom';
import { PlusBoldIcon } from '@commercetools-uikit/icons';
import { render, fireEvent, waitFor } from '../../../../../test/test-utils';
import SecondaryButton from './secondary-button';

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
    const { getByLabelText } = render(<SecondaryButton {...props} />);
    expect(getByLabelText('Add')).toBeInTheDocument();
    expect(getByLabelText('Add')).toBeEnabled();
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
  it('should pass aria attributes', () => {
    const { getByLabelText } = render(
      <SecondaryButton {...props} aria-describedby="tooltip-1" />
    );
    expect(getByLabelText('Add')).toHaveAttribute(
      'aria-describedby',
      'tooltip-1'
    );
  });
  it('should be marked as "disabled"', () => {
    const { getByLabelText } = render(
      <SecondaryButton {...props} isDisabled={true} />
    );
    expect(getByLabelText('Add')).toBeDisabled();
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
    /* eslint-disable no-console */
    let log;
    beforeEach(() => {
      log = console.error;
      console.error = jest.fn();
    });
    afterEach(() => {
      console.error = log;
    });

    it('should warn', () => {
      render(<SecondaryButton {...props} onClick={null} linkTo="/foo/bar" />);

      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: "linkTo" property of "SecondaryButton" has been deprecated and will be removed in the next major version\./
        )
      );
    });

    it('should navigate to link when clicked', async () => {
      const { getByLabelText, history } = render(
        <SecondaryButton {...props} onClick={null} linkTo="/foo/bar" />
      );
      fireEvent.click(getByLabelText('Add'));
      await waitFor(() => {
        expect(history.location.pathname).toBe('/foo/bar');
      });
    });
  });
  describe('when using `to` without using `as`', () => {
    /* eslint-disable no-console */
    let log;
    beforeEach(() => {
      log = console.error;
      console.error = jest.fn();
    });
    afterEach(() => {
      console.error = log;
    });

    it('should warn', () => {
      render(<SecondaryButton {...props} onClick={null} to="/foo/bar" />);

      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: Invalid prop "to" supplied to "SecondaryButton"\./
        )
      );
    });
  });
  describe('when using as', () => {
    describe('when not disabled', () => {
      it('should navigate to link when clicked', async () => {
        const { getByLabelText, history } = render(
          <SecondaryButton {...props} onClick={null} as={Link} to="/foo/bar" />
        );

        fireEvent.click(getByLabelText('Add'));

        await waitFor(() => {
          expect(history.location.pathname).toBe('/foo/bar');
        });
      });
    });

    describe('when disabled', () => {
      it('should navigate to link when clicked', async () => {
        const { getByLabelText } = render(
          <SecondaryButton
            {...props}
            isDisabled={true}
            onClick={null}
            as={Link}
            to="/foo/bar"
          />
        );

        const button = getByLabelText('Add');

        expect(button).toHaveAttribute('aria-disabled');
        expect(button).toHaveAttribute('href', '/');
      });
    });
  });
});
