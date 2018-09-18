import React from 'react';
import { shallow } from 'enzyme';
import NumberField from './number-field';
import FieldLabel from '../../field-label';
import NumberInput from '../../inputs/number-input';
import FieldErrors from '../../field-errors';
import { AddBoldIcon } from '../../icons';

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
      textInput = wrapper.find(NumberInput);
    });
    it('should forward the attributes to the NumberInput', () => {
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
      expect(wrapper.find(NumberInput)).toHaveProp('id');
    });
    it('should add a default htmlFor attribute', () => {
      expect(wrapper.find(FieldLabel)).toHaveProp('htmlFor');
    });
    it('should use the same value for the id and htmlFor attribute', () => {
      expect(wrapper.find(NumberInput).prop('id')).toEqual(
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

      const textInput = wrapper.find(NumberInput);
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

      expect(wrapper).toRender(FieldErrors);
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });

  describe('when disabled', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<NumberField {...props} />);
    });
    it('should disable the NumberInput', () => {
      expect(wrapper.find(NumberInput)).toHaveProp('isDisabled', true);
    });
  });

  describe('when read-only', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isReadOnly: true });
      wrapper = shallow(<NumberField {...props} />);
    });
    it('should mark the NumberInput as read-only', () => {
      expect(wrapper.find(NumberInput)).toHaveProp('isReadOnly', true);
    });
  });

  describe('when there are known errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isTouched: true, errors: { missing: true } });
      wrapper = shallow(<NumberField {...props} />);
    });
    it('should mark the NumberInput as erroneous', () => {
      expect(wrapper.find(NumberInput)).toHaveProp('hasError', true);
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
        isTouched: true,
        renderError: jest.fn(key => key),
        errors: { customError: 5 },
      });
      wrapper = shallow(<NumberField {...props} />);
    });
    it('should mark the NumberInput as erroneous', () => {
      expect(wrapper.find(NumberInput)).toHaveProp('hasError', true);
    });
    it('should forward the error', () => {
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });
});
