import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
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
    isRequired: PropTypes.bool,
    touched: PropTypes.bool,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,

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
              hasRequiredIndicator={this.props.isRequired}
            />
            {!this.props.isDisabled && !this.props.isReadOnly && (
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
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            isAutofocussed={this.props.isAutofocussed}
            isPasswordVisible={this.state.isPasswordVisible}
            isDisabled={this.props.isDisabled}
            isReadOnly={this.props.isReadOnly}
            hasError={hasError}
            placeholder={this.props.placeholder}
            autoComplete={this.props.autoComplete}
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

export default injectIntl(PasswordField);
