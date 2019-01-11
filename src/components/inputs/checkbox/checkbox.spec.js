import React from 'react';
import { render } from '../../../test-utils';
import { Checkbox } from './checkbox';

jest.mock('tiny-invariant');

it('should render the label', () => {
  const { getByLabelText } = render(
    <Checkbox onChange={() => {}} isChecked={false}>
      Accept Terms
    </Checkbox>
  );
  expect(getByLabelText('Accept Terms')).toBeInTheDocument();
});

it('should call onChange when text is clicked', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <Checkbox onChange={onChange} isChecked={false}>
      Accept Terms
    </Checkbox>
  );
  getByLabelText('Accept Terms').click();
  expect(onChange).toHaveBeenCalledTimes(1);
});

it('should not call onChange when text is clicked while disabled', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <Checkbox onChange={onChange} isChecked={false} isDisabled={true}>
      Accept Terms
    </Checkbox>
  );
  getByLabelText('Accept Terms').click();
  expect(onChange).not.toHaveBeenCalled();
});

it('should call onChange when outside label is clicked', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <div>
      <label htmlFor="checkbox">Checkbox</label>
      <Checkbox onChange={onChange} isChecked={false} id="checkbox">
        Accept Terms
      </Checkbox>
    </div>
  );
  getByLabelText('Checkbox').click();

  expect(onChange).toHaveBeenCalledTimes(1);
  // it should get called with an event
  expect(onChange).toHaveBeenCalledWith(expect.any(Object));
});

it('should forward data attributes', () => {
  const onChange = jest.fn();
  const { container } = render(
    <Checkbox onChange={onChange} isChecked={false} data-foo="bar">
      Accept Terms
    </Checkbox>
  );
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should check the input when isChecked is "true"', () => {
  const { getByLabelText } = render(
    <Checkbox onChange={() => {}} isChecked={true}>
      Accept Terms
    </Checkbox>
  );
  expect(getByLabelText('Accept Terms')).toHaveAttribute('checked');
});

it('should not check the input when isChecked is "false"', () => {
  const { getByLabelText } = render(
    <Checkbox onChange={() => {}} isChecked={false}>
      Accept Terms
    </Checkbox>
  );
  expect(getByLabelText('Accept Terms')).not.toHaveAttribute('checked');
});

it('should allow changing the checked state', () => {
  const onChange = jest.fn();
  const { getByLabelText, rerender } = render(
    <Checkbox onChange={onChange} isChecked={false}>
      Accept Terms
    </Checkbox>
  );
  expect(getByLabelText('Accept Terms')).not.toHaveAttribute('checked');

  getByLabelText('Accept Terms').click();
  expect(onChange).toHaveBeenCalledTimes(1);

  // simulate onChange function updating the state in the parent and passing
  // a new state down
  rerender(
    <Checkbox onChange={onChange} isChecked={true}>
      Accept Terms
    </Checkbox>
  );

  expect(getByLabelText('Accept Terms')).toHaveAttribute('checked');

  getByLabelText('Accept Terms').click();
  expect(onChange).toHaveBeenCalledTimes(2);
});

describe('when indeterminate', () => {
  it('should not check the input when isChecked is "false"', () => {
    const { getByLabelText } = render(
      <Checkbox onChange={() => {}} isChecked={false} isIndeterminate={true}>
        Accept Terms
      </Checkbox>
    );
    expect(getByLabelText('Accept Terms')).not.toHaveAttribute('checked');
  });

  // The input is always unchecked when the state is indeterminate!
  it('should not check the input when isChecked is "true"', () => {
    const { getByLabelText } = render(
      <Checkbox onChange={() => {}} isChecked={true} isIndeterminate={true}>
        Accept Terms
      </Checkbox>
    );
    expect(getByLabelText('Accept Terms')).not.toHaveAttribute('checked');
  });
});
