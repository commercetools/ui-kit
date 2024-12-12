import type { TToggleInputProps } from './toggle-input';

import { useState } from 'react';
import { screen, render } from '../../../../../test/test-utils';
import ToggleInput from './toggle-input';

const TestComponent = ({ size = 'big', ...props }: TToggleInputProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <label htmlFor={props.id}>Toggle</label>
      <ToggleInput
        id={props.id}
        isChecked={isChecked}
        onChange={(evt) => {
          setIsChecked(evt.target.checked);

          if (props.onChange) {
            props.onChange(evt);
          }
        }}
        size="big"
      />
    </div>
  );
};

it('should render children', () => {
  const onChange = jest.fn();
  render(
    <div>
      <label htmlFor="toggle">Toggle</label>
      <ToggleInput
        id="toggle"
        isChecked={false}
        onChange={onChange}
        size="big"
      />
    </div>
  );

  expect(screen.getByLabelText('Toggle')).toBeInTheDocument();
});

it('should call onChange when clicked', () => {
  const onChange = jest.fn((event) => {
    event.persist();
  });

  render(
    <TestComponent
      id="toggle"
      isChecked={false}
      onChange={onChange}
      size="big"
    />
  );

  screen.getByLabelText('Toggle').click();

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(screen.getByLabelText('Toggle')).toBeChecked();
});

it('should not call onChange when clicked while disabled', () => {
  const onChange = jest.fn();
  render(
    <div>
      <label htmlFor="toggle">Toggle</label>
      <ToggleInput
        id="toggle"
        isChecked={false}
        onChange={onChange}
        isDisabled={true}
        size="big"
      />
    </div>
  );

  screen.getByLabelText('Toggle').click();

  expect(onChange).not.toHaveBeenCalled();
});

describe('checked attribute', () => {
  it('should have checked state when checked', () => {
    const onChange = jest.fn();
    render(
      <div>
        <label htmlFor="toggle">Toggle</label>
        <ToggleInput
          id="toggle"
          isChecked={true}
          onChange={onChange}
          size="big"
        />
      </div>
    );

    expect(screen.getByLabelText('Toggle')).toBeChecked();
  });

  it('should not have checked state when not checked', () => {
    const onChange = jest.fn();
    render(
      <div>
        <label htmlFor="toggle">Toggle</label>
        <ToggleInput
          id="toggle"
          isChecked={false}
          onChange={onChange}
          size="big"
        />
      </div>
    );

    expect(screen.getByLabelText('Toggle')).not.toBeChecked();
  });
});
