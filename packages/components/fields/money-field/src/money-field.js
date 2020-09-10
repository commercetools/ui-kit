import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import has from 'lodash/has';
import {
  filterDataAttributes,
  createSequentialId,
  getFieldId,
  SafeHTMLElement,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import MoneyInput from '@commercetools-uikit/money-input';
import FieldErrors from '@commercetools-uikit/field-errors';

const sequentialId = createSequentialId('money-field-');

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);

class MoneyField extends React.Component {
  static displayName = 'MoneyField';

  static propTypes = {
    // MoneyField
    /**
     * Used as HTML id property. An id is auto-generated when it is not specified.
     */
    id: PropTypes.string,
    /**
     * Horizontal size limit of the input fields.
     */
    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
    /**
     * A map of errors. Error messages for known errors are rendered automatically.
     * <br />
     * Unknown errors will be forwarded to `renderError`
     */
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    /**
     * Called with custom errors. This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.
     * <br />
     * Signature: `(key, error) => React.node`
     */
    renderError: PropTypes.func,
    /**
     * Indicates if the value is required. Shows an the "required asterisk" if so.
     */
    isRequired: PropTypes.bool,
    /**
     * Indicates whether the `currencyCode` or `amount` fields were touched.
     * <br />
     * Errors will only be shown when the field was touched.
     */
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
    /**
     * Used as HTML `autocomplete` property
     */
    autoComplete: PropTypes.string,
    /**
     * The prefix used to create a HTML `name` property for the amount input field (`${name}.amount`) and the currency dropdown (`${name}.currencyCode`).
     */
    name: PropTypes.string,
    /**
     * Value of the input. Consists of the currency code and an amount. `amount` is a string representing the amount. A dot has to be used as the decimal separator.
     */
    value: PropTypes.shape({
      amount: PropTypes.string.isRequired,
      currencyCode: PropTypes.string.isRequired,
    }).isRequired,
    /**
     * List of possible currencies. When not provided or empty, the component renders a label with the value's currency instead of a dropdown.
     */
    currencies: PropTypes.arrayOf(PropTypes.string),
    /**
     * Placeholder text for the amount input
     */
    placeholder: PropTypes.string,
    /**
     * Called when input is blurred
     */
    onBlur: PropTypes.func,
    /**
     * Called when input is focused
     */
    onFocus: PropTypes.func,
    /**
     * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
     */
    isDisabled: PropTypes.bool,
    /**
     * Indicates that the field is displaying read-only content
     */
    isReadOnly: PropTypes.bool,
    /**
     * Focus the input on initial render
     */
    isAutofocussed: PropTypes.bool,
    /**
     * Called with the event of the input or dropdown when either the currency or the amount have changed.
     * <br />
     * Signature: `(event) => void`
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Dom element to portal the currency select menu to
     */
    menuPortalTarget: PropTypes.instanceOf(SafeHTMLElement),
    /**
     * z-index value for the currency select menu portal
     */
    menuPortalZIndex: PropTypes.number,
    /**
     * whether the menu should block scroll while open
     */
    menuShouldBlockScroll: PropTypes.bool,

    // LabelField
    /**
     * Title of the label
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /**
     * Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`.
     */
    hint: requiredIf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      (props) => props.hintIcon
    ),
    /**
     * Provides a description for the title.
     */
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /**
     * Function called when info button is pressed.
     * <br />
     * Info button will only be visible when this prop is passed.
     * <br />
     * Signature: `(event) => void`
     */
    onInfoButtonClick: PropTypes.func,
    /**
     * Icon to be displayed beside the hint text.
     * <br />
     * Will only get rendered when `hint` is passed as well.
     */
    hintIcon: PropTypes.node,
    /**
     * Shows high precision badge in case current value uses high precision.
     */
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
