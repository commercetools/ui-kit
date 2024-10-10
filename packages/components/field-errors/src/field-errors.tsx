import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { ErrorMessage } from '@commercetools-uikit/messages';
import messages from './messages';

const isObject = (obj: unknown): boolean => typeof obj === 'object';

type TErrorRenderer = (key: string, error?: boolean) => ReactNode;

export type TFieldErrors = Record<string, boolean>;
export type TFieldErrorsProps = {
  /**
   * ID of the error field.
   */
  id?: string;
  /**
   * List of errors. Only entries with truthy values will count as active errors.
   */
  errors?: TFieldErrors;
  /**
   * `true` when the error messages should be rendered. Usually you'd pass in a `touched` state of fields.
   */
  isVisible?: boolean;
  /**
   * Function which gets called with each error key (from the `errors` prop) and may render an error message or return `null` to hand the error handling off to `renderDefaultError`.
   */
  renderError?: TErrorRenderer;
  /**
   * Function which gets called with each error key (from the `errors` prop) for which `renderError` returned `null`.
   * It may render an error message or return `null` to hand the error handling off to `FieldError`s built-in error handling.
   */
  renderDefaultError?: TErrorRenderer;
};

const FieldErrors = (props: TFieldErrorsProps) => {
  if (!props.isVisible) return null;
  if (!props.errors || !isObject(props.errors)) return null;

  return (
    <div id={props.id} role="alert">
      {Object.entries(props.errors)
        // Only render errors which have truthy values, to avoid
        // rendering an error for, e.g. { missing: false }
        .filter(([, error]) => error)
        .map(([key, error]) => {
          // We might not use a custom error renderer, so we fall back to null
          // to enable the default errors to kick in
          const errorElement = props.renderError
            ? props.renderError(key, error)
            : null;
          // Render a custom error if one was provided.
          // Custom errors take precedence over the default errors
          if (errorElement)
            return <ErrorMessage key={key}>{errorElement}</ErrorMessage>;

          const defaultErrorElement = props.renderDefaultError
            ? props.renderDefaultError(key, error)
            : null;
          // Render a default error if one was provided.
          // Default errors take precedence over the known errors
          if (defaultErrorElement)
            return <ErrorMessage key={key}>{defaultErrorElement}</ErrorMessage>;

          // Try to see if we know this error and render that error instead then
          if (key === FieldErrors.errorTypes.MISSING)
            return (
              <ErrorMessage key={key}>
                <FormattedMessage {...messages.missingRequiredField} />
              </ErrorMessage>
            );
          if (key === FieldErrors.errorTypes.NEGATIVE)
            return (
              <ErrorMessage key={key}>
                <FormattedMessage {...messages.invalidNegativeNumber} />
              </ErrorMessage>
            );
          if (key === FieldErrors.errorTypes.FRACTIONS)
            return (
              <ErrorMessage key={key}>
                <FormattedMessage {...messages.invalidFractionalNumber} />
              </ErrorMessage>
            );
          // Render nothing in case the error is not known and no custom error
          // was returned
          return null;
        })}
    </div>
  );
};

FieldErrors.displayName = 'FieldErrors';
FieldErrors.errorTypes = {
  MISSING: 'missing',
  NEGATIVE: 'negative',
  FRACTIONS: 'fractions',
};

export default FieldErrors;
