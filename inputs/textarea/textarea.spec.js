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
    let wrapper;
    let textAreaWrapper;
    beforeEach(() => {
      const props = createTestProps({
        name: 'text-field1',
        'data-foo': 'bar',
        'data-test': 'baz',
      });
      wrapper = shallow(<TextArea {...props} />);
      textAreaWrapper = shallow(
        wrapper.find('Collapsible').prop('children')({
          isOpen: true,
          toggle: jest.fn(),
        })
      );
    });
    it('should forward the attributes', () => {
      expect(textAreaWrapper.find('TextareaAutosize')).toHaveProp(
        'data-foo',
        'bar'
      );
    });
  });
  describe('component by default', () => {
    let textarea;
    let textAreaWrapper;
    let wrapper;
    beforeEach(() => {
      const props = createTestProps({
        name: 'field1',
        value: 'foo',
      });
      wrapper = shallow(<TextArea {...props} />);
      textAreaWrapper = shallow(
        wrapper.find('Collapsible').prop('children')({
          isOpen: true,
          toggle: jest.fn(),
        })
      );
      textarea = textAreaWrapper.find('TextareaAutosize');
    });

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
      expect(textAreaWrapper).toRender('TextareaAutosize');
    });
  });
  describe('with validation', () => {
    let textarea;
    let flatbutton;
    describe('has warning', () => {
      beforeEach(() => {
        const props = createTestProps({
          hasWarning: true,
        });
        const wrapper = shallow(<TextArea {...props} />);
        const textAreaWrapper = shallow(
          wrapper.find('Collapsible').prop('children')({
            isOpen: true,
            toggle: jest.fn(),
          })
        );
        textarea = textAreaWrapper.find('TextareaAutosize');
      });

      it('should have warning styles', () => {
        expect(textarea).toHaveClassName('warning');
      });
    });
    describe('error', () => {
      beforeEach(() => {
        const props = createTestProps({
          hasError: true,
        });
        const wrapper = shallow(<TextArea {...props} />);
        const textAreaWrapper = shallow(
          wrapper.find('Collapsible').prop('children')({
            isOpen: true,
            toggle: jest.fn(),
          })
        );
        textarea = textAreaWrapper.find('TextareaAutosize');
      });

      it('should have error styles', () => {
        expect(textarea).toHaveClassName('error');
      });
    });
    describe('disabled', () => {
      beforeEach(() => {
        const props = createTestProps({
          isDisabled: true,
        });
        const wrapper = shallow(<TextArea {...props} />);
        const textAreaWrapper = shallow(
          wrapper.find('Collapsible').prop('children')({
            isOpen: false,
            toggle: jest.fn(),
          })
        );
        textarea = textAreaWrapper.find('TextareaAutosize');
        flatbutton = textAreaWrapper.find(FlatButton);
      });

      it('should TextArea have class for the disabled state', () => {
        expect(textarea).toHaveClassName('disabled');
      });
      it('should FlatButton have class for the disabled state', () => {
        expect(flatbutton).toHaveProp('isDisabled', true);
      });
    });
    describe('readonly', () => {
      beforeEach(() => {
        const props = createTestProps({
          isReadOnly: true,
        });
        const wrapper = shallow(<TextArea {...props} />);
        const textAreaWrapper = shallow(
          wrapper.find('Collapsible').prop('children')({
            isOpen: true,
            toggle: jest.fn(),
          })
        );
        textarea = textAreaWrapper.find('TextareaAutosize');
      });

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
    let wrapper;
    let props;
    let textarea;
    beforeEach(() => {
      props = createTestProps({
        value: 'foo',
        onChange: jest.fn(),
      });
      wrapper = shallow(<TextArea {...props} />);
      const textAreaWrapper = shallow(
        wrapper.find('Collapsible').prop('children')({
          isOpen: true,
          toggle: jest.fn(),
        })
      );
      textarea = textAreaWrapper.find('TextareaAutosize');
      textarea.simulate('change', { target: { value: 'bar' } });
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
    let props;
    let textarea;
    beforeEach(() => {
      props = createTestProps({
        value: 'foo',
        onFocus: jest.fn(),
      });
      const wrapper = shallow(<TextArea {...props} />);
      const textAreaWrapper = shallow(
        wrapper.find('Collapsible').prop('children')({
          isOpen: true,
          toggle: jest.fn(),
        })
      );
      textarea = textAreaWrapper.find('TextareaAutosize');
      textarea.simulate('focus');
    });

    it('should call onFocus', () => {
      expect(props.onFocus).toHaveBeenCalled();
    });

    it('should keep the same value', () => {
      expect(textarea).toHaveProp('value', 'foo');
    });
  });
  describe('when input loses focus', () => {
    let props;
    let textarea;
    beforeEach(() => {
      props = createTestProps({
        value: 'foo',
        onBlur: jest.fn(),
      });
      const wrapper = shallow(<TextArea {...props} />);
      const textAreaWrapper = shallow(
        wrapper.find('Collapsible').prop('children')({
          isOpen: true,
          toggle: jest.fn(),
        })
      );
      textarea = textAreaWrapper.find('TextareaAutosize');
      textarea.simulate('blur');
    });

    it('should call onBlur', () => {
      expect(props.onBlur).toHaveBeenCalled();
    });

    it('should keep the same value', () => {
      expect(textarea).toHaveProp('value', 'foo');
    });
  });
  describe('when `isAutofocussed` is passed', () => {
    let props;
    let textarea;
    beforeEach(() => {
      props = createTestProps({
        isAutofocussed: true,
        onFocus: jest.fn(),
      });
      const wrapper = shallow(<TextArea {...props} />);
      const textAreaWrapper = shallow(
        wrapper.find('Collapsible').prop('children')({
          isOpen: true,
          toggle: jest.fn(),
        })
      );
      textarea = textAreaWrapper.find('TextareaAutosize');
    });

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
