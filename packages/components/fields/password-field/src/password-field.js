import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import requiredIf from 'react-required-if';
import {
  filterDataAttributes,
  createSequentialId,
} from '@commercetools-uikit/utils';
import { useFieldId, useToggleState } from '@commercetools-uikit/hooks';
import Constraints from '@commercetools-uikit/constraints';
import Inline from '@commercetools-uikit/spacings-inline';
import Stack from '@commercetools-uikit/spacings-stack';
import FieldLabel from '@commercetools-uikit/field-label';
import PasswordInput from '@commercetools-uikit/password-input';
import FlatButton from '@commercetools-uikit/flat-button';
import { EyeIcon, EyeCrossedIcon } from '@commercetools-uikit/icons';
import FieldErrors from '@commercetools-uikit/field-errors';
import messages from './messages';

const sequentialId = createSequentialId('password-field-');

const hasErrors = (errors) => errors && Object.values(errors).some(Boolean);

const PasswordField = (props) => {
  const intl = useIntl();
  const [isPasswordVisible, togglePasswordVisibility] = useToggleState(false);
  const id = useFieldId(props.id, sequentialId);
  const hasError = props.touched && hasErrors(props.errors);

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Stack scale="xs">
        <Inline alignItems="flex-end" justifyContent="space-between">
          <FieldLabel
            hint={props.hint}
            title={props.title}
            badge={props.badge}
            htmlFor={id}
            hintIcon={props.hintIcon}
            description={props.description}
            onInfoButtonClick={props.onInfoButtonClick}
            hasRequiredIndicator={props.isRequired}
          />
          {!props.isDisabled && !props.isReadOnly && (
            <FlatButton
              icon={isPasswordVisible ? <EyeCrossedIcon /> : <EyeIcon />}
              label={
                isPasswordVisible
                  ? intl.formatMessage(messages.hide)
                  : intl.formatMessage(messages.show)
              }
              onClick={togglePasswordVisibility}
              isDisabled={!props.value}
            />
          )}
        </Inline>
        <PasswordInput
          id={id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          isAutofocussed={props.isAutofocussed}
          isPasswordVisible={isPasswordVisible}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          hasError={hasError}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          horizontalConstraint="scale"
          {...filterDataAttributes(props)}
        />
        <FieldErrors
          errors={props.errors}
          isVisible={hasError}
          renderError={props.renderError}
        />
      </Stack>
    </Constraints.Horizontal>
  );
};

PasswordField.displayName = 'PasswordField';

PasswordField.propTypes = {
  // PasswordField
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id: PropTypes.string,
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint: PropTypes.oneOf([
    3,
    4,
    5,
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

  // PasswordInput
  /**
   * Used as HTML name of the input component. property
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
   * Placeholder text for the input
   */
  placeholder: PropTypes.string,
  /**
   * Password autocomplete mode
   */
  autoComplete: PropTypes.string,

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

PasswordField.defaultProps = {
  horizontalConstraint: 'scale',
};

export default PasswordField;
