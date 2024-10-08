import {
  isValidElement,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  type ChangeEventHandler,
  type FocusEventHandler,
} from 'react';
import { useIntl } from 'react-intl';
import {
  filterDataAttributes,
  createSequentialId,
  warning,
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
import FieldWarnings from '@commercetools-uikit/field-warnings';
import messages from './messages';

const sequentialId = createSequentialId('password-field-');

type TFieldWarnings = Record<string, boolean>;
type TFieldErrors = Record<string, boolean>;
// Similar shape of `FormikErrors` but values are `TFieldErrors` objects.
type TCustomFormErrors<Values> = {
  [K in keyof Values]?: TFieldErrors;
};

const hasErrors = (errors?: TFieldErrors) =>
  errors && Object.values(errors).some(Boolean);

const hasWarnings = (warnings?: TFieldWarnings) =>
  warnings && Object.values(warnings).some(Boolean);

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;

export type TPasswordField = {
  // PasswordField
  /**
   * Used as HTML id property. An id is auto-generated when it is not specified.
   */
  id?: string;
  /**
   * Horizontal size limit of the input fields.
   */
  horizontalConstraint?:
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  /**
   * A map of errors. Error messages for known errors are rendered automatically.
   * <br />
   * Unknown errors will be forwarded to `renderError`
   */
  errors?: TFieldErrors;
  /**
   * A map of warnings. Warning messages for known warnings are rendered automatically.
   * <br/>
   * Unknown warnings will be forwarded to renderWarning.
   */
  warnings?: TFieldWarnings;
  /**
   * Called with custom errors. This function can return a message which will be wrapped in an ErrorMessage. It can also return null to show no error.
   */
  renderError?: TErrorRenderer;
  /**
   * Called with custom warnings, as renderWarning(key, warning). This function can return a message which will be wrapped in a WarningMessage.
   * <br />
   * It can also return null to show no warning.
   */
  renderWarning?: (key: string, warning?: boolean) => ReactNode;
  /**
   * Indicates if the value is required. Shows an the "required asterisk" if so.
   */
  isRequired?: boolean;
  /**
   * Indicates whether the field was touched. Errors will only be shown when the field was touched.
   */
  touched?: boolean;

  // PasswordInput
  /**
   * Used as HTML name of the input component. property
   */
  name?: string;
  /**
   * Value of the input component.
   */
  value: string;
  /**
   * Called with an event containing the new value. Required when input is not read only. Parent should pass it back as value.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /**
   * Called when input is blurred
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Called when input is focused
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;
  /**
   * Focus the input on initial render
   */
  isAutofocussed?: boolean;
  /**
   * Indicates that the input cannot be modified (e.g not authorized, or changes currently saving).
   */
  isDisabled?: boolean;
  /**
   * Indicates that the field is displaying read-only content
   */
  isReadOnly?: boolean;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Password autocomplete mode
   */
  autoComplete?: 'on' | 'off' | 'current-password' | 'new-password';

  // LabelField
  /**
   * Title of the label
   */
  title: string | ReactNode;
  /**
   * 	Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas `description` can describe it in more depth. Can also receive a `hintIcon`.
   */
  hint?: string | ReactNode;
  /**
   * Provides a description for the title.
   */
  description?: string | ReactNode;
  /**
   * Function called when info button is pressed.
   * <br />
   * Info button will only be visible when this prop is passed.
   */
  onInfoButtonClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Icon to be displayed beside the hint text.
   * <br />
   * Will only get rendered when `hint` is passed as well.
   */
  hintIcon?: ReactElement;
  /**
   * Badge to be displayed beside the label.
   * <br />
   * Might be used to display additional information about the content of the field (E.g verified email)
   */
  badge?: ReactNode;
  /**
   * Determines whether to render the "Show/Hide" button for the password field.
   */
  renderShowHideButton?: boolean;
};

type TTogglePasswordVisibilityHandler = (
  arg?:
    | boolean
    | MouseEvent<HTMLButtonElement>
    | KeyboardEvent<HTMLButtonElement>
) => void;

const defaultProps: Pick<
  TPasswordField,
  'horizontalConstraint' | 'renderShowHideButton'
> = {
  horizontalConstraint: 'scale',
  renderShowHideButton: true,
};

const PasswordField = (props: TPasswordField) => {
  const intl = useIntl();
  const [isPasswordVisible, togglePasswordVisibility] = useToggleState(false);
  const id = useFieldId(props.id, sequentialId);
  const errorsContainerId = `${id}-errors`;
  const warningsContainerId = `${id}-warnings`;
  const hasError = props.touched && hasErrors(props.errors);
  const hasWarning = props.touched && hasWarnings(props.warnings);
  const canInteract =
    !props.isDisabled && !props.isReadOnly && props.renderShowHideButton;

  if (!props.isReadOnly) {
    warning(
      Boolean(props.onChange),
      'PasswordField: `onChange` is required when field is not read only.'
    );
  }

  if (props.hintIcon) {
    warning(
      typeof props.hint === 'string' || isValidElement(props.hint),
      'PasswordField: `hint` is required to be string or ReactNode if hintIcon is present'
    );
  }

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
          {canInteract && (
            <FlatButton
              icon={isPasswordVisible ? <EyeCrossedIcon /> : <EyeIcon />}
              label={
                isPasswordVisible
                  ? intl.formatMessage(messages.hide)
                  : intl.formatMessage(messages.show)
              }
              onClick={
                togglePasswordVisibility as TTogglePasswordVisibilityHandler
              }
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
          isPasswordVisible={canInteract ? isPasswordVisible : false}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          hasError={hasError}
          hasWarning={hasWarning}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          horizontalConstraint="scale"
          {...filterDataAttributes(props)}
          /* ARIA */
          aria-invalid={hasError}
          aria-errormessage={errorsContainerId}
        />
        <FieldErrors
          id={errorsContainerId}
          errors={props.errors}
          isVisible={hasError}
          renderError={props.renderError}
        />
        <FieldWarnings
          id={warningsContainerId}
          warnings={props.warnings}
          isVisible={hasWarning}
          renderWarning={props.renderWarning}
        />
      </Stack>
    </Constraints.Horizontal>
  );
};

PasswordField.displayName = 'PasswordField';
PasswordField.defaultProps = defaultProps;
/**
 * Use this function to convert the Formik `errors` object type to
 * our custom field errors type.
 * This is primarly useful when using TypeScript.
 */
PasswordField.toFieldErrors = function toFieldErrors<FormValues>(
  errors: unknown
): TCustomFormErrors<FormValues> {
  return errors as TCustomFormErrors<FormValues>;
};

export default PasswordField;
