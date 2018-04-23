import React from 'react';
import { shallow } from 'enzyme';
import MoneyNumericInput from './money-numeric-input';

const createTestProps = customProps => ({
  language: 'en',
  ...customProps,
});

describe('rendering', () => {
  let wrapper;
  let input;
  let props;
  beforeEach(() => {
    props = createTestProps({
      name: 'money-field1',
      value: 1,
    });
    wrapper = shallow(<MoneyNumericInput {...props} />);
    input = wrapper.children().at(0);
  });

  it('should have class for input styles', () => {
    expect(input).toHaveClassName('input');
  });

  it('input have a HTML name', () => {
    expect(input).toHaveProp('name', 'money-field1');
  });

  describe('with states', () => {
    describe('disabled', () => {
      beforeEach(() => {
        props = createTestProps({
          isDisabled: true,
        });
        wrapper = shallow(<MoneyNumericInput {...props} />);
        input = wrapper.children().at(0);
      });

      it('should have disabled styles', () => {
        expect(input).toHaveClassName('disabled');
      });
    });

    describe('error', () => {
      beforeEach(() => {
        props = createTestProps({
          hasError: true,
        });
        wrapper = shallow(<MoneyNumericInput {...props} />);
        input = wrapper.children().at(0);
      });

      it('should have error styles', () => {
        expect(input).toHaveClassName('error');
      });
    });

    describe('warning', () => {
      beforeEach(() => {
        props = createTestProps({
          hasWarning: true,
        });
        wrapper = shallow(<MoneyNumericInput {...props} />);
        input = wrapper.children().at(0);
      });

      it('should have error styles', () => {
        expect(input).toHaveClassName('warning');
      });
    });
  });
});

describe('callbacks', () => {
  let wrapper;
  let input;
  let props;
  describe('when changing values', () => {
    beforeEach(() => {
      props = createTestProps({
        onChange: jest.fn(),
      });
      wrapper = shallow(<MoneyNumericInput {...props} />);
      input = wrapper.children().at(0);
      input.prop('onChange')({
        target: {
          rawValue: '10',
        },
      });
    });

    it('should call onChange', () => {
      expect(props.onChange).toHaveBeenCalled();
    });

    it('should call onChange with the new value', () => {
      expect(props.onChange).toHaveBeenCalledWith(1000);
    });
  });

  describe('when input loses focus', () => {
    let owner;
    beforeEach(() => {
      owner = {
        setRawValue: jest.fn(),
      };
      props = createTestProps({
        value: 10,
        onBlur: jest.fn(),
      });
      wrapper = shallow(<MoneyNumericInput {...props} />);
      wrapper.instance().owner = owner;
      input = wrapper.children().at(0);
      input.prop('onBlur')();
    });

    it('should call onBlur', () => {
      expect(props.onBlur).toHaveBeenCalled();
    });

    it('should call onBlur with the current value', () => {
      expect(props.onBlur).toHaveBeenCalledWith(10);
    });
  });
});
