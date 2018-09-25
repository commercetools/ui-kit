import React from 'react';
import PropTypes from 'prop-types';
import has from 'lodash.has';
import requiredIf from 'react-required-if';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import FieldLabel from '../../field-label';
import MoneyInput from '../../inputs/money-input';
import createSequentialId from '../../../utils/create-sequential-id';
import FieldErrors from '../../field-errors';
import filterDataAttributes from '../../../utils/filter-data-attributes';

const sequentialId = createSequentialId('text-field-');

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

class MoneyField extends React.Component {
  static displayName = 'MoneyField';

  static getAmountInputId = MoneyInput.getAmountInputId;
  static getCurrencyDropdownId = MoneyInput.getCurrencyDropdownId;
  static convertToMoneyValue = MoneyInput.convertToMoneyValue;
  static parseMoneyValue = MoneyInput.parseMoneyValue;
  static isEmpty = MoneyInput.isEmpty;
  static isHighPrecision = MoneyInput.isHighPrecision;
  static isTouched = MoneyInput.isTouched;

  static propTypes = {
    // MoneyField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    touched: PropTypes.shape({
      amount: PropTypes.bool,
      currencyCode: PropTypes.bool,
    }),

    // Some other fields use isTouched, but the check isn't as simple here.
    // isTouched accepts a boolean, whereas touched takes an object.
    // Maybe we should upgrade them all to just be "touched"?
    isTouched: (props, propName, componentName) => {
      if (has(props, propName)) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Use \`touched\` instead.`
        );
      }
      return undefined;
    },

    // MoneyInput
    name: PropTypes.string,
    value: PropTypes.shape({
      amount: PropTypes.string.isRequired,
      currencyCode: PropTypes.string.isRequired,
    }).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,

    // LabelField
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    onInfoButtonClick: PropTypes.func,
    hint: requiredIf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      props => props.hintIcon
    ),
    hintIcon: PropTypes.node,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    badge: PropTypes.node,
  };

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: do {
      if (props.id) props.id;
      else if (state.id) state.id;
      else sequentialId();
    },
  });

  render() {
    // We could determine the errors of amount and currencyCode separately
    // and forward hasCurrencyError / hasAmountError depending on the error.
    // This would work for example for the known "missing" error.
    // Doing so would lead to the correct part of the MoneyField being marked
    // with a red border instead of the complete field.
    // This is something we can do later / when somebody asks for it.
    const hasAnyErrors =
      MoneyInput.isTouched(this.props.touched) && hasErrors(this.props.errors);
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack scale="xs">
          <FieldLabel
            title={this.props.title}
            hint={this.props.hint}
            description={this.props.description}
            onInfoButtonClick={this.props.onInfoButtonClick}
            hintIcon={this.props.hintIcon}
            badge={this.props.badge}
            hasRequiredIndicator={this.props.isRequired}
            htmlFor={this.state.id}
          />
          <MoneyInput
            id={this.state.id}
            name={this.props.name}
            value={this.props.value}
            currencies={this.props.currencies}
            placeholder={this.props.placeholder}
            onBlur={this.props.onBlur}
            isDisabled={this.props.isDisabled}
            onChange={this.props.onChange}
            hasCurrencyError={hasAnyErrors}
            hasCurrencyWarning={this.props.hasCurrencyWarning}
            hasAmountError={hasAnyErrors}
            hasAmountWarning={this.props.hasAmountWarning}
            {...filterDataAttributes(this.props)}
          />
          <FieldErrors
            errors={this.props.errors}
            isVisible={hasAnyErrors}
            renderError={this.props.renderError}
          />
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

export default MoneyField;
