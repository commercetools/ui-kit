import React from 'react';
import { shallow } from 'enzyme';
import AsyncCreatableSelectField from './async-creatable-select-field';
import FieldLabel from '../../field-label';
import AsyncCreatableSelectInput from '../../inputs/async-creatable-select-input';
import FieldErrors from '../../field-errors';
import Icons from '../../icons';

const createTestProps = customProps => ({
  title: 'Favourite Animal',
  defaultOptions: [
    { value: 'ready', label: 'Ready' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'returned', label: 'Returned' },
  ],
  loadOptions: jest.fn(),
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
      const wrapper = shallow(<AsyncCreatableSelectField {...props} />);
      selectInput = wrapper.find(AsyncCreatableSelectInput);
    });
    it('should forward the attributes to the AsyncCreatableSelectInput', () => {
      expect(selectInput).toHaveProp('data-foo', 'bar');
      expect(selectInput).toHaveProp('data-test', 'baz');
    });
  });
  describe('when no id is provided', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ id: undefined });
      wrapper = shallow(<AsyncCreatableSelectField {...props} />);
    });
    it('should add a default id attribute', () => {
      expect(wrapper.find(AsyncCreatableSelectInput)).toHaveProp(
        'id',
        expect.stringMatching(/.+/)
      );
    });
    it('should add a default htmlFor attribute', () => {
      expect(wrapper.find(FieldLabel)).toHaveProp('htmlFor');
    });
    it('should use the same value for the id and htmlFor attribute', () => {
      expect(wrapper.find(AsyncCreatableSelectInput).prop('id')).toEqual(
        wrapper.find(FieldLabel).prop('htmlFor')
      );
    });
  });
  describe('when touched', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        // AsyncCreatableSelectField
        id: 'foo',
        // FieldLabel
        title: 'Username',
        hint: 'Some hint',
        hintIcon: <Icons.AddBold />,
        description: 'A description',
        onInfoButtonClick: jest.fn(),
        badge: <div>Some badge</div>,

        // AsyncCreatableSelectField
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
      wrapper = shallow(<AsyncCreatableSelectField {...props} />);
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

      const selectInput = wrapper.find(AsyncCreatableSelectInput);
      expect(selectInput).toHaveProp('name', props.name);
      expect(selectInput).toHaveProp('value', props.value);
      expect(selectInput).toHaveProp('onChange', props.onChange);
      expect(selectInput).toHaveProp('onBlur', props.onBlur);
      expect(selectInput).toHaveProp('onFocus', props.onFocus);
      expect(selectInput).toHaveProp('isAutofocussed', props.isAutofocussed);
      expect(selectInput).toHaveProp('isDisabled', props.isDisabled);
      expect(selectInput).toHaveProp('placeholder', props.placeholder);
      expect(selectInput).toHaveProp('loadOptions', props.loadOptions);
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
      wrapper = shallow(<AsyncCreatableSelectField {...props} />);
    });
    it('should disable the AsyncCreatableSelectInput', () => {
      expect(wrapper.find(AsyncCreatableSelectInput)).toHaveProp(
        'isDisabled',
        true
      );
    });
  });

  describe('when there are known errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ touched: true, errors: { missing: true } });
      wrapper = shallow(<AsyncCreatableSelectField {...props} />);
    });
    it('should mark the AsyncCreatableSelectInput as erroneous', () => {
      expect(wrapper.find(AsyncCreatableSelectInput)).toHaveProp(
        'hasError',
        true
      );
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
      wrapper = shallow(<AsyncCreatableSelectField {...props} />);
    });
    it('should mark the NumberInput as erroneous', () => {
      expect(wrapper.find(AsyncCreatableSelectInput)).toHaveProp(
        'hasError',
        true
      );
    });
    it('should forward the error', () => {
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });
});
