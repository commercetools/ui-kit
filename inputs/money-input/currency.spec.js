import React from 'react';
import { shallow } from 'enzyme';
import AccessibleButton from '../../buttons/accessible-button';
import MoneyInput from './money-input';
import CurrencyDropdown from './currency-dropdown';
import DropdownChevron from './dropdown-chevron';
import Currency from './currency';
import styles from './money-input.mod.css';
import Option from './option';

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

describe('rendering', () => {
  let wrapper;
  let props;
  let downshiftProps;
  let downshiftRenderWrapper;

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
    const render = (moneyInputProps, dropdownProps) =>
      shallow(<MoneyInput {...moneyInputProps} />)
        .find(CurrencyDropdown)
        .shallow()
        .find('Downshift')
        .renderProp('render', dropdownProps);

    describe('dropdown head', () => {
      beforeEach(() => {
        props = createTestProps();
        downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
        downshiftRenderWrapper = render(props, downshiftProps);
        wrapper = shallow(<MoneyInput {...props} />);
      });

      it('should render an `Currency`', () => {
        expect(downshiftRenderWrapper).toRender(Currency);
      });

      describe('when currency is selectable', () => {
        it('should render a chevron', () => {
          expect(downshiftRenderWrapper).toRender(DropdownChevron);
        });
      });

      describe('with states', () => {
        describe('open', () => {
          beforeEach(() => {
            props = createTestProps();
            downshiftProps = { isOpen: true, toggleMenu: jest.fn() };
            downshiftRenderWrapper = render(props, downshiftProps);
          });

          it('should have opened styles', () => {
            expect(downshiftRenderWrapper).toHaveClassName(
              styles['currency-active']
            );
          });
        });

        describe('disabled', () => {
          beforeEach(() => {
            props = createTestProps({
              isDisabled: true,
            });
            wrapper = shallow(<MoneyInput {...props} />);
            downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
            downshiftRenderWrapper = render(props, downshiftProps);
          });

          it('should have disabled styles', () => {
            expect(downshiftRenderWrapper).toHaveClassName(
              styles['currency-disabled']
            );
          });
        });

        describe('error', () => {
          beforeEach(() => {
            props = createTestProps({
              hasCurrencyError: true,
            });
            downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
            downshiftRenderWrapper = render(props, downshiftProps);
          });

          it('should have error styles', () => {
            expect(downshiftRenderWrapper).toHaveClassName(
              styles['currency-error']
            );
          });
        });

        describe('warning', () => {
          beforeEach(() => {
            props = createTestProps({
              hasCurrencyWarning: true,
            });
            downshiftProps = { isOpen: false, toggleMenu: jest.fn() };
            downshiftRenderWrapper = render(props, downshiftProps);
          });

          it('should have error styles', () => {
            expect(downshiftRenderWrapper).toHaveClassName(
              styles['currency-warning']
            );
          });
        });
      });
    });

    describe('dropdown options', () => {
      let options;
      beforeEach(() => {
        props = createTestProps();
        downshiftProps = { isOpen: true, toggleMenu: jest.fn() };
        downshiftRenderWrapper = render(props, downshiftProps);
        options = downshiftRenderWrapper.find(Option);
      });

      it('should render options', () => {
        expect(downshiftRenderWrapper).toRender('.currency-active');
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
          expect(centAmountField).toHaveClassName(styles['amount-disabled']);
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
          expect(centAmountField).toHaveClassName(styles['amount-error']);
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
          expect(centAmountField).toHaveClassName(styles['amount-warning']);
        });
      });
    });
  });
});
