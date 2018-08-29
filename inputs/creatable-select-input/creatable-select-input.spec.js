import React from 'react';
import { shallow } from 'enzyme';
import CreatableSelect from 'react-select/lib/Creatable';
import { CreatableSelectInput } from './creatable-select-input';

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
      wrapper = shallow(<CreatableSelectInput {...props} />);
    });
    describe('when value is changed', () => {
      let shippedOption;
      const info = {};
      beforeEach(() => {
        shippedOption = props.options[1];
        wrapper.find(CreatableSelect).prop('onChange')(shippedOption, info);
      });
      it('should call onChange with an event', () => {
        expect(props.onChange).toHaveBeenCalledWith(
          {
            persist: expect.any(Function),
            target: { name: 'foo', value: shippedOption },
          },
          info
        );
      });
    });
    describe('when field is blurred', () => {
      beforeEach(() => {
        wrapper.find(CreatableSelect).prop('onBlur')();
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
    let readyOption;
    let shippedOption;
    const info = {};
    beforeEach(() => {
      props = createTestProps({ isMulti: true, value: [] });
      readyOption = props.options[0];
      shippedOption = props.options[1];
      wrapper = shallow(<CreatableSelectInput {...props} />);
    });
    describe('when value is changed', () => {
      beforeEach(() => {
        wrapper.find(CreatableSelect).prop('onChange')(
          [readyOption, shippedOption],
          info
        );
      });
      it('should call onChange with an event', () => {
        expect(props.onChange).toHaveBeenCalledWith(
          {
            persist: expect.any(Function),
            target: { name: 'foo', value: [readyOption, shippedOption] },
          },
          info
        );
      });
    });
    describe('when field is blurred', () => {
      beforeEach(() => {
        wrapper.find(CreatableSelect).prop('onBlur')();
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
      props = createTestProps({ options: groupedOptions, value: yellowOption });
      wrapper = shallow(<CreatableSelectInput {...props} />);
    });

    it('should forward the selected option as the value', () => {
      expect(wrapper.find(CreatableSelect)).toHaveProp('value', yellowOption);
    });
  });
});
