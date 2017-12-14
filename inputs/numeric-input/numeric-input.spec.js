import React from 'react';
import { shallow } from 'enzyme';
import NumericInput from './numeric-input';

const createTestProps = customProps => ({
  value: '',
  onChange: () => jest.fn(),
  ...customProps,
});

describe('rendering', () => {
  describe('default', () => {
    let wrapper;
    beforeEach(() => {
      const props = createTestProps({
        name: 'numeric-field1',
        value: '1',
      });
      wrapper = shallow(<NumericInput {...props} />);
    });

    it('should have class for default styles', () => {
      expect(wrapper).toHaveClassName('plain');
    });

    it('input should have type number', () => {
      expect(wrapper).toHaveProp('type', 'number');
    });

    it('input have a HTML name', () => {
      expect(wrapper).toHaveProp('name', 'numeric-field1');
    });

    it('should have passed value', () => {
      expect(wrapper).toHaveProp('value', '1');
    });

    describe('with tones', () => {
      describe('warning', () => {
        beforeEach(() => {
          const props = createTestProps({
            tone: 'warning',
          });
          wrapper = shallow(<NumericInput {...props} />);
        });

        it('should have warning tone styles', () => {
          expect(wrapper).toHaveClassName('warning');
        });
      });
      describe('error', () => {
        beforeEach(() => {
          const props = createTestProps({
            tone: 'error',
          });
          wrapper = shallow(<NumericInput {...props} />);
        });

        it('should have error tone styles', () => {
          expect(wrapper).toHaveClassName('error');
        });
      });
      describe('info', () => {
        beforeEach(() => {
          const props = createTestProps({
            tone: 'info',
          });
          wrapper = shallow(<NumericInput {...props} />);
        });

        it('should have info tone styles', () => {
          expect(wrapper).toHaveClassName('info');
        });
      });
    });
  });

  describe('when disabled', () => {
    let wrapper;
    beforeEach(() => {
      const props = createTestProps({
        isDisabled: true,
      });
      wrapper = shallow(<NumericInput {...props} />);
    });

    it('should have class for the disabled state', () => {
      expect(wrapper).toHaveClassName('disabled');
    });
  });

  describe('when inactive', () => {
    let wrapper;
    beforeEach(() => {
      const props = createTestProps({
        isInactive: true,
      });
      wrapper = shallow(<NumericInput {...props} />);
    });

    it('should have class for the inactive state', () => {
      expect(wrapper).toHaveClassName('inactive');
    });
  });
});

describe('callbacks', () => {
  describe('when changing value', () => {
    let wrapper;
    let onChangeFunc;
    beforeEach(() => {
      onChangeFunc = jest.fn();
      const props = createTestProps({
        value: '1',
        onChange: onChangeFunc,
      });
      wrapper = shallow(<NumericInput {...props} />);
      wrapper.simulate('change', { target: { value: '2' } });
    });

    it('should call onChange', () => {
      expect(onChangeFunc).toHaveBeenCalled();
    });

    it('should update with new value', () => {
      expect(onChangeFunc).toHaveBeenCalledWith({
        target: {
          value: '2',
        },
      });
    });
  });
  describe('when clicking outside field', () => {
    let wrapper;
    let onBlurFun;
    beforeEach(() => {
      onBlurFun = jest.fn();
      const props = createTestProps({
        value: '1',
        onBlur: onBlurFun,
      });
      wrapper = shallow(<NumericInput {...props} />);
      wrapper.simulate('blur');
    });

    it('should call onBlur', () => {
      expect(onBlurFun).toHaveBeenCalled();
    });

    it('value should remain the same', () => {
      expect(wrapper).toHaveProp('value', '1');
    });
  });
});
