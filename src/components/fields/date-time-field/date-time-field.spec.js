import React from 'react';
import { shallow } from 'enzyme';
import DateTimeField from './date-time-field';
import FieldLabel from '../../field-label';
import DateTimeInput from '../../inputs/date-time-input';
import FieldErrors from '../../field-errors';
import { AddBoldIcon } from '../../icons';

const createTestProps = customProps => ({
  title: 'Release date',
  timeZone: 'UTC',
  value: '',
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
      const wrapper = shallow(<DateTimeField {...props} />);
      textInput = wrapper.find(DateTimeInput);
    });
    it('should forward the attributes to the DateTimeInput', () => {
      expect(textInput).toHaveProp('data-foo', 'bar');
      expect(textInput).toHaveProp('data-test', 'baz');
    });
  });
  describe('when no id is provided', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ id: undefined });
      wrapper = shallow(<DateTimeField {...props} />);
    });
    it('should add a default id attribute', () => {
      expect(wrapper.find(DateTimeInput)).toHaveProp(
        'id',
        expect.stringMatching(/.+/)
      );
    });
    it('should add a default htmlFor attribute', () => {
      expect(wrapper.find(FieldLabel)).toHaveProp('htmlFor');
    });
    it('should use the same value for the id and htmlFor attribute', () => {
      expect(wrapper.find(DateTimeInput).prop('id')).toEqual(
        wrapper.find(FieldLabel).prop('htmlFor')
      );
    });
  });
  describe('when touched', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        // DateTimeField
        id: 'foo',
        // FieldLabel
        title: 'Release Date',
        hint: 'Date of publication',
        hintIcon: <AddBoldIcon />,
        description: 'A description',
        onInfoButtonClick: jest.fn(),
        badge: <div>Some badge</div>,

        // DateTimeField
        name: 'field1',
        value: '2018-11-30T13:25:59.500Z',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        onFocus: jest.fn(),
        isDisabled: false,
        placeholder: 'Some placeholder',
        errors: { missing: true },
        touched: true,
      });
      wrapper = shallow(<DateTimeField {...props} />);
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

      const textInput = wrapper.find(DateTimeInput);
      expect(textInput).toHaveProp('name', props.name);
      expect(textInput).toHaveProp('value', props.value);
      expect(textInput).toHaveProp('onChange', props.onChange);
      expect(textInput).toHaveProp('onBlur', props.onBlur);
      expect(textInput).toHaveProp('onFocus', props.onFocus);
      expect(textInput).toHaveProp('isDisabled', props.isDisabled);
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
      wrapper = shallow(<DateTimeField {...props} />);
    });
    it('should disable the DateTimeInput', () => {
      expect(wrapper.find(DateTimeInput)).toHaveProp('isDisabled', true);
    });
  });

  describe('when there are known errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ touched: true, errors: { missing: true } });
      wrapper = shallow(<DateTimeField {...props} />);
    });
    it('should mark the DateTimeInput as erroneous', () => {
      expect(wrapper.find(DateTimeInput)).toHaveProp('hasError', true);
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
      wrapper = shallow(<DateTimeField {...props} />);
    });
    it('should mark the NumberInput as erroneous', () => {
      expect(wrapper.find(DateTimeInput)).toHaveProp('hasError', true);
    });
    it('should forward the error', () => {
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });
});
