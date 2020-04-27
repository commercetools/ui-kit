import React from 'react';
import { render } from '../../../../test/test-utils';
import Group from './radio-group';
import Option from './radio-option';

jest.mock('tiny-invariant');

it('should render all options', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <Group name="radio-group" onChange={onChange} value="first-value">
      <Option value="first-value">First option</Option>
      <Option value="second-value">Second option</Option>
    </Group>
  );
  expect(getByLabelText('First option')).toBeInTheDocument();
  expect(getByLabelText('Second option')).toBeInTheDocument();
});

it('should render option with a controlled wrapper', () => {
  /* eslint-disable react/prop-types */
  const CustomWrapper = ({ children, visible }) => (
    <div>
      {visible && <div>Custom Element Content</div>}
      <div>{children}</div>
    </div>
  );
  /* eslint-enable */
  let visible = true;
  const RadioInput = (
    <Group name="radio-group" onChange={jest.fn()} value="option-with-wrapper">
      <Option
        value="option-with-wrapper"
        components={{
          wrapper: (children) => (
            <CustomWrapper visible={visible}>{children}</CustomWrapper>
          ),
        }}
      >
        Option with wrapper
      </Option>
    </Group>
  );
  const { queryByLabelText, queryByText, rerender } = render(RadioInput);
  expect(queryByText('Custom Element Content')).toBeInTheDocument();
  expect(queryByLabelText('Option with wrapper')).toBeInTheDocument();
  visible = false;
  rerender(RadioInput);
  expect(queryByText('Custom Element Content')).not.toBeInTheDocument();
  expect(queryByLabelText('Option with wrapper')).toBeInTheDocument();
});

it('should call onChange when options are clicked', () => {
  const onChange = jest.fn((event) => {
    event.persist();
  });
  const { getByLabelText, rerender } = render(
    <Group name="radio-group" onChange={onChange} value="">
      <Option value="first-value">First option</Option>
      <Option value="second-value">Second option</Option>
    </Group>
  );

  getByLabelText('First option').click();
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange.mock.calls[0][0].target.name).toEqual('radio-group');
  expect(onChange.mock.calls[0][0].target.value).toEqual('first-value');

  // simulate parent rerendering the component when value changes
  rerender(
    <Group name="radio-group" onChange={onChange} value="first-value">
      <Option value="first-value">First option</Option>
      <Option value="second-value">Second option</Option>
    </Group>
  );

  getByLabelText('Second option').click();
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange.mock.calls[1][0].target.name).toEqual('radio-group');
  expect(onChange.mock.calls[1][0].target.value).toEqual('second-value');
});

it('should not call onChange when selected option is clicked', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <Group name="radio-group" onChange={onChange} value="first-value">
      <Option value="first-value">First option</Option>
      <Option value="second-value">Second option</Option>
    </Group>
  );

  getByLabelText('First option').click();
  expect(onChange).not.toHaveBeenCalled();
});

it('should not call onChange when disabled option is clicked', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <Group name="radio-group" onChange={onChange} value="first-value">
      <Option value="first-value">First option</Option>
      <Option value="second-value" isDisabled={true}>
        Second option
      </Option>
    </Group>
  );

  getByLabelText('Second option').click();
  expect(onChange).not.toHaveBeenCalled();
});
