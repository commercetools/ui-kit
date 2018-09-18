import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ErrorMessage from '../messages/error-message';
import messages from './messages';

const isObject = obj => typeof obj === 'object';

const FieldErrors = props => {
  if (!props.isVisible) return null;
  if (!isObject(props.errors)) return null;

  return (
    <React.Fragment>
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
          if (key === 'missing')
            return (
              <ErrorMessage key={key}>
                <FormattedMessage {...messages.missingRequiredField} />
              </ErrorMessage>
            );
          // Render nothing in case the error is not known and no custom error
          // was returned
          // The input element will still have the red border to indicate an
          // error in this case.
          return null;
        })}
    </React.Fragment>
  );
};

FieldErrors.displayName = 'FieldErrors';

FieldErrors.propTypes = {
  errors: PropTypes.object,
  isVisible: PropTypes.bool,
  renderError: PropTypes.func,
  renderDefaultError: PropTypes.func,
};

export default FieldErrors;
