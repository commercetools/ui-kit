import { CloseBoldIcon } from '@commercetools-uikit/icons';
import { screen, render, fireEvent } from '../../../../test/test-utils';
import PrimaryActionDropdown from './primary-action-dropdown';
import Option from './option';

it('should execute the primary actions callback when primary action is clicked', () => {
  const primaryAction = jest.fn();
  render(
    <PrimaryActionDropdown>
      <Option iconLeft={<CloseBoldIcon />} onClick={primaryAction}>
        Primary Action
      </Option>
      <Option iconLeft={<CloseBoldIcon />} onClick={() => {}}>
        Secondary Action
      </Option>
    </PrimaryActionDropdown>
  );
  screen.getByLabelText('Primary Action').click();
  expect(primaryAction).toHaveBeenCalledTimes(1);
});

describe('when all options are disabled', () => {
  it('should prevent interaction', () => {
    const primaryAction = jest.fn();
    render(
      <PrimaryActionDropdown>
        <Option
          iconLeft={<CloseBoldIcon />}
          onClick={primaryAction}
          isDisabled={true}
        >
          Primary Action
        </Option>
        <Option
          isDisabled={true}
          iconLeft={<CloseBoldIcon />}
          onClick={() => {}}
        >
          Secondary Action
        </Option>
      </PrimaryActionDropdown>
    );

    // it should not allow opening the dropdown
    expect(screen.getByLabelText('Primary Action')).toBeDisabled();

    // it should not invoke callback when primary action is clicked
    fireEvent.click(screen.getByLabelText('Primary Action'));
    expect(primaryAction).not.toHaveBeenCalled();

    // it should not allow opening remaining actions
    expect(screen.getByLabelText('Open Dropdown')).toBeDisabled();
    fireEvent.click(screen.getByLabelText('Open Dropdown'));
    expect(screen.queryByLabelText('Secondary Action')).not.toBeInTheDocument();
  });
});

describe('when only primary option is disabled', () => {
  it('should prevent interaction with primary option', () => {
    const primaryAction = jest.fn();
    const secondaryAction = jest.fn();
    render(
      <PrimaryActionDropdown>
        <Option
          isDisabled={true}
          iconLeft={<CloseBoldIcon />}
          onClick={primaryAction}
        >
          Primary Action
        </Option>
        <Option iconLeft={<CloseBoldIcon />} onClick={secondaryAction}>
          Secondary Action
        </Option>
      </PrimaryActionDropdown>
    );

    // it should invoke callback when secondary action is clicked,
    // as secondary option gets hoisted to the top
    fireEvent.click(screen.getByLabelText('Secondary Action'));
    expect(secondaryAction).toHaveBeenCalled();

    // it should allow opening remaining actions
    fireEvent.click(screen.getByLabelText('Open Dropdown'));
    expect(screen.getByLabelText('Primary Action')).toBeInTheDocument();

    // it should not invoke callback when disabled primary action is clicked
    expect(screen.getByLabelText('Primary Action')).toBeDisabled();
    fireEvent.click(screen.getByLabelText('Primary Action'));
    expect(primaryAction).not.toHaveBeenCalled();
  });
});

describe('when only secondary option is disabled', () => {
  it('should prevent interaction with secondary option', () => {
    const primaryAction = jest.fn();
    const secondaryAction = jest.fn();
    render(
      <PrimaryActionDropdown>
        <Option iconLeft={<CloseBoldIcon />} onClick={primaryAction}>
          Primary Action
        </Option>
        <Option
          isDisabled={true}
          iconLeft={<CloseBoldIcon />}
          onClick={secondaryAction}
        >
          Secondary Action
        </Option>
      </PrimaryActionDropdown>
    );

    // it should invoke callback when primary action is clicked
    fireEvent.click(screen.getByLabelText('Primary Action'));
    expect(primaryAction).toHaveBeenCalled();

    // it should allow opening remaining actions
    fireEvent.click(screen.getByLabelText('Open Dropdown'));
    expect(screen.getByLabelText('Secondary Action')).toBeInTheDocument();

    // it should not invoke callback when disabled secondary action is clicked
    expect(screen.getByLabelText('Secondary Action')).toBeDisabled();
    fireEvent.click(screen.getByLabelText('Secondary Action'));
    expect(secondaryAction).not.toHaveBeenCalled();
  });
});

describe('when dropdown is open and body is clicked', () => {
  it('should close the dropdown', () => {
    const { container } = render(
      <PrimaryActionDropdown>
        <Option iconLeft={<CloseBoldIcon />} onClick={() => {}}>
          Primary Action
        </Option>
        <Option iconLeft={<CloseBoldIcon />} onClick={() => {}}>
          Secondary Action
        </Option>
      </PrimaryActionDropdown>
    );

    // it should allow opening remaining actions
    fireEvent.click(screen.getByLabelText('Open Dropdown'));
    expect(screen.getByLabelText('Secondary Action')).toBeInTheDocument();

    // click on document body
    fireEvent.click(container);

    // it should close the dropdown
    expect(screen.queryByLabelText('Secondary Action')).not.toBeInTheDocument();
  });
});
