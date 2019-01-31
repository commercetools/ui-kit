import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { FormattedMessage } from 'react-intl';
import has from 'lodash.has';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import FieldLabel from '../../field-label';
import MoneyInput from '../../inputs/money-input';
import getFieldId from '../../../utils/get-field-id';
import createSequentialId from '../../../utils/create-sequential-id';
import FieldErrors from '../../field-errors';
import { VerifiedIcon } from '../../icons';
import Text from '../../typography/text';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import messages from './messages';

const sequentialId = createSequentialId('money-field-');

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

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
    currencies: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    isAutofocussed: PropTypes.bool,
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
    hasHighPrecisionBadge: PropTypes.bool,
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
            badge={
              this.props.hasHighPrecisionBadge &&
              !MoneyInput.isEmpty(this.props.value) &&
              MoneyInput.isHighPrecision(this.props.value) ? (
                <Spacings.Inline scale="xs" alignItems="flexEnd">
                  <VerifiedIcon size="medium" theme="blue" />
                  <Text.Detail isInline={true}>
                    <FormattedMessage {...messages.highPrecision} />
                  </Text.Detail>
                </Spacings.Inline>
              ) : (
                undefined
              )
            }
            hasRequiredIndicator={this.props.isRequired}
            htmlFor={this.state.id}
          />
          <MoneyInput
            id={this.state.id}
            name={this.props.name}
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
