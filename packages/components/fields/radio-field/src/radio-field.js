import { Component } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import {
  createSequentialId,
  filterDataAttributes,
  getFieldId,
} from '@commercetools-uikit/utils';
import Constraints from '@commercetools-uikit/constraints';
import Stack from '@commercetools-uikit/spacings-stack';
import FieldLabel from '@commercetools-uikit/field-label';
import FieldErrors from '@commercetools-uikit/field-errors';
import RadioInput from '@commercetools-uikit/radio-input';

const sequentialId = createSequentialId('radio-field-');

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);

class RadioField extends Component {
  static displayName = 'RadioField';

  static propTypes = {
    // RadioField
    /**
     * Used as HTML id property. An id is auto-generated when it is not specified.
     */
    id: PropTypes.string,
    /**
     * Horizontal size limit of the input fields.
     */
    horizontalConstraint: PropTypes.oneOf([
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
     * A map of errors. Error messages for known errors are rendered automatically. Unknown errors will be forwarded to `renderError`.
     */
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    /**
     * Called with custom errors.
     * <br/>
     * This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.
     * <br/>
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

    // RadioInput
    /**
     * Used as HTML name of the input component.
     */
    name: PropTypes.string,
    /**
     * Value of the input component.
     */
    value: PropTypes.string.isRequired,
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
     * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
     */
    isDisabled: PropTypes.bool,
    /**
     * Indicates that the field is displaying read-only content
     */
    isReadOnly: PropTypes.bool,
    /**
     * Rendering direction of the radio `RadioInput.Option`s
     */
    direction: PropTypes.oneOf(['stack', 'inline']),
    /**
     * Passes props of the `Spacings.Stack` or `Spacings.Inline`, dependeing on the chosen direction
     */
    directionProps: PropTypes.object,
    /**
     * At least one `RadioInput.Option` component or another node (mixed children are allowed)
     */
    children: PropTypes.node.isRequired,

    // LabelField
    /**
     * Title of the label
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /**
     * Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas description can describe it in more depth.
     * <br />
     * Can also receive a `hintIcon`.
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
        <Stack scale="xs">
          <FieldLabel
            title={this.props.title}
            hint={this.props.hint}
            description={this.props.description}
            onInfoButtonClick={this.props.onInfoButtonClick}
            hintIcon={this.props.hintIcon}
            badge={this.props.badge}
            hasRequiredIndicator={this.props.isRequired}
            id={this.state.id}
          />
          <RadioInput.Group
            id={this.state.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            hasError={hasError}
            horizontalConstraint={this.props.horizontalConstraint}
            direction={this.props.direction}
            directionProps={this.props.directionProps}
            {...filterDataAttributes(this.props)}
          >
            {this.props.children}
          </RadioInput.Group>
          <FieldErrors
            errors={this.props.errors}
            isVisible={hasError}
            renderError={this.props.renderError}
          />
        </Stack>
      </Constraints.Horizontal>
    );
  }
}

export default RadioField;
