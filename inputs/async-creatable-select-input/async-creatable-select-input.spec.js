import React from 'react';
import { shallow } from 'enzyme';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import { AsyncCreatableSelectInput } from './async-creatable-select-input';

const createTestProps = custom => ({
  name: 'foo',
  defaultOptions: [
    { value: 'ready', label: 'Ready' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'returned', label: 'Returned' },
  ],
  loadOptions: jest.fn(),
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
      wrapper = shallow(<AsyncCreatableSelectInput {...props} />);
    });
    describe('when value is changed', () => {
      const info = {};
      beforeEach(() => {
        wrapper.find(AsyncCreatableSelect).prop('onChange')(
          props.defaultOptions[1],
          info
        );
      });
      it('should call onChange with an event', () => {
        expect(props.onChange).toHaveBeenCalledWith(
          {
            persist: expect.any(Function),
            target: {
              name: 'foo',
              value: { value: 'shipped', label: 'Shipped' },
            },
          },
          info
        );
      });
    });
    describe('when field is blurred', () => {
      beforeEach(() => {
        wrapper.find(AsyncCreatableSelect).prop('onBlur')();
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
      props = createTestProps({ isMulti: true, value: [] });
      wrapper = shallow(<AsyncCreatableSelectInput {...props} />);
    });
    describe('when value is changed', () => {
      const info = {};
      beforeEach(() => {
        wrapper.find(AsyncCreatableSelect).prop('onChange')(
          [props.defaultOptions[0], props.defaultOptions[1]],
          info
        );
      });
      it('should call onChange with an event', () => {
        expect(props.onChange).toHaveBeenCalledWith(
          {
            persist: expect.any(Function),
            target: {
              name: 'foo',
              value: [props.defaultOptions[0], props.defaultOptions[1]],
            },
          },
          info
        );
      });
    });
    describe('when field is blurred', () => {
      beforeEach(() => {
        wrapper.find(AsyncCreatableSelect).prop('onBlur')();
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
