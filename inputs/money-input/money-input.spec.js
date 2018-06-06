import React from 'react';
import { shallow } from 'enzyme';
import Cleave from 'cleave.js/react';
import { intlMock } from '@commercetools-local/test-utils';
import AccessibleButton from '../../buttons/accessible-button';
import MoneyInput, {
  parseNumberToMoney,
  Currency,
  CurrencyDropdown,
  DropdownChevron,
  DropdownChevronWithIntl,
} from './money-input';
import styles from './money-input.mod.css';

const createTestProps = customProps => ({
  language: 'en',
  value: { currencyCode: 'EUR' },
  currencies: ['EUR', 'USD'],
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ...customProps,
});

const createDropdownProps = customProps => ({
  onClick: jest.fn(),
  isDisabled: false,
  isOpen: false,
  className: 'chevron-icon',
  buttonRef: jest.fn(),
  intl: intlMock,
  ...customProps,
});

const createCurrencyProps = customProps => ({
  isDisabled: false,
  onClick: jest.fn(),
  currency: '€',
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

    it('should render an `AccessibleButton`', () => {
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

  describe('`Currency` component', () => {
    const currencyProps = createCurrencyProps();
    beforeEach(() => {
      wrapper = shallow(<Currency {...currencyProps} />);
    });

    it('should render an `AccessibleButton`', () => {
      expect(wrapper).toRender(AccessibleButton);
    });

    it('should render selected currency symbol', () => {
      expect(wrapper.prop('children')).toEqual('€');
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
          .find('Downshift')
          .renderProp('render', downshiftProps);
      });

      it('should render an `Currency`', () => {
        expect(dowshiftRenderWrapper).toRender(Currency);
      });

      describe('when currency is selectable', () => {
        it('should render a chevron', () => {
          expect(dowshiftRenderWrapper).toRender(DropdownChevronWithIntl);
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
              .find('Downshift')
              .renderProp('render', downshiftProps);
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
              .find('Downshift')
              .renderProp('render', downshiftProps);
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
              .find('Downshift')
              .renderProp('render', downshiftProps);
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
              .find('Downshift')
              .renderProp('render', downshiftProps);
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
          .find('Downshift')
          .renderProp('render', downshiftProps);
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
      centAmountField = wrapper.find(Cleave);
    });

    it('should render a `Cleave`', () => {
      expect(wrapper).toRender(Cleave);
    });

    describe('with states', () => {
      describe('disabled', () => {
        beforeEach(() => {
          props = createTestProps({
            isDisabled: true,
          });
          wrapper = shallow(<MoneyInput {...props} />);
          centAmountField = wrapper.find(Cleave);
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
          centAmountField = wrapper.find(Cleave);
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
          centAmountField = wrapper.find(Cleave);
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
  let dropdown;
  let downshiftProps;
  let dowshiftRenderWrapper;
  describe('currency field', () => {
    describe('when changing centAmount', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<MoneyInput {...props} />);
        dropdown = wrapper.find(CurrencyDropdown).shallow();
        downshiftProps = { isOpen: true, toggleMenu: jest.fn() };
        dowshiftRenderWrapper = shallow(
          dropdown.find('Downshift').prop('render')(downshiftProps)
        );
        dowshiftRenderWrapper
          .find('Option')
          .at(0)
          .prop('onClick')({
          target: {},
        });
      });

      it('should call onChange', () => {
        expect(props.onChange).toHaveBeenCalled();
      });

      it('should call onChange with the new value', () => {
        expect(props.onChange).toHaveBeenCalledWith({
          currencyCode: 'EUR',
        });
      });
    });
  });

  describe('centAmount field', () => {
    describe('when input loses focus', () => {
      let cleaveComponentReference;
      beforeEach(() => {
        cleaveComponentReference = {
          setRawValue: jest.fn(),
        };
        props = createTestProps({
          value: {
            currencyCode: 'EUR',
            centAmount: 10,
          },
          onBlur: jest.fn(),
        });
        wrapper = shallow(<MoneyInput {...props} />);
        wrapper.instance().cleaveComponentReference = cleaveComponentReference;
        wrapper
          .find(Cleave)
          .at(0)
          .prop('onBlur')();
      });

      it('should call onBlur', () => {
        expect(props.onBlur).toHaveBeenCalled();
      });
    });
  });
});
