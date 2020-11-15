import React from 'react';
import { BrainIcon } from '@commercetools-uikit/icons';
import { screen, render } from '../../../../../../test/test-utils';
import LocalizedInputToggle from './localized-input-toggle';

const createTestProps = (custom) => ({
  isOpen: false,
  onClick: jest.fn(),
  remainingLocalizations: 2,
  ...custom,
});

describe('button messages', () => {
  describe('when is open', () => {
    const testProps = createTestProps({ isOpen: true });
    it('should render a "hide languages" button if it is open', () => {
      render(<LocalizedInputToggle {...testProps} />);
      expect(screen.getByLabelText(/Hide languages/)).toBeInTheDocument();
    });

    it('should display a custom string message', () => {
      render(
        <LocalizedInputToggle {...testProps} hideMessage="hide whatever" />
      );
      expect(screen.getByLabelText('hide whatever')).toBeInTheDocument();
    });
    it('should display a custom intl message', () => {
      const intlMessage = { id: 'localized', defaultMessage: 'hide things' };
      render(<LocalizedInputToggle {...testProps} hideMessage={intlMessage} />);
      expect(screen.getByLabelText('hide things')).toBeInTheDocument();
    });
  });
  describe('when is closed', () => {
    const testProps = createTestProps({ isOpen: false });
    it('should render a "show languages" button if it is not open', () => {
      render(<LocalizedInputToggle {...testProps} />);
      expect(screen.getByLabelText(/Show all languages/)).toBeInTheDocument();
    });

    it('should display a custom string message', () => {
      render(
        <LocalizedInputToggle {...testProps} showMessage="show whatever" />
      );
      expect(screen.getByLabelText('show whatever')).toBeInTheDocument();
    });
    it('should display a custom intl message', () => {
      const intlMessage = { id: 'localized', defaultMessage: 'show things' };
      render(<LocalizedInputToggle {...testProps} showMessage={intlMessage} />);
      expect(screen.getByLabelText('show things')).toBeInTheDocument();
    });
  });

  it('should display the number of remaining languages', () => {
    render(
      <LocalizedInputToggle
        {...createTestProps({ remainingLocalizations: 5 })}
      />
    );
    expect(screen.getByLabelText(/(5)/)).toBeInTheDocument();
  });
});

it('should disable the button', () => {
  render(<LocalizedInputToggle {...createTestProps({ isDisabled: true })} />);
  expect(screen.getByLabelText(/languages/)).toBeDisabled();
});

it('should trigger the onClick callback when the button is clicked', () => {
  const onClick = jest.fn();

  render(<LocalizedInputToggle {...createTestProps({ onClick })} />);
  screen.getByLabelText(/languages/).click();
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('should render a custom icon', () => {
  render(
    <LocalizedInputToggle
      {...createTestProps({ icon: <BrainIcon data-testid="my-icon" /> })}
    />
  );
  expect(screen.getByTestId('my-icon')).toBeInTheDocument();
});
