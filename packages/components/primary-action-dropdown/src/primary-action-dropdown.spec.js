import React from 'react';
import { CloseBoldIcon } from '@commercetools-uikit/icons';
import { render, fireEvent } from '../../../../test/test-utils';
import PrimaryActionDropdown, { Option } from './primary-action-dropdown';

it('should execute the primary actions callback when primary action is clicked', () => {
  const primaryAction = jest.fn();
  const { getByLabelText } = render(
    <PrimaryActionDropdown>
      <Option iconLeft={<CloseBoldIcon />} onClick={primaryAction}>
        Primary Action
      </Option>
      <Option iconLeft={<CloseBoldIcon />} onClick={() => {}}>
        Secondary Action
      </Option>
    </PrimaryActionDropdown>
  );
  getByLabelText('Primary Action').click();
  expect(primaryAction).toHaveBeenCalledTimes(1);
});

describe('when all options are disabled', () => {
  it('should prevent interaction', () => {
    const primaryAction = jest.fn();
    const { getByLabelText, queryByLabelText } = render(
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
    expect(getByLabelText('Primary Action')).toHaveAttribute('disabled');

    // it should not invoke callback when primary action is clicked
    getByLabelText('Primary Action').click();
    expect(primaryAction).not.toHaveBeenCalled();

    // it should not allow opening remaining actions
    expect(getByLabelText('Open Dropdown')).toHaveAttribute('disabled');
    getByLabelText('Open Dropdown').click();
    expect(queryByLabelText('Secondary Action')).not.toBeInTheDocument();
  });
});

describe('when only primary option is disabled', () => {
  it('should prevent interaction with primary option', () => {
    const primaryAction = jest.fn();
    const secondaryAction = jest.fn();
    const { getByLabelText } = render(
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
    getByLabelText('Secondary Action').click();
    expect(secondaryAction).toHaveBeenCalled();

    // it should allow opening remaining actions
    getByLabelText('Open Dropdown').click();
    expect(getByLabelText('Primary Action')).toBeInTheDocument();

    // it should not invoke callback when disabled primary action is clicked
    expect(getByLabelText('Primary Action')).toHaveAttribute('disabled');
    getByLabelText('Primary Action').click();
    expect(primaryAction).not.toHaveBeenCalled();
  });
});

describe('when only secondary option is disabled', () => {
  it('should prevent interaction with secondary option', () => {
    const primaryAction = jest.fn();
    const secondaryAction = jest.fn();
    const { getByLabelText } = render(
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
    getByLabelText('Primary Action').click();
    expect(primaryAction).toHaveBeenCalled();

    // it should allow opening remaining actions
    getByLabelText('Open Dropdown').click();
    expect(getByLabelText('Secondary Action')).toBeInTheDocument();

    // it should not invoke callback when disabled secondary action is clicked
    expect(getByLabelText('Secondary Action')).toHaveAttribute('disabled');
    getByLabelText('Secondary Action').click();
    expect(secondaryAction).not.toHaveBeenCalled();
  });
});

describe('when dropdown is open and body is clicked', () => {
  it('should close the dropdown', () => {
    const { container, getByLabelText, queryByLabelText } = render(
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
    getByLabelText('Open Dropdown').click();
    expect(getByLabelText('Secondary Action')).toBeInTheDocument();

    // click on document body
    fireEvent.click(container);

    // it should close the dropdown
    expect(queryByLabelText('Secondary Action')).not.toBeInTheDocument();
  });
});
