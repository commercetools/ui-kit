import React from 'react';
import { shallow } from 'enzyme';
import MoneyField from './money-field';
import FieldLabel from '../../field-label';
import MoneyInput from '../../inputs/money-input';
import FieldErrors from '../../field-errors';
import { AddBoldIcon } from '../../icons';

const createTestProps = customProps => ({
  title: 'Price',
  value: { amount: '', currencyCode: 'EUR' },
  onChange: () => jest.fn(),
  currencies: ['EUR', 'USD'],
  ...customProps,
});

describe('rendering', () => {
  describe('data attributes', () => {
    let moneyInput;
    beforeEach(() => {
      const props = createTestProps({
        'data-foo': 'bar',
        'data-test': 'baz',
      });
      const wrapper = shallow(<MoneyField {...props} />);
      moneyInput = wrapper.find(MoneyInput);
    });
    it('should forward the attributes to the MoneyInput', () => {
      expect(moneyInput).toHaveProp('data-foo', 'bar');
      expect(moneyInput).toHaveProp('data-test', 'baz');
    });
  });
  describe('when no id is provided', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ id: undefined });
      wrapper = shallow(<MoneyField {...props} />);
    });
    it('should add a default id attribute', () => {
      expect(wrapper.find(MoneyInput)).toHaveProp(
        'id',
        expect.stringMatching(/.+/)
      );
    });
    it('should add a default htmlFor attribute', () => {
      expect(wrapper.find(FieldLabel)).toHaveProp(
        'htmlFor',
        expect.stringMatching(/.+/)
      );
    });
    it('should use the same value for the id and htmlFor attribute', () => {
      expect(wrapper.find(MoneyInput).prop('id')).toEqual(
        wrapper.find(FieldLabel).prop('htmlFor')
      );
    });
  });
  describe('when touched', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        // MoneyField
        id: 'price',
        // FieldLabel
        title: 'Price',
        hint: 'Some hint',
        hintIcon: <AddBoldIcon />,
        description: 'A description',
        onInfoButtonClick: jest.fn(),

        // MoneyField
        name: 'field1',
        value: { amount: '20', currencyCode: 'EUR' },
        currencies: ['EUR', 'USD'],
        onChange: jest.fn(),
        onBlur: jest.fn(),
        isDisabled: false,
        placeholder: 'Some placeholder',
        errors: { missing: true },
        touched: { amount: true, currencyCode: true },
      });
      wrapper = shallow(<MoneyField {...props} />);
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
      expect(fieldLabel).toHaveProp('htmlFor', props.id);

      const moneyInput = wrapper.find(MoneyInput);
      expect(moneyInput).toHaveProp('name', props.name);
      expect(moneyInput).toHaveProp('value', props.value);
      expect(moneyInput).toHaveProp('onChange', props.onChange);
      expect(moneyInput).toHaveProp('onBlur', props.onBlur);
      expect(moneyInput).toHaveProp('isDisabled', props.isDisabled);
      expect(moneyInput).toHaveProp('placeholder', props.placeholder);
      expect(moneyInput).toHaveProp('hasError', true);

      expect(wrapper).toRender(FieldErrors);
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });

  describe('when disabled', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<MoneyField {...props} />);
    });
    it('should disable the MoneyInput', () => {
      expect(wrapper.find(MoneyInput)).toHaveProp('isDisabled', true);
    });
  });

  describe('when there are known errors', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        touched: { currencyCode: true, amount: true },
        errors: { missing: true },
      });
      wrapper = shallow(<MoneyField {...props} />);
    });
    it('should mark the MoneyInput as erroneous', () => {
      expect(wrapper.find(MoneyInput)).toHaveProp('hasError', true);
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
        touched: { currencyCode: true, amount: true },
        renderError: jest.fn(key => key),
        errors: { customError: 5 },
      });
      wrapper = shallow(<MoneyField {...props} />);
    });
    it('should mark the NumberInput as erroneous', () => {
      expect(wrapper.find(MoneyInput)).toHaveProp('hasError', true);
    });
    it('should forward the error', () => {
      expect(wrapper.find(FieldErrors)).toHaveProp('errors', props.errors);
    });
  });

  describe('when a high-precision price badge should be shown', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({
        hasHighPrecisionBadge: true,
        value: { currencyCode: 'EUR', amount: '15.002' },
        touched: { currencyCode: true, amount: true },
      });
      wrapper = shallow(<MoneyField {...props} />);
    });
    it('should show a high precision price badge', () => {
      expect(wrapper.find(FieldLabel)).toHaveProp('badge');
    });
  });
});
