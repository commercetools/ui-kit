import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import requiredIf from 'react-required-if';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import FieldLabel from '../../field-label';
import PasswordInput from '../../inputs/password-input';
import FlatButton from '../../buttons/flat-button';
import { EyeIcon, EyeCrossedIcon } from '../../icons';
import getFieldId from '../../../utils/get-field-id';
import createSequentialId from '../../../utils/create-sequential-id';
import FieldErrors from '../../field-errors';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import messages from './messages';

const sequentialId = createSequentialId('password-field-');

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

const PasswordField = props => {
  const intl = useIntl();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const id = getFieldId(props, {}, sequentialId);
  const hasError = props.touched && hasErrors(props.errors);

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Spacings.Stack scale="xs">
        <Spacings.Inline alignItems="center" justifyContent="space-between">
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
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              isDisabled={!props.value}
            />
          )}
        </Spacings.Inline>
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
      </Spacings.Stack>
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
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
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
    props => props.hintIcon
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
