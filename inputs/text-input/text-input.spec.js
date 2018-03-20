import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './text-input';

const createTestProps = customProps => ({
  value: '',
  onChange: () => jest.fn(),
  ...customProps,
});

describe('rendering', () => {
  describe('data attributes', () => {
    let input;
    beforeEach(() => {
      const props = createTestProps({
        name: 'text-field1',
        value: '1',
        'data-foo': 'bar',
        'data-test': 'baz',
      });
      const wrapper = shallow(<TextInput {...props} />);
      input = wrapper.children().at(0);
    });
    it('should forward the attributes', () => {
      expect(input).toHaveProp('data-foo', 'bar');
      expect(input).toHaveProp('data-test', 'baz');
    });
  });
  describe('pristine', () => {
    let input;
    beforeEach(() => {
      const props = createTestProps({
        name: 'field1',
        value: 'foo',
      });
      const wrapper = shallow(<TextInput {...props} />);
      input = wrapper.children().at(0);
    });

    it('should have class for pristine styles', () => {
      expect(input).toHaveClassName('pristine');
    });

    it('should have ARIA role', () => {
      expect(input).toHaveProp('role', 'textbox');
    });

    it('input should have type text', () => {
      expect(input).toHaveProp('type', 'text');
    });

    it('input have a HTML name', () => {
      expect(input).toHaveProp('name', 'field1');
    });

    it('should have passed value', () => {
      expect(input).toHaveProp('value', 'foo');
    });

    describe('when horizontal size is set', () => {
      beforeEach(() => {
        const props = createTestProps({ horizontalConstraint: 's' });
        const wrapper = shallow(<TextInput {...props} />);
        input = wrapper.children().at(0);
      });
      it('should match snapshot', () => {
        expect(input).toMatchSnapshot();
      });
    });

    describe('with states', () => {
      describe('warning', () => {
        beforeEach(() => {
          const props = createTestProps({
            hasWarning: true,
          });
          const wrapper = shallow(<TextInput {...props} />);
          input = wrapper.children().at(0);
        });

        it('should have warning styles', () => {
          expect(input).toHaveClassName('warning');
        });
      });
      describe('error', () => {
        beforeEach(() => {
          const props = createTestProps({
            hasError: true,
          });
          const wrapper = shallow(<TextInput {...props} />);
          input = wrapper.children().at(0);
        });

        it('should have error styles', () => {
          expect(input).toHaveClassName('error');
        });
      });
      describe('disabled', () => {
        beforeEach(() => {
          const props = createTestProps({
            isDisabled: true,
          });
          const wrapper = shallow(<TextInput {...props} />);
          input = wrapper.children().at(0);
        });

        it('should have class for the disabled state', () => {
          expect(input).toHaveClassName('disabled');
        });
      });
      describe('readonly', () => {
        let wrapper;
        beforeEach(() => {
          const props = createTestProps({
            isReadOnly: true,
          });
          wrapper = shallow(<TextInput {...props} />)
            .children()
            .at(0);
        });

        it('should have class for the readonly state', () => {
          expect(wrapper).toHaveClassName('readonly');
        });

        it('should have ARIA properties for the readonly state', () => {
          expect(wrapper).toHaveProp('aria-readonly', true);
        });
      });
    });
  });
});

describe('callbacks', () => {
  describe('when changing value', () => {
    let wrapper;
    let props;
    let input;
    beforeEach(() => {
      props = createTestProps({
        value: 'foo',
        onChange: jest.fn(),
      });
      wrapper = shallow(<TextInput {...props} />);
      input = wrapper.children().at(0);
      input.simulate('change', { target: { value: 'bar' } });
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
  describe('when input gains focus', () => {
    let wrapper;
    let props;
    let input;
    beforeEach(() => {
      props = createTestProps({
        value: 'foo',
        onFocus: jest.fn(),
      });
      wrapper = shallow(<TextInput {...props} />);
      input = wrapper.children().at(0);
      input.simulate('focus');
    });

    it('should call onFocus', () => {
      expect(props.onFocus).toHaveBeenCalled();
    });

    it('should keep the same value', () => {
      expect(input).toHaveProp('value', 'foo');
    });
  });
  describe('when input loses focus', () => {
    let wrapper;
    let props;
    let input;
    beforeEach(() => {
      props = createTestProps({
        value: 'foo',
        onBlur: jest.fn(),
      });
      wrapper = shallow(<TextInput {...props} />);
      input = wrapper.children().at(0);
      input.simulate('blur');
    });

    it('should call onBlur', () => {
      expect(props.onBlur).toHaveBeenCalled();
    });

    it('should keep the same value', () => {
      expect(input).toHaveProp('value', 'foo');
    });
  });
  describe('when `isAutofocussed` is passed', () => {
    let wrapper;
    let props;
    let input;
    beforeEach(() => {
      props = createTestProps({
        isAutofocussed: true,
        onFocus: jest.fn(),
      });
      wrapper = shallow(<TextInput {...props} />);
      input = wrapper.children().at(0);
    });

    it('should autofocus prop be true', () => {
      expect(input.prop('autoFocus')).toBe(true);
    });
  });
});
