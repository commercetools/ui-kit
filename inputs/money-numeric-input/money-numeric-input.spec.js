import React from 'react';
import { shallow } from 'enzyme';
import AccessibleButton from '../../buttons/accessible-button';
import MoneyNumericInput, {
  parseNumberToMoney,
  DropdownChevron,
} from './money-numeric-input';

const createTestProps = customProps => ({
  language: 'en',
  currencyInputName: 'currency-field',
  amountInputName: 'amount-field',
  currency: { value: 'EUR', label: '€' },
  currencies: [{ value: 'EUR', label: '€' }, { value: 'USD', label: '$' }],
  onCurrencyChange: jest.fn(),
  onAmountChange: jest.fn(),
  onBlur: jest.fn(),
  ...customProps,
});

const createDropdownProps = customProps => ({
  onClick: jest.fn(),
  isDisabled: false,
  isOpen: false,
  className: 'chevron-icon',
  buttonRef: jest.fn(),
  ...customProps,
});

describe('utils', () => {
  describe('parseNumberToMoney', () => {
    const fractionDigits = 2;
    describe('when number has value', () => {
      const number = 1000;
      let result;

      beforeEach(() => {
        result = parseNumberToMoney(number, fractionDigits);
      });

      it('should return money value with the number of decimal digits', () => {
        expect(result).toEqual('10.00');
      });
    });

    describe('when number is null', () => {
      const number = null;
      let result;

      beforeEach(() => {
        result = parseNumberToMoney(number, fractionDigits);
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
  let downshiftProps;
  let dowshiftRenderWrapper;

  describe('`DropdownChevron` component', () => {
    let dropdownChevron;
    let iconWrapper;
    let dropdownProps;
    beforeEach(() => {
      dropdownProps = createDropdownProps();
      dropdownChevron = shallow(<DropdownChevron {...dropdownProps} />);
    });

    it('should render a `AccessibleButton`', () => {
      expect(dropdownChevron).toRender(AccessibleButton);
    });

    describe('when is closed', () => {
      beforeEach(() => {
        iconWrapper = shallow(
          dropdownChevron.find(AccessibleButton).prop('children')
        );
      });

      it('should render a `CaretDownIcon`', () => {
        expect(iconWrapper).toRender('CaretDownIcon');
      });
    });

    describe('when is open', () => {
      beforeEach(() => {
        dropdownProps = createDropdownProps({ isOpen: true });
        dropdownChevron = shallow(<DropdownChevron {...dropdownProps} />);
        iconWrapper = shallow(
          dropdownChevron.find(AccessibleButton).prop('children')
        );
      });

      it('should render a `CaretUpIcon`', () => {
        expect(iconWrapper).toRender('CaretUpIcon');
      });
    });
  });

  describe('currency field', () => {
    describe('dropdown head', () => {
      let currencyFieldWrapper;
      let currencyField;

      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyNumericInput {...props} />);
        downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
        dowshiftRenderWrapper = shallow(
          wrapper.find('Downshift').prop('render')(downshiftProps)
        );
        currencyField = dowshiftRenderWrapper.find(AccessibleButton);
      });

      it('should render a `AccessibleButton`', () => {
        expect(dowshiftRenderWrapper).toRender(AccessibleButton);
      });

      it('should render selected currency symbol', () => {
        expect(currencyField.prop('children')).toEqual('€');
      });

      describe('when currency is selectable', () => {
        it('should render a chevron', () => {
          expect(dowshiftRenderWrapper).toRender('DropdownChevron');
        });
      });

      describe('with states', () => {
        describe('open', () => {
          beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<MoneyNumericInput {...props} />);
            downshiftProps = { isOpen: true, toggleMenu: jest.fn() };
            dowshiftRenderWrapper = shallow(
              wrapper.find('Downshift').prop('render')(downshiftProps)
            );
            currencyFieldWrapper = dowshiftRenderWrapper.find(
              '.currency-dropdown-container'
            );
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
            downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
            dowshiftRenderWrapper = shallow(
              wrapper.find('Downshift').prop('render')(downshiftProps)
            );
            currencyFieldWrapper = dowshiftRenderWrapper.find(
              '.currency-dropdown-container'
            );
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
            downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
            dowshiftRenderWrapper = shallow(
              wrapper.find('Downshift').prop('render')(downshiftProps)
            );
            currencyFieldWrapper = dowshiftRenderWrapper.find(
              '.currency-dropdown-container'
            );
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
            downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
            dowshiftRenderWrapper = shallow(
              wrapper.find('Downshift').prop('render')(downshiftProps)
            );
            currencyFieldWrapper = dowshiftRenderWrapper.find(
              '.currency-dropdown-container'
            );
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
        downshiftProps = { isOpen: true, toggleMenu: jest.fn() };
        dowshiftRenderWrapper = shallow(
          wrapper.find('Downshift').prop('render')(downshiftProps)
        );
        options = dowshiftRenderWrapper.find('Option');
      });

      it('should render options', () => {
        expect(dowshiftRenderWrapper).toRender('Options');
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
      amountField = wrapper.find({ name: props.amountInputName });
    });

    it('should render a `Cleave`', () => {
      expect(wrapper).toRender({ name: props.amountInputName });
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
          amountField = wrapper.find({ name: props.amountInputName });
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
          amountField = wrapper.find({ name: props.amountInputName });
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
          amountField = wrapper.find({ name: props.amountInputName });
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
  let downshiftProps;
  let dowshiftRenderWrapper;
  describe('currency field', () => {
    describe('when changing amount', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyNumericInput {...props} />);
        downshiftProps = { isOpen: true, toggleMenu: jest.fn() };
        dowshiftRenderWrapper = shallow(
          wrapper.find('Downshift').prop('render')(downshiftProps)
        );
        dowshiftRenderWrapper
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
          .find({ name: props.amountInputName })
          .at(0)
          .prop('onBlur')();
      });

      it('should call onBlur', () => {
        expect(props.onBlur).toHaveBeenCalled();
      });
    });
  });
});
