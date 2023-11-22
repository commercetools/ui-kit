import { screen, render } from '../../../../../test/test-utils';
import CheckboxInput from './checkbox-input';

it('should render the label', () => {
  render(
    <CheckboxInput onChange={() => {}} isChecked={false}>
      Accept Terms
    </CheckboxInput>
  );
  expect(screen.getByLabelText('Accept Terms')).toBeInTheDocument();
});

it('should call onChange when text is clicked', () => {
  const onChange = jest.fn();
  render(
    <CheckboxInput onChange={onChange} isChecked={false}>
      Accept Terms
    </CheckboxInput>
  );
  screen.getByLabelText('Accept Terms').click();
  expect(onChange).toHaveBeenCalledTimes(1);
});

it('should not call onChange when text is clicked while disabled', () => {
  const onChange = jest.fn();
  render(
    <CheckboxInput onChange={onChange} isChecked={false} isDisabled={true}>
      Accept Terms
    </CheckboxInput>
  );
  screen.getByLabelText('Accept Terms').click();
  expect(onChange).not.toHaveBeenCalled();
});

it('should not call onChange when text is clicked while readOnly', () => {
  const onChange = jest.fn();
  render(
    <CheckboxInput onChange={onChange} isChecked={false} isReadOnly={true}>
      Accept Terms
    </CheckboxInput>
  );
  screen.getByLabelText('Accept Terms').click();
  expect(onChange).not.toHaveBeenCalled();
});

it('should call onChange when outside label is clicked', () => {
  const onChange = jest.fn();
  render(
    <div>
      <label htmlFor="checkbox">Checkbox</label>
      <CheckboxInput onChange={onChange} isChecked={false} id="checkbox">
        Accept Terms
      </CheckboxInput>
    </div>
  );
  screen.getByLabelText('Checkbox').click();

  expect(onChange).toHaveBeenCalledTimes(1);
  // it should get called with an event
  expect(onChange).toHaveBeenCalledWith(expect.any(Object));
});

it('should forward data attributes', () => {
  const onChange = jest.fn();
  const { container } = render(
    <CheckboxInput onChange={onChange} isChecked={false} data-foo="bar">
      Accept Terms
    </CheckboxInput>
  );
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should check the input when isChecked is "true"', () => {
  render(
    <CheckboxInput onChange={() => {}} isChecked={true}>
      Accept Terms
    </CheckboxInput>
  );
  expect(screen.getByLabelText(/Accept Terms/)).toBeChecked();
});

it('should not check the input when isChecked is "false"', () => {
  render(
    <CheckboxInput onChange={() => {}} isChecked={false}>
      Accept Terms
    </CheckboxInput>
  );
  expect(screen.getByLabelText(/Accept Terms/)).not.toBeChecked();
});

it('should allow changing the checked state', () => {
  const onChange = jest.fn();
  const { rerender } = render(
    <CheckboxInput onChange={onChange} isChecked={false}>
      Accept Terms
    </CheckboxInput>
  );
  expect(screen.getByLabelText('Accept Terms')).not.toBeChecked();

  screen.getByLabelText('Accept Terms').click();
  expect(onChange).toHaveBeenCalledTimes(1);

  // simulate onChange function updating the state in the parent and passing
  // a new state down
  rerender(
    <CheckboxInput onChange={onChange} isChecked={true}>
      Accept Terms
    </CheckboxInput>
  );

  expect(screen.getByLabelText(/Accept Terms/)).toBeChecked();

  screen.getByLabelText(/Accept Terms/).click();
  expect(onChange).toHaveBeenCalledTimes(2);
});

describe('when indeterminate', () => {
  it('should not check the input when isChecked is "false"', () => {
    render(
      <CheckboxInput
        onChange={() => {}}
        isChecked={false}
        isIndeterminate={true}
      >
        Accept Terms
      </CheckboxInput>
    );
    expect(screen.getByLabelText(/Accept Terms/)).not.toBeChecked();
  });

  // The input is always unchecked when the state is indeterminate!
  it('should not check the input when isChecked is "true"', () => {
    render(
      <CheckboxInput
        onChange={() => {}}
        isChecked={true}
        isIndeterminate={true}
      >
        Accept Terms
      </CheckboxInput>
    );
    expect(screen.getByLabelText(/Accept Terms/)).not.toBeChecked();
  });
});
