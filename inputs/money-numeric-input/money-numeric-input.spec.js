import React from 'react';
import { shallow } from 'enzyme';
import AccessibleButton from '../../buttons/accessible-button';
import MoneyNumericInput, {
  CurrencyDropdownHead,
  parseNumberToMoney,
} from './money-numeric-input';

const createTestProps = customProps => ({
  language: 'en',
  currencyName: 'currency-field',
  amountName: 'amount-field',
  selectedCurrency: { value: 'EUR', label: '€' },
  currencies: [{ value: 'EUR', label: '€' }, { value: 'USD', label: '$' }],
  onCurrencyChange: jest.fn(),
  onAmountChange: jest.fn(),
  onBlur: jest.fn(),
  ...customProps,
});

describe('utils', () => {
  describe('parseNumberToMoney', () => {
    const fractionDigit = 2;
    describe('when number has value', () => {
      const number = 1000;
      let result;

      beforeEach(() => {
        result = parseNumberToMoney(number, fractionDigit);
      });

      it('should return money value with the number of decimal digits', () => {
        expect(result).toEqual('10.00');
      });
    });

    describe('when number is null', () => {
      const number = null;
      let result;

      beforeEach(() => {
        result = parseNumberToMoney(number, fractionDigit);
      });

      it('should return `undefined`', () => {
        expect(result).toEqual(undefined);
      });
    });
  });
});

describe('rendering', () => {
  let wrapper;
  let props;
  describe('currency field', () => {
    describe('dropdown head', () => {
      let currencyFieldWrapper;
      let currencyField;
      let currencyFieldChildren;
      let chevron;
      let iconWrapper;

      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyNumericInput {...props} />);
        currencyField = wrapper.find(CurrencyDropdownHead);
        currencyFieldChildren = currencyField.prop('children');
        chevron = shallow(currencyField.prop('chevron'));
        iconWrapper = shallow(chevron.prop('children'));
      });

      it('should render a `CurrencyDropdownHead`', () => {
        expect(wrapper).toRender(CurrencyDropdownHead);
      });

      it('should render selected currency symbol', () => {
        expect(currencyFieldChildren).toEqual('€');
      });

      describe('when currency is selectable', () => {
        it('should render a chevron', () => {
          expect(chevron).toRender(AccessibleButton);
        });

        describe('when dropdown is close', () => {
          it('should render a `CaretDownIcon`', () => {
            expect(iconWrapper).toRender('CaretDownIcon');
          });
        });

        describe('when dropdown is open', () => {
          beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<MoneyNumericInput {...props} />);
            wrapper.setState({ isDropdownOpen: true });
            currencyField = wrapper.find(CurrencyDropdownHead);
            currencyFieldChildren = currencyField.prop('children');
            chevron = shallow(currencyField.prop('chevron'));
            iconWrapper = shallow(chevron.prop('children'));
          });

          it('should render a `CaretUpIcon`', () => {
            expect(iconWrapper).toRender('CaretUpIcon');
          });
        });
      });

      describe('when currency is not selectable', () => {
        beforeEach(() => {
          props = createTestProps({ isCurrencySelectable: false });
          wrapper = shallow(<MoneyNumericInput {...props} />);
          currencyField = wrapper.find(CurrencyDropdownHead);
        });

        it('should render a chevron', () => {
          expect(currencyField.prop('chevron')).toEqual(undefined);
        });
      });

      describe('with states', () => {
        describe('open', () => {
          beforeEach(() => {
            props = createTestProps({
              isDisabled: true,
            });
            wrapper = shallow(<MoneyNumericInput {...props} />);
            wrapper.setState({ isDropdownOpen: true });
            currencyFieldWrapper = wrapper.find('.currency-dropdown-container');
          });

          it('should have opened styles', () => {
            expect(currencyFieldWrapper).toHaveClassName(
              'currency-dropdown-open-container'
            );
          });
        });

        describe('disabled', () => {
          beforeEach(() => {
            props = createTestProps({
              isDisabled: true,
            });
            wrapper = shallow(<MoneyNumericInput {...props} />);
            currencyFieldWrapper = wrapper.find('.currency-dropdown-container');
          });

          it('should have disabled styles', () => {
            expect(currencyFieldWrapper).toHaveClassName(
              'disabled-currency-dropdown-container'
            );
          });
        });

        describe('error', () => {
          beforeEach(() => {
            props = createTestProps({
              hasCurrencyError: true,
            });
            wrapper = shallow(<MoneyNumericInput {...props} />);
            currencyFieldWrapper = wrapper.find('.currency-dropdown-container');
          });

          it('should have error styles', () => {
            expect(currencyFieldWrapper).toHaveClassName('currency-error');
          });
        });

        describe('warning', () => {
          beforeEach(() => {
            props = createTestProps({
              hasCurrencyWarning: true,
            });
            wrapper = shallow(<MoneyNumericInput {...props} />);
            currencyFieldWrapper = wrapper.find('.currency-dropdown-container');
          });

          it('should have error styles', () => {
            expect(currencyFieldWrapper).toHaveClassName('currency-warning');
          });
        });
      });
    });

    describe('dropdown options', () => {
      let options;
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyNumericInput {...props} />);
        wrapper.setState({ isDropdownOpen: true });
        options = wrapper.find('Option');
      });

      it('should render options', () => {
        expect(wrapper).toRender('Options');
      });

      it('should render as many options as currencies', () => {
        expect(options).toHaveLength(2);
      });
    });
  });

  describe('amount field', () => {
    let amountField;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<MoneyNumericInput {...props} />);
      amountField = wrapper.find({ name: props.amountName });
    });

    it('should render a `Cleave`', () => {
      expect(wrapper).toRender({ name: props.amountName });
    });

    it('input have a HTML name', () => {
      expect(amountField).toHaveProp('name', 'amount-field');
    });

    describe('with states', () => {
      describe('disabled', () => {
        beforeEach(() => {
          props = createTestProps({
            isDisabled: true,
          });
          wrapper = shallow(<MoneyNumericInput {...props} />);
          amountField = wrapper.find({ name: props.amountName });
        });

        it('should have disabled styles', () => {
          expect(amountField).toHaveClassName('disabled');
        });
      });

      describe('error', () => {
        beforeEach(() => {
          props = createTestProps({
            hasAmountError: true,
          });
          wrapper = shallow(<MoneyNumericInput {...props} />);
          amountField = wrapper.find({ name: props.amountName });
        });

        it('should have error styles', () => {
          expect(amountField).toHaveClassName('error');
        });
      });

      describe('warning', () => {
        beforeEach(() => {
          props = createTestProps({
            hasAmountWarning: true,
          });
          wrapper = shallow(<MoneyNumericInput {...props} />);
          amountField = wrapper.find({ name: props.amountName });
        });

        it('should have error styles', () => {
          expect(amountField).toHaveClassName('warning');
        });
      });
    });
  });
});

describe('callbacks', () => {
  let wrapper;
  let props;
  describe('currency field', () => {
    describe('on dropdown click', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyNumericInput {...props} />);
        wrapper
          .find(CurrencyDropdownHead)
          .at(0)
          .prop('onClick')();
      });

      it('dropdown should be open', () => {
        expect(wrapper).toHaveState({ isDropdownOpen: true });
      });
    });

    describe('when changing amount', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyNumericInput {...props} />);
        wrapper.setState({ isDropdownOpen: true });
        wrapper
          .find('Option')
          .at(0)
          .prop('onClick')({
          target: {},
        });
      });

      it('should call onCurrencyChange', () => {
        expect(props.onCurrencyChange).toHaveBeenCalled();
      });

      it('should call onCurrencyChange with the new value', () => {
        expect(props.onCurrencyChange).toHaveBeenCalledWith({
          target: { label: '€', value: 'EUR' },
        });
      });
    });

    describe('on elsewhere click', () => {
      let event;
      beforeEach(() => {
        event = jest.fn(() => ({ target: 'other-target' }));
        props = createTestProps();
        wrapper = shallow(<MoneyNumericInput {...props} />);
        wrapper.setState({
          isDropdownOpen: true,
          dropdownButtonReference: {
            contains: jest.fn(() => false),
          },
        });
        wrapper.instance().handleGlobalClick(event);
      });

      it('dropdown should be close', () => {
        expect(wrapper).toHaveState({ isDropdownOpen: false });
      });
    });
  });

  describe('amount field', () => {
    describe('when input loses focus', () => {
      let cleaveComponentReference;
      beforeEach(() => {
        cleaveComponentReference = {
          setRawValue: jest.fn(),
        };
        props = createTestProps({
          value: 10,
          onBlur: jest.fn(),
        });
        wrapper = shallow(<MoneyNumericInput {...props} />);
        wrapper.instance().cleaveComponentReference = cleaveComponentReference;
        wrapper
          .find({ name: props.amountName })
          .at(0)
          .prop('onBlur')();
      });

      it('should call onBlur', () => {
        expect(props.onBlur).toHaveBeenCalled();
      });
    });
  });
});
