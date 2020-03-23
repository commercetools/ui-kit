import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import has from 'lodash/has';
import {
  filterDataAttributes,
  createSequentialId,
  getFieldId,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import MoneyInput from '@commercetools-uikit/money-input';
import FieldErrors from '@commercetools-uikit/field-errors';
import SafeHTMLElement from '../../../utils/helpers/safeHTMLElement';

const sequentialId = createSequentialId('money-field-');

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);

class MoneyField extends React.Component {
  static displayName = 'MoneyField';

  static propTypes = {
    // MoneyField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    touched: PropTypes.shape({
      amount: PropTypes.bool,
      currencyCode: PropTypes.bool,
    }),
    hasHighPrecisionBadge: PropTypes.bool,

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
    autoComplete: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.shape({
      amount: PropTypes.string.isRequired,
      currencyCode: PropTypes.string.isRequired,
    }).isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    isAutofocussed: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    menuPortalTarget: PropTypes.instanceOf(SafeHTMLElement),
    menuPortalZIndex: PropTypes.number,
    menuShouldBlockScroll: PropTypes.bool,

    // LabelField
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    onInfoButtonClick: PropTypes.func,
    hint: requiredIf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      (props) => props.hintIcon
    ),
    hintIcon: PropTypes.node,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
    id: getFieldId(props, state, sequentialId),
  });

  render() {
    // MoneyInput.isTouched() ensures both fields have been touched.
    // This avoids showing an error when the user just selected a language but
    // didn't add an amount yet.
    const hasError =
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
            hasRequiredIndicator={this.props.isRequired}
            htmlFor={this.state.id}
          />
          <MoneyInput
            id={this.state.id}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            value={this.props.value}
            currencies={this.props.currencies}
            placeholder={this.props.placeholder}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            isDisabled={this.props.isDisabled}
            isAutofocussed={this.props.isAutofocussed}
            isReadOnly={this.props.isReadOnly}
            onChange={this.props.onChange}
            hasError={hasError}
            hasHighPrecisionBadge={this.props.hasHighPrecisionBadge}
            menuPortalTarget={this.props.menuPortalTarget}
            menuPortalZIndex={this.props.menuPortalZIndex}
            menuShouldBlockScroll={this.props.menuShouldBlockScroll}
            {...filterDataAttributes(this.props)}
          />
          <FieldErrors
            errors={this.props.errors}
            isVisible={hasError}
            renderError={this.props.renderError}
          />
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}

export default MoneyField;
