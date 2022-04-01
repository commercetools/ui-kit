/* eslint-disable react/prop-types */
import { useState } from 'react';
import TimeInput from './time-input';
import { screen, render, fireEvent } from '../../../../../test/test-utils';

const baseProps = {
  id: 'some-id',
  name: 'some-name',
  value: '',
  onChange: jest.fn(),
};

const TestComponent = (props) => {
  const [time, setTime] = useState(props.value);

  return (
    <div>
      <label htmlFor={props.id}>Input</label>
      <TimeInput
        {...props}
        value={time}
        onChange={(event) => setTime(event.target.value)}
      />
      <div>{time ? `Time: ${time}` : 'No time'}</div>
    </div>
  );
};

describe('TimeInput.to24h', () => {
  describe('when called with empty value', () => {
    it('should return an empty string', () => {
      expect(TimeInput.to24h('')).toEqual('');
    });
  });
  describe('when called with invalid time', () => {
    it('should return an empty string', () => {
      expect(TimeInput.to24h('65:10')).toEqual('');
      expect(TimeInput.to24h('10:3.5')).toEqual('');
      expect(TimeInput.to24h('1300:00.000')).toEqual('');
      expect(TimeInput.to24h('1300')).toEqual('');
      expect(TimeInput.to24h('300')).toEqual('');
      expect(TimeInput.to24h('13:00.000')).toEqual('');
      expect(TimeInput.to24h('15:09.300')).toEqual('');
      expect(TimeInput.to24h('10:3.5')).toEqual('');
    });
  });
  describe('when called with valid time', () => {
    describe('when called with regular precision time', () => {
      it('should return the time in 24h format', () => {
        expect(TimeInput.to24h('15:10')).toEqual('15:10');
        expect(TimeInput.to24h('15:2')).toEqual('15:02');
        expect(TimeInput.to24h('04')).toEqual('04:00');
        expect(TimeInput.to24h('3 AM')).toEqual('03:00');
        expect(TimeInput.to24h('3 PM')).toEqual('15:00');
        expect(TimeInput.to24h('3:15 AM')).toEqual('03:15');
        expect(TimeInput.to24h('3:5 AM')).toEqual('03:05');
        expect(TimeInput.to24h('0:00')).toEqual('00:00');
      });
    });
    describe('when called with high precision time', () => {
      it('should return the time in 24h format', () => {
        expect(TimeInput.to24h('10:02:03')).toEqual('10:02:03');
        expect(TimeInput.to24h('10:2:3')).toEqual('10:02:03');
        expect(TimeInput.to24h('10:2:3.456')).toEqual('10:02:03.456');
        expect(TimeInput.to24h('10:2:3.5')).toEqual('10:02:03.500');
      });
    });
  });
});

describe('TimeInput', () => {
  it('should forward data-attributes', () => {
    const { container } = render(<TimeInput {...baseProps} data-foo="bar" />);
    expect(container.querySelector('input')).toHaveAttribute('data-foo', 'bar');
  });

  it('should have an HTML name', () => {
    const { container } = render(<TimeInput {...baseProps} />);
    expect(container.querySelector('input')).toHaveAttribute(
      'name',
      'some-name'
    );
  });

  it('should pass autocompomplete', () => {
    const { container } = render(
      <TimeInput autoComplete="off" {...baseProps} />
    );
    expect(container.querySelector('input')).toHaveAttribute(
      'autocomplete',
      'off'
    );
  });

  it('should forward the passed value', () => {
    const { container } = render(<TimeInput {...baseProps} value="9:00 AM" />);
    expect(container.querySelector('input')).toHaveAttribute(
      'value',
      '9:00 AM'
    );
  });

  it('should call onChange when changing the value', async () => {
    render(<TestComponent {...baseProps} />);

    await screen.findByText('No time');

    const event = { target: { value: '9' } };
    fireEvent.change(screen.getByLabelText('Input'), event);

    await screen.findByText('Time: 9:00 AM');
  });

  it('should call onChange when clearing the value', async () => {
    render(<TestComponent {...baseProps} value="9:00 AM" />);

    await screen.findByText('Time: 9:00 AM');

    const clearButton = screen.getByRole('button', { ariaLabel: 'clear' });
    fireEvent.click(clearButton);

    await screen.findByText('No time');
  });

  it('should call onFocus when the input is focused', () => {
    const onFocus = jest.fn();
    const { container } = render(
      <TimeInput {...baseProps} onFocus={onFocus} />
    );
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
  });

  it('should call onBlur when input loses focus', () => {
    const { container } = render(<TimeInput {...baseProps} />);
    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
  });

  it('should format the value when input is blurred on english locale', () => {
    const onBlur = jest.fn();
    const { container } = render(
      <TimeInput {...baseProps} onBlur={onBlur} value="2:3 AM" />
    );

    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
    expect(onBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          id: 'some-id',
          name: 'some-name',
          value: '2:03 AM', // english format
        }),
      })
    );
  });

  it('should format the value when input is blurred on german locale', () => {
    const onBlur = jest.fn();
    const { container } = render(
      <TimeInput {...baseProps} onBlur={onBlur} value="12:3" />,
      { locale: 'de' }
    );

    container.querySelector('input').focus();
    expect(container.querySelector('input')).toHaveFocus();
    container.querySelector('input').blur();
    expect(container.querySelector('input')).not.toHaveFocus();
    expect(onBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          id: 'some-id',
          name: 'some-name',
          value: '12:03', // german format
        }),
      })
    );
  });

  it('should have focus automatically when isAutofocussed is passed', () => {
    const { container } = render(<TimeInput {...baseProps} isAutofocussed />);
    expect(container.querySelector('input')).toHaveFocus();
  });
});
