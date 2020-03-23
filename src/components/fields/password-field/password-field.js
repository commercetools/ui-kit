import React from 'react';
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
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
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
  id: PropTypes.string,
  horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
  errors: PropTypes.shape({
    missing: PropTypes.bool,
  }),
  renderError: PropTypes.func,
  isRequired: PropTypes.bool,
  touched: PropTypes.bool,

  // PasswordInput
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: requiredIf(PropTypes.func, (props) => !props.isReadOnly),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  isAutofocussed: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,

  // LabelField
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  hint: requiredIf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    (props) => props.hintIcon
  ),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onInfoButtonClick: PropTypes.func,
  hintIcon: PropTypes.node,
  badge: PropTypes.node,
};

PasswordField.defaultProps = {
  horizontalConstraint: 'scale',
};

export default PasswordField;
