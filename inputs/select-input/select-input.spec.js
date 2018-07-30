import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';
import { SelectInput } from './select-input';

const createTestProps = custom => ({
  name: 'foo',
  options: [
    { value: 'ready', label: 'Ready' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'returned', label: 'Returned' },
  ],
  onChange: jest.fn(),
  onBlur: jest.fn(),
  intl: { formatMessage: jest.fn(message => message.id) },
  ...custom,
});

describe('overwritten props', () => {
  describe('when in single-value mode', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<SelectInput {...props} />);
    });
    describe('when value is changed fires', () => {
      beforeEach(() => {
        wrapper.find(Select).prop('onChange')(props.options[1]);
      });
      it('should call onChange with an event', () => {
        expect(props.onChange).toHaveBeenCalledWith({
          persist: expect.any(Function),
          target: {
            name: 'foo',
            value: { label: 'Shipped', value: 'shipped' },
          },
        });
      });
    });
    describe('when field is blurred', () => {
      beforeEach(() => {
        wrapper.find(Select).prop('onBlur')();
      });
      it('should call onBlur with an event', () => {
        expect(props.onBlur).toHaveBeenCalledWith({
          persist: expect.any(Function),
          target: { name: 'foo' },
        });
      });
    });
  });
  describe('when in multi-value mode', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = createTestProps({ isMulti: true });
      wrapper = shallow(<SelectInput {...props} />);
    });
    describe('when value is changed', () => {
      beforeEach(() => {
        wrapper.find(Select).prop('onChange')([
          props.options[0],
          props.options[1],
        ]);
      });
      it('should call onChange with an event', () => {
        expect(props.onChange).toHaveBeenCalledWith({
          persist: expect.any(Function),
          target: {
            name: 'foo',
            value: [
              { label: 'Ready', value: 'ready' },
              { label: 'Shipped', value: 'shipped' },
            ],
          },
        });
      });
    });
    describe('when field is blurred', () => {
      beforeEach(() => {
        wrapper.find(Select).prop('onBlur')();
      });
      it('should call onBlur with an event', () => {
        expect(props.onBlur).toHaveBeenCalledWith({
          persist: expect.any(Function),
          target: { name: 'foo.0' },
        });
      });
    });
  });
});
