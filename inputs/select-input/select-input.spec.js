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
    describe('when value is changed', () => {
      beforeEach(() => {
        wrapper.find(Select).prop('onChange')(props.options[1]);
      });
      it('should call onChange with an event', () => {
        expect(props.onChange).toHaveBeenCalledWith({
          persist: expect.any(Function),
          target: {
            name: 'foo',
            value: 'shipped',
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
      props = createTestProps({ isMulti: true, value: [] });
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
            value: ['ready', 'shipped'],
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
  describe('when used with option groups', () => {
    let wrapper;
    let props;
    const colourOptions = [
      { value: 'purple', label: 'Purple', color: '#5243AA' },
      { value: 'orange', label: 'Orange', color: '#FF8B00' },
      { value: 'yellow', label: 'Yellow', color: '#FFC400' },
      { value: 'green', label: 'Green', color: '#36B37E' },
      { value: 'forest', label: 'Forest', color: '#00875A' },
      { value: 'slate', label: 'Slate', color: '#253858' },
      { value: 'silver', label: 'Silver', color: '#666666' },
    ];

    const flavourOptions = [
      { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
      { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    ];

    const groupedOptions = [
      { label: 'Colours', options: colourOptions },
      { label: 'Flavours', options: flavourOptions },
    ];

    const yellowOption = colourOptions[2];

    beforeEach(() => {
      props = createTestProps({
        options: groupedOptions,
        value: yellowOption.value,
      });
      wrapper = shallow(<SelectInput {...props} />);
    });

    it('should forward the selected option as the value', () => {
      expect(wrapper.find(Select)).toHaveProp('value', yellowOption);
    });
  });
});
