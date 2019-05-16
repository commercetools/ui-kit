import React from 'react';
import { render } from '../../../test-utils';
import CheckboxInput from './checkbox-input';

jest.mock('tiny-invariant');

it('should render the label', () => {
  const { getByLabelText } = render(
    <CheckboxInput onChange={() => {}} checked={false}>
      Accept Terms
    </CheckboxInput>
  );
  expect(getByLabelText('Accept Terms')).toBeInTheDocument();
});

it('should call onChange when text is clicked', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <CheckboxInput onChange={onChange} checked={false}>
      Accept Terms
    </CheckboxInput>
  );
  getByLabelText('Accept Terms').click();
  expect(onChange).toHaveBeenCalledTimes(1);
});

it('should not call onChange when text is clicked while disabled', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <CheckboxInput onChange={onChange} checked={false} disabled={true}>
      Accept Terms
    </CheckboxInput>
  );
  getByLabelText('Accept Terms').click();
  expect(onChange).not.toHaveBeenCalled();
});

it('should call onChange when outside label is clicked', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <div>
      <label htmlFor="checkbox">Checkbox</label>
      <CheckboxInput onChange={onChange} checked={false} id="checkbox">
        Accept Terms
      </CheckboxInput>
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
    <CheckboxInput onChange={onChange} checked={false} data-foo="bar">
      Accept Terms
    </CheckboxInput>
  );
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should allow changing the checked state', () => {
  const onChange = jest.fn();
  const { getByLabelText, rerender } = render(
    <CheckboxInput onChange={onChange} checked={false}>
      Accept Terms
    </CheckboxInput>
  );
  expect(getByLabelText('Accept Terms')).not.toHaveAttribute('checked');

  getByLabelText('Accept Terms').click();
  expect(onChange).toHaveBeenCalledTimes(1);

  // simulate onChange function updating the state in the parent and passing
  // a new state down
  rerender(
    <CheckboxInput onChange={onChange} checked={true}>
      Accept Terms
    </CheckboxInput>
  );

  expect(getByLabelText('Accept Terms')).toHaveAttribute('checked');

  getByLabelText('Accept Terms').click();
  expect(onChange).toHaveBeenCalledTimes(2);
});

describe('when indeterminate', () => {
  it('should not check the input when checked is "false"', () => {
    const { getByLabelText } = render(
      <CheckboxInput onChange={() => {}} checked={false} isIndeterminate={true}>
        Accept Terms
      </CheckboxInput>
    );
    expect(getByLabelText('Accept Terms')).not.toHaveAttribute('checked');
  });

  // The input is always unchecked when the state is indeterminate!
  it('should not check the input when checked is "true"', () => {
    const { getByLabelText } = render(
      <CheckboxInput onChange={() => {}} checked={true} isIndeterminate={true}>
        Accept Terms
      </CheckboxInput>
    );
    expect(getByLabelText('Accept Terms')).not.toHaveAttribute('checked');
  });
});

describe('WAI-ARIA', () => {
  it('should have attribute "role" set to "checkbox"', () => {
    const { getByLabelText } = render(
      <CheckboxInput onChange={() => {}}>Accept Terms</CheckboxInput>
    );
    expect(getByLabelText('Accept Terms')).toHaveAttribute('role', 'checkbox');
  });

  it('should have attribute "aria-checked" set to "checked" when checked is "true"', () => {
    const { getByLabelText } = render(
      <CheckboxInput onChange={() => {}} checked={true}>
        Accept Terms
      </CheckboxInput>
    );
    expect(getByLabelText('Accept Terms')).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  it('should have attribute "aria-checked" set to "false" when checked is "false"', () => {
    const { getByLabelText } = render(
      <CheckboxInput onChange={() => {}} checked={false}>
        Accept Terms
      </CheckboxInput>
    );
    expect(getByLabelText('Accept Terms')).toHaveAttribute(
      'aria-checked',
      'false'
    );
  });

  it('should have attribute "aria-checked" set to "mixed" when isIndeterminate is "true"', () => {
    const { getByLabelText } = render(
      <CheckboxInput onChange={() => {}} isIndeterminate={true}>
        Accept Terms
      </CheckboxInput>
    );
    expect(getByLabelText('Accept Terms')).toHaveAttribute(
      'aria-checked',
      'mixed'
    );
  });
});
