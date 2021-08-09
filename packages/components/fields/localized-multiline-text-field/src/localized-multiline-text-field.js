import { Component } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { oneLine } from 'common-tags';
import {
  filterDataAttributes,
  getFieldId,
  createSequentialId,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import LocalizedMultilineTextInput from '@commercetools-uikit/localized-multiline-text-input';
import FieldErrors from '@commercetools-uikit/field-errors';

const sequentialId = createSequentialId('localized-multiline-text-field-');

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);

class LocalizedMultilineTextField extends Component {
  static displayName = 'LocalizedMultilineTextField';

  static propTypes = {
    // LocalizedMultilineTextField
    /**
     * Used as HTML id property. An id is auto-generated when it is not specified.
     */
    id: PropTypes.string,
    /**
     * Horizontal size limit of the input fields.
     */
    horizontalConstraint: PropTypes.oneOf([
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      'scale',
      'auto',
    ]),
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

    // LocalizedMultilineTextInput
    /**
     * Used as HTML `autocomplete` of the input component. property
     */
    autoComplete: PropTypes.string,
    /**
     * Used as HTML name of the input component. property
     */
    name: PropTypes.string,
    /**
     * Values to use.
     * <br />
     * Keyed by language, the values are the actual values, e.g. `{ en: 'Horse', de: 'Pferd' }`
     */
    value: PropTypes.objectOf(PropTypes.string).isRequired,
    /**
     * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
     * <br />
     * Signature: `(event) => void`
     */
    onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
    /**
     * Specifies which language will be shown in case the `LocalizedTextInput` is collapsed.
     */
    selectedLanguage: PropTypes.string.isRequired,
    /**
     * Called when input is blurred
     */
    onBlur: PropTypes.func,
    /**
     * Called when input is focused
     */
    onFocus: PropTypes.func,
    /**
     * Expands input components holding multiline values instead of collpasing them by default.
     */
    defaultExpandMultilineText: PropTypes.bool,
    /**
     * Will hide the language expansion controls when set to `true`. All languages will be shown when set to `true`.
     */
    hideLanguageExpansionControls: PropTypes.bool,
    /**
     * Controls whether one or all languages are visible by default. Pass `true` to show all languages by default.
     */
    defaultExpandLanguages: (props, propName, componentName, ...rest) => {
      if (
        props.hideLanguageExpansionControls &&
        typeof props[propName] === 'boolean'
      ) {
        throw new Error(
          oneLine`
            ${componentName}: "${propName}" does not have any effect when
            "hideLanguageExpansionControls" is set.
          `
        );
      }
      return PropTypes.bool(props, propName, componentName, ...rest);
    },
    /**
     * Focus the input on initial render
     */
    isAutofocussed: PropTypes.bool,
    /**
     * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
     */
    isDisabled: PropTypes.bool,
    /**
     * Indicates that the field is displaying read-only content
     */
    isReadOnly: PropTypes.bool,
    /**
     * Placeholders for each language. Object of the same shape as `value`.
     */
    placeholder: PropTypes.objectOf(PropTypes.string),
    /**
     * Errors for each translation. These are forwarded to the `errors` prop of `LocalizedTextInput`.
     */
    errorsByLanguage: PropTypes.objectOf(PropTypes.node),

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
      <Constraints.Horizontal max={this.props.horizontalConstraint}>
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
          <LocalizedMultilineTextInput
            id={this.state.id}
            name={this.props.name}
            autoComplete={this.props.autoComplete}
            value={this.props.value}
            onChange={this.props.onChange}
            selectedLanguage={this.props.selectedLanguage}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            defaultExpandMultilineText={this.props.defaultExpandMultilineText}
            hideLanguageExpansionControls={
              this.props.hideLanguageExpansionControls
            }
            defaultExpandLanguages={this.props.defaultExpandLanguages}
            isAutofocussed={this.props.isAutofocussed}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            errors={this.props.errorsByLanguage}
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

export default LocalizedMultilineTextField;
