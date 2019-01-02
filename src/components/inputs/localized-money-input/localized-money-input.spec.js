import React from 'react';
import PropTypes from 'prop-types';
import { render, fireEvent } from '../../../test-utils';
import LocalizedMoneyInput from './localized-money-input';

// We use this component to simulate the whole flow of
// changing a value and formatting on blur.
class TestComponent extends React.Component {
  static displayName = 'TestComponent';
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.objectOf(PropTypes.string).isRequired,
    onChange: PropTypes.func,
    selectedCurrency: PropTypes.string.isRequired,
  };
  static defaultProps = {
    id: 'some-id',
    name: 'some-name',
    value: {
      EUR: '12.77',
      USD: '13.55',
      CAD: '19.82',
    },
    selectedCurrency: 'CAD',
    intl: { formatMessage: message => message.id },
  };

  state = {
    value: this.props.value || {},
    selectedCurrency: this.props.selectedCurrency || '',
  };

  handleChange = event => {
    event.persist();
    this.setState({
      value: {
        ...this.state.value,
        [event.target.currency]: event.target.value,
      },
    });
    if (this.props.handleChange) this.props.handleChange(event);
  };

  render() {
    return (
      <LocalizedMoneyInput
        {...this.props}
        onChange={this.handleChange}
        value={this.state.value}
        selectedCurrency={this.state.selectedCurrency}
      />
    );
  }
}

const renderLocalizedMoneyInput = (props, options) =>
  render(<TestComponent {...props} />, options);

it('should forward data-attributes', () => {
  const { container } = renderLocalizedMoneyInput({
    'data-foo': 'bar',
  });
  expect(container.querySelector('[data-foo="bar"]')).toBeInTheDocument();
});

it('should have an HTML name', () => {
  const { container } = renderLocalizedMoneyInput({
    name: 'foo',
    selectedCurrency: 'CAD',
  });
  expect(
    container.querySelector('input[name="foo.CAD.amount"]')
  ).toBeInTheDocument();
});

it('should call onBlur when input loses focus', () => {
  const onBlur = jest.fn();
  const { container } = renderLocalizedMoneyInput({
    name: 'foo',
    selectedCurrency: 'CAD',
    onBlur,
  });
  const input = container.querySelector('input[name="foo.CAD.amount"]');
  input.focus();
  expect(input).toHaveFocus();
  input.blur();
  expect(input).not.toHaveFocus();
});

describe('when input is collapsed', () => {
  it('should not show only the `selectedCurrency`', () => {
    const { container } = renderLocalizedMoneyInput({
      name: 'foo',
      selectedCurrency: 'CAD',
    });
    expect(
      container.querySelector('input[name="foo.CAD.amount"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('input[name="foo.USD.amount"]')
    ).not.toBeInTheDocument();
  });
  it('should allow changing value of the input', () => {
    const { container } = renderLocalizedMoneyInput({
      name: 'foo',
      selectedCurrency: 'CAD',
    });
    const event = { target: { value: '17.34' } };
    const input = container.querySelector('input[name="foo.CAD.amount"]');
    fireEvent.focus(input);
    fireEvent.change(input, event);
    fireEvent.keyDown(input, { key: 'Enter' });
    fireEvent.keyUp(input, { key: 'Enter' });
    expect(input.value).toEqual('17.34');
  });
});

describe('when input is expanded', () => {
  it('should expand and show all currency inputs when `Show all currencies` is clicked', () => {
    const { container, getByLabelText } = renderLocalizedMoneyInput({
      name: 'foo',
      selectedCurrency: 'CAD',
    });
    expect(
      container.querySelector('input[name="foo.USD.amount"]')
    ).not.toBeInTheDocument();
    getByLabelText(/show all currencies/i).click();
    expect(
      container.querySelector('input[name="foo.USD.amount"]')
    ).toBeInTheDocument();
  });
  it('should allow changing the USD input', () => {
    const { getByLabelText, container } = renderLocalizedMoneyInput({
      name: 'foo',
      selectedCurrency: 'CAD',
    });
    getByLabelText(/show all currencies/i).click();
    const event = { target: { value: '12.98' } };
    const USDInput = container.querySelector('input[name="foo.USD.amount"]');
    fireEvent.focus(USDInput);
    fireEvent.change(USDInput, event);
    fireEvent.keyDown(USDInput, { key: 'Enter' });
    fireEvent.keyDown(USDInput, { key: 'Enter' });
    expect(USDInput.value).toEqual('12.98');
  });
});

describe('when expanded by default', () => {
  it('should render one input per currency', () => {
    const { getByLabelText, container } = renderLocalizedMoneyInput({
      name: 'foo',
      selectedCurrency: 'CAD',
      isDefaultExpanded: true,
    });
    const USDInput = container.querySelector('input[name="foo.USD.amount"]');
    const CADInput = container.querySelector('input[name="foo.CAD.amount"]');
    expect(USDInput).toBeInTheDocument();
    expect(CADInput).toBeInTheDocument();
    expect(getByLabelText(/hide currencies/i)).toBeInTheDocument();
  });
});

describe('when expansion controls are hidden', () => {
  it('should render one input per currency and no hide button', () => {
    const { queryByLabelText, container } = renderLocalizedMoneyInput({
      name: 'foo',
      selectedCurrency: 'CAD',
      hideExpansionControls: true,
    });
    const USDInput = container.querySelector('input[name="foo.USD.amount"]');
    const CADInput = container.querySelector('input[name="foo.CAD.amount"]');
    expect(USDInput).toBeInTheDocument();
    expect(CADInput).toBeInTheDocument();
    expect(queryByLabelText(/hide currencies/i)).not.toBeInTheDocument();
  });
});

describe('when disabled', () => {
  describe('when not expanded', () => {
    it('should render a disabled input', () => {
      const { container } = renderLocalizedMoneyInput({
        name: 'foo',
        isDisabled: true,
        selectedCurrency: 'CAD',
      });
      expect(
        container.querySelector('input[name="foo.CAD.amount"]')
      ).toHaveAttribute('disabled');
    });
  });
  describe('when expanded', () => {
    it('should be able to expand, and all inputs are disabled', () => {
      const { getByLabelText, container } = renderLocalizedMoneyInput({
        name: 'foo',
        isDisabled: true,
        selectedCurrency: 'CAD',
      });
      getByLabelText(/show all currencies/i).click();
      const USDInput = container.querySelector('input[name="foo.USD.amount"]');
      const CADInput = container.querySelector('input[name="foo.CAD.amount"]');

      expect(USDInput).toHaveAttribute('disabled');
      expect(CADInput).toHaveAttribute('disabled');
    });
  });
});

describe('when placeholders are provided', () => {
  it('should forward the placeholders', () => {
    const { container } = renderLocalizedMoneyInput({
      name: 'foo',
      isDefaultExpanded: true,
      placeholder: {
        USD: 'USD placeholder',
        CAD: 'CAD placeholder',
      },
    });
    const USDInput = container.querySelector('input[name="foo.USD.amount"]');
    const CADInput = container.querySelector('input[name="foo.CAD.amount"]');

    expect(USDInput).toHaveAttribute('placeholder', 'USD placeholder');
    expect(CADInput).toHaveAttribute('placeholder', 'CAD placeholder');
  });
});

describe('when every field has an error', () => {
  const errors = {
    USD: 'A value is required',
    CAD: 'A value is required',
  };
  it('should be open all fields and render errors', () => {
    const { getByText } = renderLocalizedMoneyInput({
      name: 'foo',
      errors,
    });
    expect(getByText(errors.USD)).toBeInTheDocument();
    expect(getByText(errors.CAD)).toBeInTheDocument();
  });
});

describe('when the error is not on the selected currency', () => {
  it('should be open all fields and render errors', () => {
    const errors = {
      USD: 'A value is required',
    };
    const { getByText, container } = renderLocalizedMoneyInput({
      selectedCurrency: 'CAD',
      name: 'foo',
      errors,
    });
    const USDInput = container.querySelector('input[name="foo.USD.amount"]');
    const CADInput = container.querySelector('input[name="foo.CAD.amount"]');

    expect(USDInput).toBeInTheDocument();
    expect(CADInput).toBeInTheDocument();
    expect(getByText(errors.USD)).toBeInTheDocument();
  });
});

describe('when the error is on the selected currency', () => {
  it('should display the error without expanding', () => {
    const errors = {
      CAD: 'A value is required',
    };
    const { container, getByText } = renderLocalizedMoneyInput({
      selectedCurrency: 'CAD',
      name: 'foo',
      errors,
    });
    const USDInput = container.querySelector('input[name="foo.USD.amount"]');
    const CADInput = container.querySelector('input[name="foo.CAD.amount"]');

    expect(CADInput).toBeInTheDocument();
    expect(USDInput).not.toBeInTheDocument();
    expect(getByText(errors.CAD)).toBeInTheDocument();
  });
});

describe('LocalizedMoneyInput.convertToMoneyValues', () => {
  describe('when an unknown currency is used', () => {
    it('should return an error for this currency', () => {
      expect(
        LocalizedMoneyInput.convertToMoneyValues({
          EUR: '9',
          foo: '1',
          USD: '12',
        })
      ).toEqual([
        {
          centAmount: 900,
          currencyCode: 'EUR',
          fractionDigits: 2,
          type: 'centPrecision',
        },
        null,
        {
          centAmount: 1200,
          currencyCode: 'USD',
          fractionDigits: 2,
          type: 'centPrecision',
        },
      ]);
    });
  });

  describe('when no amount is present', () => {
    it('should return an error for this currency', () => {
      expect(
        LocalizedMoneyInput.convertToMoneyValues({
          USD: '21',
          EUR: '',
          EGP: '9',
        })
      ).toEqual([
        {
          centAmount: 2100,
          currencyCode: 'USD',
          fractionDigits: 2,
          type: 'centPrecision',
        },
        null,
        {
          centAmount: 900,
          currencyCode: 'EGP',
          fractionDigits: 2,
          type: 'centPrecision',
        },
      ]);
      expect(
        LocalizedMoneyInput.convertToMoneyValues({ EUR: undefined })
      ).toEqual([null]);
    });
  });

  describe('when amount can not be parsed', () => {
    it('should return an error for this currency', () => {
      expect(
        LocalizedMoneyInput.convertToMoneyValues({
          EUR: 'foo',
        })
      ).toEqual([null]);
    });
  });

  // The browser always transforms "1,2" to "1.2" on the event
  // so we don't need to handle the comma case.
  describe('when called with a centPrecision price', () => {
    it('should treat it as a decimal separator', () => {
      expect(
        LocalizedMoneyInput.convertToMoneyValues({
          EUR: '1.2',
        })
      ).toEqual([
        {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 120,
          fractionDigits: 2,
        },
      ]);

      expect(
        LocalizedMoneyInput.convertToMoneyValues({
          KWD: '1.234',
        })
      ).toEqual([
        {
          type: 'centPrecision',
          currencyCode: 'KWD',
          centAmount: 1234,
          fractionDigits: 3,
        },
      ]);
    });
  });

  describe('when called with a centPrecision price with weird JS rounding', () => {
    it('should treat it as a decimal separator', () => {
      expect(
        LocalizedMoneyInput.convertToMoneyValues({
          EUR: '2.49',
        })
      ).toEqual([
        {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 249,
          fractionDigits: 2,
        },
      ]);

      // This test ensures that rounding is used instead of just cutting the
      // number of. Cutting it of would result in an incorrect 239998.
      expect(
        LocalizedMoneyInput.convertToMoneyValues({
          EUR: '2399.99',
        })
      ).toEqual([
        {
          type: 'centPrecision',
          currencyCode: 'EUR',
          centAmount: 239999,
          fractionDigits: 2,
        },
      ]);
    });
  });

  describe('when called with a high precision price', () => {
    it('should return a money value of type "highPrecision"', () => {
      expect(
        LocalizedMoneyInput.convertToMoneyValues({
          EUR: '1.234',
        })
      ).toEqual([
        {
          type: 'highPrecision',
          currencyCode: 'EUR',
          centAmount: 123,
          fractionDigits: 3,
          preciseAmount: 1234,
        },
      ]);
    });
  });
});

describe('LocalizedMoneyInput.parseMoneyValues', () => {
  describe('when called without a value', () => {
    it('should return empty object', () => {
      expect(LocalizedMoneyInput.parseMoneyValues()).toEqual({});
    });
  });
  describe('when called with a centPrecision money missing centAmount', () => {
    it('should throw', () => {
      expect(() =>
        LocalizedMoneyInput.parseMoneyValues(
          [
            {
              type: 'centPrecision',
              currencyCode: 'EUR',
            },
          ],
          'en'
        )
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });
  describe('when called with a centPrecision money using an unknown currenyCode', () => {
    it('should throw', () => {
      expect(() =>
        LocalizedMoneyInput.parseMoneyValues(
          [
            {
              type: 'centPrecision',
              currencyCode: 'FOO',
            },
          ],
          'en'
        )
      ).toThrow(
        'MoneyInput.parseMoneyValue: Value must use known currency code'
      );
    });
  });
  describe('when called with a highPrecision money missing fractionDigits', () => {
    it('should throw', () => {
      expect(() =>
        LocalizedMoneyInput.parseMoneyValues(
          [
            {
              type: 'highPrecision',
              currencyCode: 'EUR',
              preciseAmount: 3,
            },
          ],
          'en'
        )
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });
  describe('when called with a highPrecision money missing preciseAmount', () => {
    it('should throw', () => {
      expect(() =>
        LocalizedMoneyInput.parseMoneyValues(
          [
            {
              type: 'highPrecision',
              currencyCode: 'EUR',
              fractionDigits: 2,
            },
          ],
          'en'
        )
      ).toThrow('MoneyInput.parseMoneyValue: Value must contain "amount"');
    });
  });
  describe('when called without a locale', () => {
    it('should throw', () => {
      expect(() =>
        LocalizedMoneyInput.parseMoneyValues([
          {
            type: 'centPrecision',
            centAmount: 1234,
            currencyCode: 'EUR',
            fractionDigits: 2,
          },
        ])
      ).toThrow(
        'MoneyInput.parseMoneyValue: A locale must be passed as the second argument'
      );
    });
  });

  describe('when called with a minimal, valid centPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        LocalizedMoneyInput.parseMoneyValues(
          [
            {
              centAmount: 1234,
              currencyCode: 'EUR',
            },
          ],
          'en'
        )
      ).toEqual({ EUR: '12.34' });
    });
  });
  describe('when called with a full, valid centPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        LocalizedMoneyInput.parseMoneyValues(
          [
            {
              type: 'centPrecision',
              centAmount: 1234,
              currencyCode: 'EUR',
              fractionDigits: 2,
            },
          ],
          'en'
        )
      ).toEqual({ EUR: '12.34' });
    });
  });
  describe('when called with a minimal highPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        LocalizedMoneyInput.parseMoneyValues(
          [
            {
              type: 'highPrecision',
              currencyCode: 'EUR',
              fractionDigits: 3,
              preciseAmount: 12345,
            },
          ],
          'en'
        )
      ).toEqual({ EUR: '12.345' });
    });
  });
  describe('when called with a full highPrecision price', () => {
    it('should turn it into a value', () => {
      expect(
        LocalizedMoneyInput.parseMoneyValues(
          [
            {
              type: 'highPrecision',
              centAmount: 1234,
              currencyCode: 'EUR',
              fractionDigits: 3,
              preciseAmount: 12345,
            },
          ],
          'en'
        )
      ).toEqual({ EUR: '12.345' });
    });
  });
});

describe('LocalizedMoneyInput.getHighPrecisionCurrencies', () => {
  describe('when called with a regular precision money value', () => {
    it('should return empty array', () => {
      expect(
        LocalizedMoneyInput.getHighPrecisionCurrencies({ EUR: '2.01' })
      ).toMatchObject([]);
    });
  });
  describe('when called with a high precision money value', () => {
    it("should return the currencies that don't have high precision value", () => {
      expect(
        LocalizedMoneyInput.getHighPrecisionCurrencies({
          EUR: '13.44',
          USD: '2.001',
          EGP: '12.00',
        })
      ).toMatchObject(['USD']);
    });
  });
  describe('when called with an empty money value', () => {
    it('should throw', () => {
      expect(() =>
        LocalizedMoneyInput.getHighPrecisionCurrencies([
          { amount: '', currencyCode: 'EUR' },
        ])
      ).toThrow();
    });
  });
});

describe('LocalizedMoneyInput.getEmptyCurrencies', () => {
  describe('when value is filled out', () => {
    it('should return empty array', () => {
      expect(
        LocalizedMoneyInput.getEmptyCurrencies({ EUR: '5.22', USD: '31.88' })
      ).toHaveLength(0);
    });
  });
  describe('when value is empty', () => {
    it("should return the currencies that don't have value", () => {
      expect(
        LocalizedMoneyInput.getEmptyCurrencies({ EUR: '', USD: '31.88' })
      ).toEqual(expect.arrayContaining(['EUR']));
    });
  });
});
