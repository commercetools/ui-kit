import React from 'react';
import { shallow } from 'enzyme';
import MoneyInput from './money-input';

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
    wrapper = shallow(<MoneyInput {...props} />);
    input = wrapper.children().at(0);
  });

  it('should have class for input styles', () => {
    expect(input).toHaveClassName('input');
  });

  it('input have a HTML name', () => {
    expect(input).toHaveProp('name', 'money-field1');
  });

  it('input should have a numberFormatType money', () => {
    expect(input).toHaveProp('numberFormatType', 'money');
  });

  it('input should have passed language', () => {
    expect(input).toHaveProp('numberFormat', 'en');
  });

  describe('with states', () => {
    describe('disabled', () => {
      beforeEach(() => {
        props = createTestProps({
          isDisabled: true,
        });
        wrapper = shallow(<MoneyInput {...props} />);
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
        wrapper = shallow(<MoneyInput {...props} />);
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
        wrapper = shallow(<MoneyInput {...props} />);
        input = wrapper.children().at(0);
      });

      it('should have error styles', () => {
        expect(input).toHaveClassName('warning');
      });
    });
  });

  describe('horizontalConstraint', () => {
    beforeEach(() => {
      props = createTestProps({
        horizontalConstraint: 'xs',
      });
      wrapper = shallow(<MoneyInput {...props} />);
    });

    it('should have `constraintXs` className', () => {
      expect(wrapper).toHaveClassName('constraintXs');
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
      wrapper = shallow(<MoneyInput {...props} />);
      input = wrapper.children().at(0);
      input.prop('onChangeValue')(10);
    });

    it('should call onChange', () => {
      expect(props.onChange).toHaveBeenCalled();
    });

    it('should call onChange with the new value', () => {
      expect(props.onChange).toHaveBeenCalledWith(10);
    });
  });

  describe('when input loses focus', () => {
    beforeEach(() => {
      props = createTestProps({
        value: 10,
        onBlur: jest.fn(),
      });
      wrapper = shallow(<MoneyInput {...props} />);
      input = wrapper.children().at(0);
      input.prop('onBlurValue')();
    });

    it('should call onBlur', () => {
      expect(props.onBlur).toHaveBeenCalled();
    });

    it('should keep the same value', () => {
      expect(input).toHaveProp('value', 10);
    });
  });
});
