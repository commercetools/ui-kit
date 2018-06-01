import React from 'react';
import { shallow } from 'enzyme';
import { intlMock } from '@commercetools-local/test-utils';
import FlatButton from '@commercetools-local/ui-kit/buttons/flat-button';
import { TextArea } from './textarea';

const createTestProps = customProps => ({
  value: '',
  intl: {
    ...intlMock,
    formatMessage: jest.fn(message => message.id),
  },
  onChange: jest.fn(),
  ...customProps,
});

describe('rendering', () => {
  describe('data attributes', () => {
    const props = createTestProps({
      name: 'text-field1',
      'data-foo': 'bar',
      'data-test': 'baz',
    });
    const wrapper = shallow(<TextArea {...props} />)
      .find('Collapsible')
      .renderProp('children', {
        isOpen: true,
        toggle: jest.fn(),
      });
    it('should forward the attributes', () => {
      expect(wrapper.find('TextareaAutosize')).toHaveProp('data-foo', 'bar');
    });
  });
  describe('component by default', () => {
    const props = createTestProps({
      name: 'field1',
      value: 'foo',
    });
    const wrapper = shallow(<TextArea {...props} />)
      .find('Collapsible')
      .renderProp('children', {
        isOpen: true,
        toggle: jest.fn(),
      });
    const textarea = wrapper.find('TextareaAutosize');

    it('should have class for default styles', () => {
      expect(textarea).toHaveClassName('pristine');
    });

    it('should have ARIA role', () => {
      expect(textarea).toHaveProp('role', 'textbox');
    });

    it('should have ARIA multiline set as true', () => {
      expect(textarea).toHaveProp('aria-multiline', 'true');
    });

    it('textarea have a HTML name', () => {
      expect(textarea).toHaveProp('name', 'field1');
    });

    it('should render textarea', () => {
      expect(wrapper).toRender('TextareaAutosize');
    });
  });
  describe('with validation', () => {
    describe('has warning', () => {
      const props = createTestProps({
        hasWarning: true,
      });
      const wrapper = shallow(<TextArea {...props} />)
        .find('Collapsible')
        .renderProp('children', {
          isOpen: true,
          toggle: jest.fn(),
        });
      const textarea = wrapper.find('TextareaAutosize');

      it('should have warning styles', () => {
        expect(textarea).toHaveClassName('warning');
      });
    });
    describe('error', () => {
      const props = createTestProps({
        hasError: true,
      });
      const wrapper = shallow(<TextArea {...props} />)
        .find('Collapsible')
        .renderProp('children', {
          isOpen: true,
          toggle: jest.fn(),
        });
      const textarea = wrapper.find('TextareaAutosize');

      it('should have error styles', () => {
        expect(textarea).toHaveClassName('error');
      });
    });
    describe('disabled', () => {
      const props = createTestProps({
        isDisabled: true,
      });
      const wrapper = shallow(<TextArea {...props} />)
        .find('Collapsible')
        .renderProp('children', {
          isOpen: false,
          toggle: jest.fn(),
        });
      const textarea = wrapper.find('TextareaAutosize');
      const flatbutton = wrapper.find(FlatButton);

      it('should TextArea have class for the disabled state', () => {
        expect(textarea).toHaveClassName('disabled');
      });
      it('should FlatButton have class for the disabled state', () => {
        expect(flatbutton).toHaveProp('isDisabled', true);
      });
    });
    describe('readonly', () => {
      const props = createTestProps({
        isReadOnly: true,
      });
      const wrapper = shallow(<TextArea {...props} />)
        .find('Collapsible')
        .renderProp('children', {
          isOpen: true,
          toggle: jest.fn(),
        });
      const textarea = wrapper.find('TextareaAutosize');

      it('should have class for the readonly state', () => {
        expect(textarea).toHaveClassName('readonly');
      });

      it('should have ARIA properties for the readonly state', () => {
        expect(textarea).toHaveProp('aria-readonly', true);
      });
    });
  });
});

describe('callbacks', () => {
  describe('when changing value', () => {
    const props = createTestProps({
      value: 'foo',
      onChange: jest.fn(),
    });
    const wrapper = shallow(<TextArea {...props} />)
      .find('Collapsible')
      .renderProp('children', {
        isOpen: true,
        toggle: jest.fn(),
      });
    const textarea = wrapper.find('TextareaAutosize');
    textarea.simulate('change', { target: { value: 'bar' } });

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
    const props = createTestProps({
      value: 'foo',
      onFocus: jest.fn(),
    });
    const wrapper = shallow(<TextArea {...props} />)
      .find('Collapsible')
      .renderProp('children', {
        isOpen: true,
        toggle: jest.fn(),
      });
    const textarea = wrapper.find('TextareaAutosize');
    textarea.simulate('focus');

    it('should call onFocus', () => {
      expect(props.onFocus).toHaveBeenCalled();
    });

    it('should keep the same value', () => {
      expect(textarea).toHaveProp('value', 'foo');
    });
  });
  describe('when input loses focus', () => {
    const props = createTestProps({
      value: 'foo',
      onBlur: jest.fn(),
    });
    const wrapper = shallow(<TextArea {...props} />)
      .find('Collapsible')
      .renderProp('children', {
        isOpen: true,
        toggle: jest.fn(),
      });
    const textarea = wrapper.find('TextareaAutosize');
    textarea.simulate('blur');

    it('should call onBlur', () => {
      expect(props.onBlur).toHaveBeenCalled();
    });

    it('should keep the same value', () => {
      expect(textarea).toHaveProp('value', 'foo');
    });
  });
  describe('when `isAutofocussed` is passed', () => {
    const props = createTestProps({
      isAutofocussed: true,
      onFocus: jest.fn(),
    });
    const wrapper = shallow(<TextArea {...props} />)
      .find('Collapsible')
      .renderProp('children', {
        isOpen: true,
        toggle: jest.fn(),
      });
    const textarea = wrapper.find('TextareaAutosize');

    it('should autofocus prop be true', () => {
      expect(textarea.prop('autoFocus')).toBe(true);
    });
  });
  describe('when TextArea has only 1 row', () => {
    let textAreaWrapper;
    let wrapper;
    beforeEach(() => {
      const props = createTestProps({
        name: 'field1',
        value: 'foo',
      });
      wrapper = shallow(<TextArea {...props} />);
      wrapper.setState({ numOfRows: 1 });
      textAreaWrapper = shallow(
        wrapper.find('Collapsible').prop('children')({
          isOpen: true,
          toggle: jest.fn(),
        })
      );
    });
    it('should not render FlatButton', () => {
      expect(textAreaWrapper).not.toRender(FlatButton);
    });
  });
  describe('when TextArea has more than 1 row', () => {
    let flatbutton;
    let textAreaWrapper;
    let wrapper;
    beforeEach(() => {
      const props = createTestProps({
        name: 'field1',
        value: 'foo',
      });
      wrapper = shallow(<TextArea {...props} />);
      wrapper.setState({ numOfRows: 2 });
      textAreaWrapper = shallow(
        <div>
          {wrapper.find('Collapsible').prop('children')({
            isOpen: true,
            toggle: jest.fn(),
          })}
        </div>
      );
      flatbutton = textAreaWrapper.find(FlatButton);
      textAreaWrapper.find(FlatButton).simulate('click');
    });
    it('should render FlatButton', () => {
      expect(textAreaWrapper).toRender(FlatButton);
    });
    it('should have correct message (collapse)', () => {
      expect(flatbutton).toHaveProp('label', 'UIKit.TextArea.collapse');
    });
  });
});
