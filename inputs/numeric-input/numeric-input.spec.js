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
    let input;
    beforeEach(() => {
      const props = createTestProps({
        name: 'numeric-field1',
        value: '1',
      });
      const wrapper = shallow(<NumericInput {...props} />);
      input = wrapper.children().at(0);
    });

    it('should have class for default styles', () => {
      expect(input).toHaveClassName('pristine');
    });

    it('should have ARIA role', () => {
      expect(input).toHaveProp('role', 'textbox');
    });

    it('input should have type number', () => {
      expect(input).toHaveProp('type', 'number');
    });

    it('input have a HTML name', () => {
      expect(input).toHaveProp('name', 'numeric-field1');
    });

    it('should have passed value', () => {
      expect(input).toHaveProp('value', '1');
    });

    describe('with states', () => {
      describe('warning', () => {
        beforeEach(() => {
          const props = createTestProps({
            hasWarning: true,
          });
          const wrapper = shallow(<NumericInput {...props} />);
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
          const wrapper = shallow(<NumericInput {...props} />);
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
          const wrapper = shallow(<NumericInput {...props} />);
          input = wrapper.children().at(0);
        });

        it('should have class for the disabled state', () => {
          expect(input).toHaveClassName('disabled');
        });
      });
      describe('loading', () => {
        let wrapper;
        beforeEach(() => {
          const props = createTestProps({
            isLoading: true,
          });
          wrapper = shallow(<NumericInput {...props} />);
          input = wrapper.children().at(0);
        });

        it('should have class for the loading state', () => {
          expect(input).toHaveClassName('loading');
        });

        it('should render loading spinner', () => {
          expect(wrapper).toRender('LoadingSpinner');
        });
      });
      describe('readonly', () => {
        let wrapper;
        beforeEach(() => {
          const props = createTestProps({
            isReadOnly: true,
          });
          wrapper = shallow(<NumericInput {...props} />)
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
        value: '1',
        onChange: jest.fn(),
      });
      wrapper = shallow(<NumericInput {...props} />);
      input = wrapper.children().at(0);
      input.simulate('change', { target: { value: '2' } });
    });

    it('should call onChange', () => {
      expect(props.onChange).toHaveBeenCalled();
    });

    it('should update with new value', () => {
      expect(props.onChange).toHaveBeenCalledWith({
        target: {
          value: '2',
        },
      });
    });
  });
  describe('when clicking outside field', () => {
    let wrapper;
    let props;
    let input;
    beforeEach(() => {
      props = createTestProps({
        value: '1',
        onBlur: jest.fn(),
      });
      wrapper = shallow(<NumericInput {...props} />);
      input = wrapper.children().at(0);
      input.simulate('focus');
      input.simulate('blur');
    });

    it('should call onBlur', () => {
      expect(props.onBlur).toHaveBeenCalled();
    });

    it('value should remain the same', () => {
      expect(input).toHaveProp('value', '1');
    });
  });
  describe('should call onFocus if isAutofocussed is passed', () => {
    let wrapper;
    let props;
    let input;
    beforeEach(() => {
      props = createTestProps({
        isAutofocussed: true,
        onFocus: jest.fn(),
      });
      wrapper = shallow(<NumericInput {...props} />);
      input = wrapper.children().at(0);
      input.simulate('focus');
      input.simulate('blur');
    });

    it('should autofocus prop be true', () => {
      expect(input.prop('autoFocus')).toBe(true);
    });
    it('should call onFocus', () => {
      expect(props.onFocus).toHaveBeenCalled();
    });
  });
});
