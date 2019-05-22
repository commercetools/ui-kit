import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import requiredIf from 'react-required-if';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import FieldLabel from '../../field-label';
import PasswordInput from '../../inputs/password-input';
import FlatButton from '../../buttons/flat-button';
import { EyeIcon, EyeCrossedIcon } from '../../icons';
import getFieldId from '../../../utils/get-field-id';
import createSequentialId from '../../../utils/create-sequential-id';
import FieldErrors from '../../field-errors';
import messages from './messages';
import throwDeprecationWarning from '../../../utils/warn-deprecated-prop';

const sequentialId = createSequentialId('password-field-');

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

const getPasswordInputProps = (props = {}) => ({
  readOnly: props.readOnly || props.isReadOnly,
  disabled: props.disabled || props.isDisabled,
  required: props.required || props.isRequired,
  autoFocus: props.autoFocus || props.isAutofocussed,
  ...omit(props, [
    // PasswordField
    'intl',
    'errors',
    'touched',
    'renderError',
    // LabelField
    'hint',
    'title',
    'badge',
    'hintIcon',
    'description',
    'onInfoButtonClick',
    /* deprecated */
    'isReadOnly',
    'isDisabled',
    'isRequired',
    'isAutofocussed',
  ]),
});

class PasswordField extends React.Component {
  static displayName = 'PasswordField';

  static propTypes = {
    // PasswordField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    touched: PropTypes.bool,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,

    // PasswordInput
    value: PropTypes.string.isRequired,

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

    // deprecated props
    isRequired(props, propName, componentName, ...rest) {
      if (!isNil(props[propName])) {
        throwDeprecationWarning(
          propName,
          componentName,
          `\n Please use "required" prop instead.`
        );
      }
      return PropTypes.bool(props, propName, componentName, ...rest);
    },
  };

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
    isPasswordVisible: false,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: getFieldId(props, state, sequentialId),
  });

  render() {
    const hasError = this.props.touched && hasErrors(this.props.errors);
    const passwordInputProps = getPasswordInputProps(this.props);
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack scale="xs">
          <Spacings.Inline alignItems="center" justifyContent="space-between">
            <FieldLabel
              hint={this.props.hint}
              title={this.props.title}
              badge={this.props.badge}
              htmlFor={this.state.id}
              hintIcon={this.props.hintIcon}
              description={this.props.description}
              onInfoButtonClick={this.props.onInfoButtonClick}
              hasRequiredIndicator={passwordInputProps.required}
            />
            {!passwordInputProps.disabled && (
              <FlatButton
                icon={
                  this.state.isPasswordVisible ? (
                    <EyeCrossedIcon />
                  ) : (
                    <EyeIcon />
                  )
                }
                label={
                  this.state.isPasswordVisible
                    ? this.props.intl.formatMessage(messages.hide)
                    : this.props.intl.formatMessage(messages.show)
                }
                onClick={() =>
                  this.setState(prevState => ({
                    isPasswordVisible: !prevState.isPasswordVisible,
                  }))
                }
                isDisabled={!this.props.value}
              />
            )}
          </Spacings.Inline>
          <PasswordInput
            id={this.state.id}
            hasError={hasError}
            isPasswordVisible={this.state.isPasswordVisible}
            {...passwordInputProps}
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

export default injectIntl(PasswordField);
