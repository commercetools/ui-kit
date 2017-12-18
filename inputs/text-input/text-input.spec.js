import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './text-input';

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
        name: 'field1',
        value: 'foo',
      });
      wrapper = shallow(<TextInput {...props} />);
    });

    it('should have class for default styles', () => {
      expect(wrapper).toHaveClassName('plain');
    });

    it('should have ARIA role', () => {
      expect(wrapper).toHaveProp('role', 'textbox');
    });

    it('input should have type text', () => {
      expect(wrapper).toHaveProp('type', 'text');
    });

    it('input have a HTML name', () => {
      expect(wrapper).toHaveProp('name', 'field1');
    });

    it('should have passed value', () => {
      expect(wrapper).toHaveProp('value', 'foo');
    });

    describe('with tones', () => {
      describe('warning', () => {
        beforeEach(() => {
          const props = createTestProps({
            tone: 'warning',
          });
          wrapper = shallow(<TextInput {...props} />);
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
          wrapper = shallow(<TextInput {...props} />);
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
          wrapper = shallow(<TextInput {...props} />);
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
      wrapper = shallow(<TextInput {...props} />);
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
      wrapper = shallow(<TextInput {...props} />);
    });

    it('should have class for the inactive state', () => {
      expect(wrapper).toHaveClassName('inactive');
    });
  });

  describe('when readonly', () => {
    let wrapper;
    beforeEach(() => {
      const props = createTestProps({
        isReadOnly: true,
      });
      wrapper = shallow(<TextInput {...props} />);
    });

    it('should have class for the readonly state', () => {
      expect(wrapper).toHaveClassName('readonly');
    });

    it('should have ARIA properties for the readonly state', () => {
      expect(wrapper).toHaveProp('aria-readonly', true);
    });
  });
});

describe('callbacks', () => {
  describe('when changing value', () => {
    let wrapper;
    let props;
    beforeEach(() => {
      props = createTestProps({
        value: 'foo',
        onChange: jest.fn(),
      });
      wrapper = shallow(<TextInput {...props} />);
      wrapper.simulate('change', { target: { value: 'bar' } });
    });

    it('should call onChange', () => {
      expect(props.onChange).toHaveBeenCalled();
    });

    it('should update with new value', () => {
      expect(props.onChange).toHaveBeenCalledWith({
        target: {
          value: 'bar',
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
        value: 'foo',
        onBlur: onBlurFun,
      });
      wrapper = shallow(<TextInput {...props} />);
      wrapper.simulate('blur');
    });

    it('should call onBlur', () => {
      expect(onBlurFun).toHaveBeenCalled();
    });

    it('value should remain the same', () => {
      expect(wrapper).toHaveProp('value', 'foo');
    });
  });
});
