import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import NumberField from './number-field';
import FieldLabel from '../../field-label';
import TextInput from '../../inputs/text-input';
import ErrorMessage from '../../messages/error-message';
import { AddBoldIcon } from '../../icons';
import messages from './messages';

const createTestProps = customProps => ({
  title: 'Username',
  value: '',
  onChange: () => jest.fn(),
  ...customProps,
});

describe('NumberField.isEmpty', () => {
  describe('when called with an empty value', () => {
    it('should return true', () => {
      expect(NumberField.isEmpty('')).toBe(true);
      expect(NumberField.isEmpty(' ')).toBe(true);
    });
  });
  describe('when called with a filled value', () => {
    it('should return false', () => {
      expect(NumberField.isEmpty('a')).toBe(false);
      expect(NumberField.isEmpty(' a ')).toBe(false);
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
      const wrapper = shallow(<NumberField {...props} />);
      textInput = wrapper.find(TextInput);
    });
    it('should forward the attributes to the TextInput', () => {
      expect(textInput).toHaveProp('data-foo', 'bar');
      expect(textInput).toHaveProp('data-test', 'baz');
    });
  });
  describe('when no id is provided', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ id: undefined });
      wrapper = shallow(<NumberField {...props} />);
    });
    it('should add a default id attribute', () => {
      expect(wrapper.find(TextInput)).toHaveProp('id');
    });
    it('should add a default htmlFor attribute', () => {
      expect(wrapper.find(FieldLabel)).toHaveProp('htmlFor');
    });
    it('should use the same value for the id and htmlFor attribute', () => {
      expect(wrapper.find(TextInput).prop('id')).toEqual(
        wrapper.find(FieldLabel).prop('htmlFor')
      );
    });
  });
  describe('when touched', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        // NumberField
        id: 'foo',
        // FieldLabel
        title: 'Username',
        hint: 'Some hint',
        hintIcon: <AddBoldIcon />,
        description: 'A description',
        onInfoButtonClick: jest.fn(),
        badge: <div>Some badge</div>,

        // NumberField
        name: 'field1',
        value: 'foo',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        onFocus: jest.fn(),
        isAutofocussed: true,
        isDisabled: false,
        isReadOnly: false,
        placeholder: 'Some placeholder',
        errors: { missing: true },
        isTouched: true,
      });
      wrapper = shallow(<NumberField {...props} />);
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

      const textInput = wrapper.find(TextInput);
      expect(textInput).toHaveProp('name', props.name);
      expect(textInput).toHaveProp('value', props.value);
      expect(textInput).toHaveProp('onChange', props.onChange);
      expect(textInput).toHaveProp('onBlur', props.onBlur);
      expect(textInput).toHaveProp('onFocus', props.onFocus);
      expect(textInput).toHaveProp('isAutofocussed', props.isAutofocussed);
      expect(textInput).toHaveProp('isDisabled', props.isDisabled);
      expect(textInput).toHaveProp('isReadOnly', props.isReadOnly);
      expect(textInput).toHaveProp('placeholder', props.placeholder);
      expect(textInput).toHaveProp('hasError', true);

      expect(wrapper).toRender(ErrorMessage);
    });
  });

  describe('when disabled', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<NumberField {...props} />);
    });
    it('should disable the TextInput', () => {
      expect(wrapper.find(TextInput)).toHaveProp('isDisabled', true);
    });
  });

  describe('when read-only', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isReadOnly: true });
      wrapper = shallow(<NumberField {...props} />);
    });
    it('should mark the TextInput as read-only', () => {
      expect(wrapper.find(TextInput)).toHaveProp('isReadOnly', true);
    });
  });

  describe('when there are known errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isTouched: true, errors: { missing: true } });
      wrapper = shallow(<NumberField {...props} />);
    });
    it('should mark the TextInput as erroneous', () => {
      expect(wrapper.find(TextInput)).toHaveProp('hasError', true);
    });
    it('should render the known error', () => {
      expect(wrapper).toRender(ErrorMessage);
      expect(wrapper.find(ErrorMessage)).toRender(FormattedMessage);
      expect(wrapper.find(ErrorMessage).find(FormattedMessage)).toHaveProp(
        'id',
        messages.missingRequiredField.id
      );
    });
  });

  describe('when there are unknown errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        isTouched: true,
        renderError: jest.fn(key => key),
        errors: { customError: 5 },
      });
      wrapper = shallow(<NumberField {...props} />);
    });
    it('should mark the TextInput as erroneous', () => {
      expect(wrapper.find(TextInput)).toHaveProp('hasError', true);
    });
    it('should invoke renderError to obtain a custom error', () => {
      expect(props.renderError).toHaveBeenCalledWith('customError', 5);
    });
    it('should render the unknown error', () => {
      expect(wrapper).toRender(ErrorMessage);
      expect(wrapper.find(ErrorMessage)).toHaveProp('children', 'customError');
    });
  });
});
