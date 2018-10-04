import React from 'react';
import { shallow } from 'enzyme';
import CreatableSelectField from './creatable-select-field';
import FieldLabel from '../../field-label';
import CreatableSelectInput from '../../inputs/creatable-select-input';
import FieldErrors from '../../field-errors';
import { AddBoldIcon } from '../../icons';

const createTestProps = customProps => ({
  title: 'Favourite Animal',
  options: [
    { value: 'ready', label: 'Ready' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'returned', label: 'Returned' },
  ],
  onChange: () => jest.fn(),
  ...customProps,
});

describe('rendering', () => {
  describe('data attributes', () => {
    let selectInput;
    beforeEach(() => {
      const props = createTestProps({
        'data-foo': 'bar',
        'data-test': 'baz',
      });
      const wrapper = shallow(<CreatableSelectField {...props} />);
      selectInput = wrapper.find(CreatableSelectInput);
    });
    it('should forward the attributes to the CreatableSelectInput', () => {
      expect(selectInput).toHaveProp('data-foo', 'bar');
      expect(selectInput).toHaveProp('data-test', 'baz');
    });
  });
  describe('when no id is provided', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ id: undefined });
      wrapper = shallow(<CreatableSelectField {...props} />);
    });
    it('should add a default id attribute', () => {
      expect(wrapper.find(CreatableSelectInput)).toHaveProp(
        'id',
        expect.stringMatching(/.+/)
      );
    });
    it('should add a default htmlFor attribute', () => {
      expect(wrapper.find(FieldLabel)).toHaveProp('htmlFor');
    });
    it('should use the same value for the id and htmlFor attribute', () => {
      expect(wrapper.find(CreatableSelectInput).prop('id')).toEqual(
        wrapper.find(FieldLabel).prop('htmlFor')
      );
    });
  });
  describe('when touched', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        // CreatableSelectField
        id: 'foo',
        // FieldLabel
        title: 'Username',
        hint: 'Some hint',
        hintIcon: <AddBoldIcon />,
        description: 'A description',
        onInfoButtonClick: jest.fn(),
        badge: <div>Some badge</div>,

        // CreatableSelectInput
        name: 'field1',
        value: 'foo',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        onFocus: jest.fn(),
        isAutofocussed: true,
        isDisabled: false,
        placeholder: 'Some placeholder',
        errors: { missing: true },
        touched: true,
      });
      wrapper = shallow(<CreatableSelectField {...props} />);
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

      const selectInput = wrapper.find(CreatableSelectInput);
      expect(selectInput).toHaveProp('name', props.name);
      expect(selectInput).toHaveProp('value', props.value);
      expect(selectInput).toHaveProp('onChange', props.onChange);
      expect(selectInput).toHaveProp('onBlur', props.onBlur);
      expect(selectInput).toHaveProp('onFocus', props.onFocus);
      expect(selectInput).toHaveProp('isAutofocussed', props.isAutofocussed);
      expect(selectInput).toHaveProp('isDisabled', props.isDisabled);
      expect(selectInput).toHaveProp('placeholder', props.placeholder);
      expect(selectInput).toHaveProp('hasError', true);

      expect(wrapper).toRender(FieldErrors);
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });

  describe('when disabled', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<CreatableSelectField {...props} />);
    });
    it('should disable the CreatableSelectInput', () => {
      expect(wrapper.find(CreatableSelectInput)).toHaveProp('isDisabled', true);
    });
  });

  describe('when there are known errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ touched: true, errors: { missing: true } });
      wrapper = shallow(<CreatableSelectField {...props} />);
    });
    it('should mark the CreatableSelectInput as erroneous', () => {
      expect(wrapper.find(CreatableSelectInput)).toHaveProp('hasError', true);
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
      wrapper = shallow(<CreatableSelectField {...props} />);
    });
    it('should mark the NumberInput as erroneous', () => {
      expect(wrapper.find(CreatableSelectInput)).toHaveProp('hasError', true);
    });
    it('should forward the error', () => {
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });
});
