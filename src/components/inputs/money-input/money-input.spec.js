import React from 'react';
import { shallow } from 'enzyme';
import Downshift from 'downshift';
import AccessibleButton from '../../buttons/accessible-button';
import MoneyInput from './money-input';
import Currency from './currency';
import Option from './option';
import CurrencyDropdown from './currency-dropdown';
import DropdownChevron from './dropdown-chevron';
import styles from './money-input.mod.css';

const createTestProps = customProps => ({
  value: { currencyCode: 'EUR', amount: '' },
  currencies: ['EUR', 'USD'],
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ...customProps,
});

const createCurrencyProps = customProps => ({
  isDisabled: false,
  onClick: jest.fn(),
  currency: '€',
  ...customProps,
});

describe('MoneyInput.getCurrencyDropdownId', () => {
  describe('when an id is passed', () => {
    it('should return the created it', () => {
      expect(MoneyInput.getCurrencyDropdownId('foo')).toBe('foo.currencyCode');
    });
  });
  describe('when no id is passed', () => {
    it('should return no id', () => {
      expect(MoneyInput.getCurrencyDropdownId()).toBe(undefined);
    });
  });
});

describe('MoneyInput.getAmountInputId', () => {
  describe('when an id is passed', () => {
    it('should return the created it', () => {
      expect(MoneyInput.getAmountInputId('foo')).toBe('foo.amount');
    });
  });
  describe('when no id is passed', () => {
    it('should return no id', () => {
      expect(MoneyInput.getAmountInputId()).toBe(undefined);
    });
  });
});

describe('MoneyInput.convertToMoneyValue', () => {
  describe('when there is no currency code', () => {
    it('should return an invalid object', () => {
      expect(MoneyInput.convertToMoneyValue({ amount: '1' })).toEqual(null);
    });
  });
  describe('when an unknown currency is used', () => {
    it('should return an invalid object', () => {
      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'foo', amount: '1' })
      ).toEqual(null);
    });
  });

  describe('when no amount is present', () => {
    it('should return an invalid object', () => {
      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'EUR', amount: '' })
      ).toEqual(null);
      expect(MoneyInput.convertToMoneyValue({ currencyCode: 'EUR' })).toEqual(
        null
      );
    });
  });

  describe('when amount can not be parsed', () => {
    it('should return an error object', () => {
      // The function generally only needs to handle values
      // which the input[type=number] emits
      // All those are guaranteed to be parseable by the browsers anyways.
      // So the case described here can only happen when the function is called
      // with an amount not obtained through the browser.
      //
      // Examples for such non-input values would be '1.2.3' and '1,2.3'
      //
      // In case we ever switch the input to type="text", we should add more
      // tests here.

      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'EUR', amount: 'foo' })
      ).toEqual(null);
    });
  });

  // The browser always transforms "1,2" to "1.2" on the event
  // so we don't need to handle the comma case.
  describe('when called with a centPrecision price', () => {
    it('should treat it as a decimal separator', () => {
      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'EUR', amount: '1.2' })
      ).toEqual({
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 120,
        fractionDigits: 2,
      });

      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'KWD', amount: '1.234' })
      ).toEqual({
        type: 'centPrecision',
        currencyCode: 'KWD',
        centAmount: 1234,
        fractionDigits: 3,
      });
    });
  });

  describe('when called with a high precision price', () => {
    it('should return a money value of type "highPrecision"', () => {
      expect(
        MoneyInput.convertToMoneyValue({ currencyCode: 'EUR', amount: '1.234' })
      ).toEqual({
        type: 'highPrecision',
        currencyCode: 'EUR',
        centAmount: 123,
        fractionDigits: 3,
        preciseAmount: 1234,
      });
    });
  });
});

describe('MoneyInput.parseMoneyValue', () => {
  describe('when called without a value', () => {
    it('should return a default value', () => {
      expect(MoneyInput.parseMoneyValue()).toEqual({
        currencyCode: '',
        amount: '',
      });
    });
  });
  describe('when called with a value missing currencyCode', () => {
    it('should throw', () => {
      expect(() => MoneyInput.parseMoneyValue({ centAmount: 10 })).toThrow(
        'MoneyInput.parseMoneyValue: Value must contain "currencyCode"'
      );
    });
  });
  describe('when called with a centPrecision money missing centAmount', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue({
          type: 'centPrecision',
          currencyCode: 'EUR',
        })
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });
  describe('when called with a centPrecision money using an unknown currenyCode', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue({
          type: 'centPrecision',
          currencyCode: 'FOO',
        })
      ).toThrow(
        'MoneyInput.parseMoneyValue: Value must use known currency code'
      );
    });
  });
  describe('when called with a highPrecision money missing fractionDigits', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue({
          type: 'highPrecision',
          currencyCode: 'EUR',
          preciseAmount: 3,
        })
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });
  describe('when called with a highPrecision money missing preciseAmount', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.parseMoneyValue({
          type: 'highPrecision',
          currencyCode: 'EUR',
          fractionDigits: 2,
        })
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });

  describe('when called with a minimal, valid centPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue({
          centAmount: 1234,
          currencyCode: 'EUR',
        })
      ).toEqual({ amount: '12.34', currencyCode: 'EUR' });
    });
  });
  describe('when called with a full, valid centPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue({
          type: 'centPrecision',
          centAmount: 1234,
          currencyCode: 'EUR',
          fractionDigits: 2,
        })
      ).toEqual({ amount: '12.34', currencyCode: 'EUR' });
    });
  });
  describe('when called with a minimal highPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue({
          type: 'highPrecision',
          currencyCode: 'EUR',
          fractionDigits: 3,
          preciseAmount: 12345,
        })
      ).toEqual({ amount: '12.345', currencyCode: 'EUR' });
    });
  });
  describe('when called with a full highPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        MoneyInput.parseMoneyValue({
          type: 'highPrecision',
          centAmount: 1234,
          currencyCode: 'EUR',
          fractionDigits: 3,
          preciseAmount: 12345,
        })
      ).toEqual({ amount: '12.345', currencyCode: 'EUR' });
    });
  });
});

describe('MoneyInput.isEmpty', () => {
  describe('when value is filled out', () => {
    it('should return false', () => {
      expect(MoneyInput.isEmpty({ amount: '5', currencyCode: 'EUR' })).toBe(
        false
      );
    });
  });
  describe('when value is empty', () => {
    it('should return true', () => {
      expect(MoneyInput.isEmpty({ amount: '', currencyCode: 'EUR' })).toBe(
        true
      );
      expect(MoneyInput.isEmpty({ amount: '5', currencyCode: '' })).toBe(true);
      expect(MoneyInput.isEmpty()).toBe(true);
    });
  });
});

describe('MoneyInput.isHighPrecision', () => {
  describe('when called with a high precision money value', () => {
    it('should return true', () => {
      expect(
        MoneyInput.isHighPrecision({ amount: '2.001', currencyCode: 'EUR' })
      ).toBe(true);
    });
  });
  describe('when called with a regular precision money value', () => {
    it('should return false', () => {
      expect(
        MoneyInput.isHighPrecision({ amount: '2.00', currencyCode: 'EUR' })
      ).toBe(false);
    });
  });
  describe('when called with an empty money value', () => {
    it('should throw', () => {
      expect(() =>
        MoneyInput.isHighPrecision({ amount: '', currencyCode: 'EUR' })
      ).toThrow();
    });
  });
});

// -----------------------------------------------------------------------------

describe('rendering', () => {
  let wrapper;
  let props;
  let downshiftProps;
  let dowshiftRenderWrapper;

  describe('`Currency` component', () => {
    const currencyProps = createCurrencyProps();
    beforeEach(() => {
      wrapper = shallow(<Currency {...currencyProps} />);
    });

    it('should render an `AccessibleButton`', () => {
      expect(wrapper).toRender(AccessibleButton);
    });

    it('should render selected currency symbol', () => {
      expect(wrapper.find('TextDetail')).toHaveProp('children', '€');
    });
  });

  describe('currency field', () => {
    describe('dropdown head', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyInput {...props} />);
        downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
        dowshiftRenderWrapper = wrapper
          .find(CurrencyDropdown)
          .shallow()
          .find(Downshift)
          .renderProp('children', downshiftProps);
      });

      it('should render `Currency`', () => {
        expect(dowshiftRenderWrapper).toRender(Currency);
      });

      describe('when currency is selectable', () => {
        it('should render a chevron', () => {
          expect(dowshiftRenderWrapper).toRender(DropdownChevron);
        });
      });

      describe('with states', () => {
        describe('open', () => {
          beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<MoneyInput {...props} />);
            downshiftProps = { isOpen: true, toggleMenu: jest.fn() };
            dowshiftRenderWrapper = wrapper
              .find(CurrencyDropdown)
              .shallow()
              .find(Downshift)
              .renderProp('children', downshiftProps);
          });

          it('should have opened styles', () => {
            expect(dowshiftRenderWrapper).toRender({
              className: styles['currency-active'],
            });
          });
        });

        describe('disabled', () => {
          beforeEach(() => {
            props = createTestProps({
              isDisabled: true,
            });
            wrapper = shallow(<MoneyInput {...props} />);
            downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
            dowshiftRenderWrapper = wrapper
              .find(CurrencyDropdown)
              .shallow()
              .find(Downshift)
              .renderProp('children', downshiftProps);
          });

          it('should have disabled styles', () => {
            expect(dowshiftRenderWrapper).toRender({
              className: styles['currency-disabled'],
            });
          });
        });

        describe('error', () => {
          beforeEach(() => {
            props = createTestProps({
              hasCurrencyError: true,
            });
            wrapper = shallow(<MoneyInput {...props} />);
            downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
            dowshiftRenderWrapper = wrapper
              .find(CurrencyDropdown)
              .shallow()
              .find(Downshift)
              .renderProp('children', downshiftProps);
          });

          it('should have error styles', () => {
            expect(dowshiftRenderWrapper).toRender({
              className: styles['currency-error'],
            });
          });
        });

        describe('warning', () => {
          beforeEach(() => {
            props = createTestProps({
              hasCurrencyWarning: true,
            });
            wrapper = shallow(<MoneyInput {...props} />);
            downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
            dowshiftRenderWrapper = wrapper
              .find(CurrencyDropdown)
              .shallow()
              .find(Downshift)
              .renderProp('children', downshiftProps);
          });

          it('should have error styles', () => {
            expect(dowshiftRenderWrapper).toRender({
              className: styles['currency-warning'],
            });
          });
        });
      });
    });

    describe('dropdown options', () => {
      let options;
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyInput {...props} />);
        downshiftProps = { isOpen: true, toggleMenu: jest.fn() };
        dowshiftRenderWrapper = wrapper
          .find(CurrencyDropdown)
          .shallow()
          .find(Downshift)
          .renderProp('children', downshiftProps);
        options = dowshiftRenderWrapper.find('Option');
      });

      it('should render options', () => {
        expect(dowshiftRenderWrapper).toRender('.currency-active');
      });

      it('should render as many options as currencies', () => {
        expect(options).toHaveLength(2);
      });
    });
  });

  describe('centAmount field', () => {
    let centAmountField;
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<MoneyInput {...props} />);
      centAmountField = wrapper.find('input');
    });

    it('should render a `input`', () => {
      expect(wrapper).toRender('input');
    });

    describe('with states', () => {
      describe('disabled', () => {
        beforeEach(() => {
          props = createTestProps({
            isDisabled: true,
          });
          wrapper = shallow(<MoneyInput {...props} />);
          centAmountField = wrapper.find('input');
        });

        it('should have disabled styles', () => {
          expect(centAmountField).toRender({
            className: styles['amount-disabled'],
          });
        });
      });

      describe('error', () => {
        beforeEach(() => {
          props = createTestProps({
            hasAmountError: true,
          });
          wrapper = shallow(<MoneyInput {...props} />);
          centAmountField = wrapper.find('input');
        });

        it('should have error styles', () => {
          expect(centAmountField).toRender({
            className: styles['amount-error'],
          });
        });
      });

      describe('warning', () => {
        beforeEach(() => {
          props = createTestProps({
            hasAmountWarning: true,
          });
          wrapper = shallow(<MoneyInput {...props} />);
          centAmountField = wrapper.find('input');
        });

        it('should have warning styles', () => {
          expect(centAmountField).toRender({
            className: styles['amount-warning'],
          });
        });
      });
    });
  });
});

describe('callbacks', () => {
  let wrapper;
  let props;
  let dowshiftRenderWrapper;
  let inputWrapper;
  describe('currency field', () => {
    describe('when selecting the already used currency', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyInput {...props} />);

        dowshiftRenderWrapper = wrapper
          .find(CurrencyDropdown)
          .dive()
          .renderProp('children', { isOpen: true, toggleMenu: jest.fn() });

        dowshiftRenderWrapper
          .find(Option)
          // click the currency which is already selected
          .findWhere(item => item.prop('children') === props.value.currencyCode)
          .prop('onClick')({ target: { value: '12' } });
      });

      it('should not call onChange', () => {
        expect(props.onChange).not.toHaveBeenCalled();
      });
    });
    describe('when changing currency', () => {
      beforeEach(() => {
        props = createTestProps({ name: 'foo' });
        wrapper = shallow(<MoneyInput {...props} />);

        dowshiftRenderWrapper = wrapper
          .find(CurrencyDropdown)
          .dive()
          .renderProp('children', { isOpen: true, toggleMenu: jest.fn() });

        dowshiftRenderWrapper
          .find(Option)
          // clicking the already selected one (EUR) won't trigger an action,
          // so we click the second one (USD)
          .findWhere(item => item.prop('children') === 'USD')
          .prop('onClick')({ target: { value: '12' } });
      });

      it('should call onChange with an event', async () => {
        // wait for onChange call which happens in setTimeout(fn ,0)
        // This can be removed once the setTimeout workarounds are
        // removed from money-input.
        await new Promise(resolve => setTimeout(resolve, 1));
        expect(props.onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            persist: expect.any(Function),
            target: expect.objectContaining({
              name: `foo.currencyCode`,
              value: 'USD',
            }),
          })
        );
      });
    });
  });

  describe('amount field', () => {
    describe('when changing amount', () => {
      beforeEach(() => {
        props = createTestProps({ name: 'foo' });
        wrapper = shallow(<MoneyInput {...props} />);

        inputWrapper = wrapper.find('input');
        inputWrapper.simulate('change', {
          target: { name: 'foo.amount', value: '1.3' },
        });
      });
      it('should call onChange', () => {
        expect(props.onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            persist: expect.any(Function),
            target: expect.objectContaining({
              name: `foo.amount`,
              value: '1.3',
            }),
          })
        );
      });
    });
    describe('when input loses focus', () => {
      describe('when value is not formatted', () => {
        const event = {};
        beforeEach(() => {
          props = createTestProps({
            name: 'foo',
            value: { currencyCode: 'EUR', amount: '10.3' },
            onBlur: jest.fn(),
          });
          wrapper = shallow(<MoneyInput {...props} />);
          wrapper.find('input').prop('onBlur')(event);
        });

        it('should call onChange with the formatted value', () => {
          expect(props.onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              persist: expect.any(Function),
              target: expect.objectContaining({
                name: `foo.amount`,
                value: '10.30',
              }),
            })
          );
        });

        it('should call onBlur with an event', () => {
          expect(props.onBlur).toHaveBeenCalledWith(event);
        });
      });
      describe('when value is already formatted', () => {
        const event = {};
        beforeEach(() => {
          props = createTestProps({
            value: { currencyCode: 'EUR', amount: '10.15' },
            onBlur: jest.fn(),
          });
          wrapper = shallow(<MoneyInput {...props} />);
          wrapper.find('input').prop('onBlur')(event);
        });

        it('should call onBlur with an event', () => {
          expect(props.onBlur).toHaveBeenCalledWith(event);
        });
        it('should not call onChange', () => {
          expect(props.onChange).not.toHaveBeenCalled();
        });
      });
    });
  });
});
