import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  filterDataAttributes,
  createSequentialId,
  getFieldId,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import FieldLabel from '@commercetools-uikit/field-label';
import DateInput from '@commercetools-uikit/date-input';
import FieldErrors from '@commercetools-uikit/field-errors';

const sequentialId = createSequentialId('date-field-');

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);

class DateField extends React.Component {
  static displayName = 'DateField';

  static propTypes = {
    // DateField
    /**
     * Used as HTML id property. An id is auto-generated when it is not specified.
     */
    id: PropTypes.string,
    /**
     * Horizontal size limit of the input fields.
     */
    horizontalConstraint: PropTypes.oneOf([
      'm',
      'l',
      'xl',
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

    // DateInput
    /**
     * Used as HTML name of the input component.
     */
    name: PropTypes.string,
    /**
     * Value of the input
     */
    value: PropTypes.string.isRequired,
    /**
     * Called with an event containing the new value.
     * This is always called with either an empty string or a valid date in the format of `YYYY-MM-DD`.
     * <br/> Parent should pass it back as `value`.
     * <br/>
     * Signature: `(event) => void`
     */
    onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
    /**
     * Called when input is blurred
     * <br/>
     * Signature: `(event) => void`
     */
    onBlur: PropTypes.func,
    /**
     * Called when input is focused
     * <br/>
     * Signature: `(event) => void`
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
     * Placeholder text for the input
     */
    placeholder: PropTypes.string,
    /**
     * A minimum selectable date. Must either be an empty string or a date formatted as "YYYY-MM-DD".
     */
    minValue: PropTypes.string,
    /**
     *  A maximum selectable date. Must either be an empty string or a date formatted as "YYYY-MM-DD".
     */
    maxValue: PropTypes.string,

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
      <Constraints.Horizontal
        max={Constraints.parseHorizontalConstraintProp(
          this.props.horizontalConstraint
        )}
      >
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
          <DateInput
            id={this.state.id}
            name={this.props.name}
            value={this.props.value}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            minValue={this.props.minValue}
            maxValue={this.props.maxValue}
            onChange={this.props.onChange}
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

export default DateField;
