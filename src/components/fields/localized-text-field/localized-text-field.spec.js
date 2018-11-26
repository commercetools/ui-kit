import React from 'react';
import { shallow } from 'enzyme';
import LocalizedMultilineTextField from './localized-text-field';
import FieldLabel from '../../field-label';
import LocalizedTextInput from '../../inputs/localized-text-input';
import FieldErrors from '../../field-errors';
import Icons from '../../icons';

const createTestProps = customProps => ({
  title: 'Description',
  value: { en: '', de: '' },
  selectedLanguage: 'en',
  onChange: () => jest.fn(),
  ...customProps,
});

describe('rendering', () => {
  describe('data attributes', () => {
    let textInput;
    beforeEach(() => {
      const props = createTestProps({
        'data-foo': 'bar',
        'data-test': 'baz',
      });
      const wrapper = shallow(<LocalizedMultilineTextField {...props} />);
      textInput = wrapper.find(LocalizedTextInput);
    });
    it('should forward the attributes to the LocalizedTextInput', () => {
      expect(textInput).toHaveProp('data-foo', 'bar');
      expect(textInput).toHaveProp('data-test', 'baz');
    });
  });
  describe('when no id is provided', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ id: undefined });
      wrapper = shallow(<LocalizedMultilineTextField {...props} />);
    });
    it('should add a default id attribute', () => {
      expect(wrapper.find(LocalizedTextInput)).toHaveProp(
        'id',
        expect.stringMatching(/.+/)
      );
    });
    it('should add a default htmlFor attribute', () => {
      expect(wrapper.find(FieldLabel)).toHaveProp('htmlFor');
    });
    it('should use the same value for the id and htmlFor attribute', () => {
      expect(wrapper.find(LocalizedTextInput).prop('id')).toEqual(
        wrapper.find(FieldLabel).prop('htmlFor')
      );
    });
  });
  describe('when touched', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        // LocalizedMultilineTextField
        id: 'foo',
        // FieldLabel
        title: 'Description',
        hint: 'Some hint',
        hintIcon: <Icons.AddBold />,
        description: 'A description',
        onInfoButtonClick: jest.fn(),
        badge: <div>Some badge</div>,

        // LocalizedMultilineTextField
        name: 'field1',
        value: {
          en: 'Parrot that knows how to party',
          de: 'Papagei der ordentlich abfeiert',
        },
        onChange: jest.fn(),
        onBlur: jest.fn(),
        onFocus: jest.fn(),
        isAutofocussed: true,
        isDisabled: false,
        isReadOnly: false,
        placeholder: { en: 'Some placeholder' },
        errors: { missing: true },
        touched: true,
      });
      wrapper = shallow(<LocalizedMultilineTextField {...props} />);
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

      const textInput = wrapper.find(LocalizedTextInput);
      expect(textInput).toHaveProp('name', props.name);
      expect(textInput).toHaveProp('value', props.value);
      expect(textInput).toHaveProp('onChange', props.onChange);
      expect(textInput).toHaveProp('selectedLanguage', props.selectedLanguage);
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
      wrapper = shallow(<LocalizedMultilineTextField {...props} />);
    });
    it('should disable the LocalizedTextInput', () => {
      expect(wrapper.find(LocalizedTextInput)).toHaveProp('isDisabled', true);
    });
  });

  describe('when read-only', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isReadOnly: true });
      wrapper = shallow(<LocalizedMultilineTextField {...props} />);
    });
    it('should mark the LocalizedTextInput as read-only', () => {
      expect(wrapper.find(LocalizedTextInput)).toHaveProp('isReadOnly', true);
    });
  });

  describe('when there are known errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ touched: true, errors: { missing: true } });
      wrapper = shallow(<LocalizedMultilineTextField {...props} />);
    });
    it('should mark the LocalizedTextInput as erroneous', () => {
      expect(wrapper.find(LocalizedTextInput)).toHaveProp('hasError', true);
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
      wrapper = shallow(<LocalizedMultilineTextField {...props} />);
    });
    it('should mark the NumberInput as erroneous', () => {
      expect(wrapper.find(LocalizedTextInput)).toHaveProp('hasError', true);
    });
    it('should forward the error', () => {
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });
});
