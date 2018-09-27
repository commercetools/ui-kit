import React from 'react';
import { shallow } from 'enzyme';
import MultilineTextField from './multiline-text-field';
import FieldLabel from '../../field-label';
import MultilineTextInput from '../../inputs/multiline-text-input';
import FieldErrors from '../../field-errors';
import { AddBoldIcon } from '../../icons';

const createTestProps = customProps => ({
  title: 'Description',
  value: '',
  onChange: () => jest.fn(),
  ...customProps,
});

describe('MultilineTextField.isEmpty', () => {
  describe('when called with an empty value', () => {
    it('should return true', () => {
      expect(MultilineTextField.isEmpty('')).toBe(true);
      expect(MultilineTextField.isEmpty(' ')).toBe(true);
    });
  });
  describe('when called with a filled value', () => {
    it('should return false', () => {
      expect(MultilineTextField.isEmpty('a')).toBe(false);
      expect(MultilineTextField.isEmpty(' a ')).toBe(false);
    });
  });
});

describe('rendering', () => {
  describe('data attributes', () => {
    let textInput;
    beforeEach(() => {
      const props = createTestProps({
        'data-foo': 'bar',
        'data-test': 'baz',
      });
      const wrapper = shallow(<MultilineTextField {...props} />);
      textInput = wrapper.find(MultilineTextInput);
    });
    it('should forward the attributes to the MultilineTextInput', () => {
      expect(textInput).toHaveProp('data-foo', 'bar');
      expect(textInput).toHaveProp('data-test', 'baz');
    });
  });
  describe('when no id is provided', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ id: undefined });
      wrapper = shallow(<MultilineTextField {...props} />);
    });
    it('should add a default id attribute', () => {
      expect(wrapper.find(MultilineTextInput)).toHaveProp(
        'id',
        expect.stringMatching(/.+/)
      );
    });
    it('should add a default htmlFor attribute', () => {
      expect(wrapper.find(FieldLabel)).toHaveProp('htmlFor');
    });
    it('should use the same value for the id and htmlFor attribute', () => {
      expect(wrapper.find(MultilineTextInput).prop('id')).toEqual(
        wrapper.find(FieldLabel).prop('htmlFor')
      );
    });
  });
  describe('when touched', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        // MultilineTextField
        id: 'foo',
        // FieldLabel
        title: 'Description',
        hint: 'Some hint',
        hintIcon: <AddBoldIcon />,
        description: 'A description',
        onInfoButtonClick: jest.fn(),
        badge: <div>Some badge</div>,

        // MultilineTextInput
        name: 'field1',
        value: 'foo',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        onFocus: jest.fn(),
        isAutofocussed: true,
        isDisabled: false,
        isDefaultClosed: false,
        isReadOnly: false,
        placeholder: 'Some placeholder',
        errors: { missing: true },
        touched: true,
      });
      wrapper = shallow(<MultilineTextField {...props} />);
    });

    it('should forward the props for to the related components', () => {
      const fieldLabel = wrapper.find(FieldLabel);
      expect(fieldLabel).toHaveProp('title', props.title);
      expect(fieldLabel).toHaveProp('hint', props.hint);
      expect(fieldLabel).toHaveProp('hintIcon', props.hintIcon);
      expect(fieldLabel).toHaveProp('description', props.description);
      expect(fieldLabel).toHaveProp(
        'onInfoButtonClick',
        props.onInfoButtonClick
      );
      expect(fieldLabel).toHaveProp('badge', props.badge);
      expect(fieldLabel).toHaveProp('htmlFor', props.id);

      const textInput = wrapper.find(MultilineTextInput);
      expect(textInput).toHaveProp('name', props.name);
      expect(textInput).toHaveProp('value', props.value);
      expect(textInput).toHaveProp('onChange', props.onChange);
      expect(textInput).toHaveProp('onBlur', props.onBlur);
      expect(textInput).toHaveProp('onFocus', props.onFocus);
      expect(textInput).toHaveProp('isAutofocussed', props.isAutofocussed);
      expect(textInput).toHaveProp('isDefaultClosed', props.isDefaultClosed);
      expect(textInput).toHaveProp('isDisabled', props.isDisabled);
      expect(textInput).toHaveProp('isReadOnly', props.isReadOnly);
      expect(textInput).toHaveProp('placeholder', props.placeholder);
      expect(textInput).toHaveProp('hasError', true);

      expect(wrapper).toRender(FieldErrors);
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });

  describe('when disabled', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<MultilineTextField {...props} />);
    });
    it('should disable the MultilineTextInput', () => {
      expect(wrapper.find(MultilineTextInput)).toHaveProp('isDisabled', true);
    });
  });

  describe('when read-only', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isReadOnly: true });
      wrapper = shallow(<MultilineTextField {...props} />);
    });
    it('should mark the MultilineTextInput as read-only', () => {
      expect(wrapper.find(MultilineTextInput)).toHaveProp('isReadOnly', true);
    });
  });

  describe('when input should be closed by default', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isDefaultClosed: true });
      wrapper = shallow(<MultilineTextField {...props} />);
    });
    it('should mark the MultilineTextInput as default closed', () => {
      expect(wrapper.find(MultilineTextInput)).toHaveProp(
        'isDefaultClosed',
        true
      );
    });
  });

  describe('when there are known errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ touched: true, errors: { missing: true } });
      wrapper = shallow(<MultilineTextField {...props} />);
    });
    it('should mark the MultilineTextInput as erroneous', () => {
      expect(wrapper.find(MultilineTextInput)).toHaveProp('hasError', true);
    });
    it('should render the known error', () => {
      expect(wrapper).toRender(FieldErrors);
    });
  });

  describe('when there are unknown errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        touched: true,
        renderError: jest.fn(key => key),
        errors: { customError: 5 },
      });
      wrapper = shallow(<MultilineTextField {...props} />);
    });
    it('should mark the NumberInput as erroneous', () => {
      expect(wrapper.find(MultilineTextInput)).toHaveProp('hasError', true);
    });
    it('should forward the error', () => {
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });
});
