import React from 'react';
import { render } from '../../../test-utils';
import Toggle from './toggle';

it('should render children', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <div>
      <label htmlFor="toggle">Toggle</label>
      <Toggle id="toggle" isChecked={false} onChange={onChange} />
    </div>
  );

  expect(getByLabelText('Toggle')).toBeInTheDocument();
});

it('should call onChange when clicked', () => {
  const onChange = jest.fn();

  const { getByLabelText } = render(
    <div>
      <label htmlFor="toggle">Toggle</label>
      <Toggle id="toggle" isChecked={false} onChange={onChange} />
    </div>
  );

  getByLabelText('Toggle').click();

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        id: 'toggle',
        checked: true,
      }),
    })
  );
});

it('should not call onChange when clicked while disabled', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <div>
      <label htmlFor="toggle">Toggle</label>
      <Toggle
        id="toggle"
        isChecked={false}
        onChange={onChange}
        isDisabled={true}
      />
    </div>
  );

  getByLabelText('Toggle').click();

  expect(onChange).not.toHaveBeenCalled();
});

describe('checked attribute', () => {
  it('should have checked state when checked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <div>
        <label htmlFor="toggle">Toggle</label>
        <Toggle id="toggle" isChecked={true} onChange={onChange} />
      </div>
    );

    expect(getByLabelText('Toggle')).toHaveAttribute('checked');
  });

  it('should not have checked state when not checked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <div>
        <label htmlFor="toggle">Toggle</label>
        <Toggle id="toggle" isChecked={false} onChange={onChange} />
      </div>
    );

    expect(getByLabelText('Toggle')).not.toHaveAttribute('checked');
  });
});
