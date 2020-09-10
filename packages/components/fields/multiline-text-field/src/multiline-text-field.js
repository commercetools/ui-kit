import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  createSequentialId,
  filterDataAttributes,
  getFieldId,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import MultilineTextInput from '@commercetools-uikit/multiline-text-input';
import FieldErrors from '@commercetools-uikit/field-errors';

const sequentialId = createSequentialId('multiline-text-field-');

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);

class MultilineTextField extends React.Component {
  static displayName = 'MultilineTextField';

  static propTypes = {
    // FieldLabel
    /**
     * Used as HTML id property. An id is auto-generated when it is not specified.
     */
    id: PropTypes.string,
    /**
     * Horizontal size limit of the input fields.
     */
    horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
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
     * Indicates whether the field was touched. Errors will only be shown when the field was touched.
     */
    touched: PropTypes.bool,

    // TextInput
    /**
     * Used as HTML `autocomplete` property
     */
    autoComplete: PropTypes.string,
    /**
     * Used as HTML name of the input component. property
     */
    name: PropTypes.string,
    /**
     * Value of the input component.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /**
     * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
     * <br />
     * Signature: `(event) => void`
     */
    onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
    /**
     * Called when input is blurred
     * <br />
     * Signature: `(event) => void`
     */
    onBlur: PropTypes.func,
    /**
     * Called when input is focused
     * <br />
     * Signature: `(event) => void`
     */
    onFocus: PropTypes.func,
    /**
     * Focus the input on initial render
     */
    isAutofocussed: PropTypes.bool,
    /**
     * Expands multiline text input initially
     */
    defaultExpandMultilineText: PropTypes.bool,
    /**
     * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
     */
    isDisabled: PropTypes.bool,
    /**
     * Indicates that the field is displaying read-only content
     */
    isReadOnly: PropTypes.bool,
    /**
     * Placeholder text for the input
     */
    placeholder: PropTypes.string,

    // LabelField
    /**
     * Title of the label
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /**
     * 	Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`.
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
     * Badge to be displayed beside the label.
     * <br />
     * Might be used to display additional information about the content of the field (E.g verified email)
     */
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
    id: getFieldId(props, state, sequentialId),
  });

  render() {
    const hasError = this.props.touched && hasErrors(this.props.errors);
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
          <MultilineTextInput
            id={this.state.id}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            isAutofocussed={this.props.isAutofocussed}
            defaultExpandMultilineText={this.props.defaultExpandMultilineText}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            hasError={hasError}
            placeholder={this.props.placeholder}
            horizontalConstraint="scale"
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

export default MultilineTextField;
